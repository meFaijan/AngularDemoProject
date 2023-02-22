using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using AngularDemoProject.Helper;
using AngularDemoProject.Models;
using Newtonsoft.Json;

namespace AngularDemoProject.Controllers
{
    public class StudentInfoController : Controller
    {
        private MainEntities db = new MainEntities();

        public ActionResult Index()
        {
            var student_info = db.student_info;
            return View(student_info.ToList());
        }

        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            student_info student_info = db.student_info.Find(id);
            if (student_info == null)
            {
                return HttpNotFound();
            }
            return View(student_info);
        }

        // GET: StudentInfo/Create
        public ActionResult Create()
        {
            InitCommon(new student_info());
            return View();
        }

        private void InitCommon(student_info student_info)
        {
            ViewBag.category_id = new SelectList(db.categories.ToList(), "id", "title", student_info?.category_id);
            ViewBag.gender_id = new SelectList(db.genders.ToList(), "id", "title", student_info?.gender_id);
            ViewBag.religion_id = new SelectList(db.religions.ToList(), "id", "title", student_info?.religion_id);
            ViewBag.document_type_id = new SelectList(db.document_type.ToList(), "id", "title");
            ViewBag.class_id = new SelectList(db.class_details.ToList(), "id", "title");
            ViewBag.student_id = new SelectList(db.student_info.ToList(), "id", "FullName");
        }

        // GET: StudentInfo/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            student_info student_info = db.student_info.Find(id);
            if (student_info == null)
            {
                return HttpNotFound();
            }
            InitCommon(student_info);
            return View(student_info);
        }

        public JsonResult GetDataById(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            db.Configuration.LazyLoadingEnabled = false;
            student_info student_info = db.student_info.Include(x => x.academic_detail).Include(x => x.student_relatives_details).Include(x => x.student_documents).FirstOrDefault(x => x.id == id);
            student_info.student_relatives_details.ToList().ForEach(x => x.student_info = null);
            student_info.student_documents.ToList().ForEach(x => x.student_info = null);
            student_info.academic_detail.ToList().ForEach(x => x.student_info = null);
            student_info.AdmitDate = student_info.Admin_date.ToString("yyyy-MM-dd");
            student_info.BirthDate = student_info.birth_date != null ? student_info.birth_date.Value.ToString("yyyy-MM-dd") : "";
            return Json(student_info, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetStudentRecord()
        {
            var student_info = db.student_info.Select(x =>
            new StudentVM()
            {
                id = x.id,
                FullName = x.first_name + " " + x.middle_name + " " + x.last_name,
                Admin_date = x.Admin_date,
                birth_date = x.birth_date,
                blood_group = x.blood_group,
                Category = x.category != null ? x.category.title : "",
                Gender = x.gender != null ? x.gender.title : "",
                Religion = x.religion != null ? x.religion.title : "",
                grade_no = x.grade_no,
                nationality = x.nationality,
                contact_no = x.contact_no,
                email = x.email,
                mother_tongue = x.mother_tongue,
                height = x.height,
                weight = x.weight,
                physical_disability = x.physical_disability
            }).ToList();
            student_info.ForEach(x => x.AdmitDate = x.Admin_date.ToString("yyyy-MM-dd"));
            student_info.ForEach(x => x.BirthDate = x.birth_date != null ? x.birth_date.Value.ToString("yyyy-MM-dd") : "");
            return Json(student_info, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetRequiredDropdownData()
        {
            var categories = db.categories.Select(x => new { x.id, x.title, selected = false }).ToList();
            var genders = db.genders.Select(x => new { x.id, x.title, selected = false }).ToList();
            var religions = db.religions.Select(x => new { x.id, x.title, selected = false }).ToList();
            var document_type = db.document_type.Select(x => new { x.id, x.title }).ToList();
            var class_details = db.class_details.Select(x => new { x.id, x.title }).ToList();
            var student_info = db.student_info.Select(x => new { x.id, FullName = x.first_name + " " + x.middle_name + " " + x.last_name }).ToList();
            return Json(new { categories, genders, religions, document_type, class_details, student_info }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveInfo()
        {
            string Mes = "";
            try
            {
                student_info student_info = JsonConvert.DeserializeObject<student_info>(Request.Form["student_info"]);
                var old_data = db.student_info.Find(student_info.id);
                if (old_data == null)
                {
                    old_data = new student_info();
                }
                old_data.Admin_date = student_info.Admin_date;
                old_data.birth_date = student_info.birth_date;
                old_data.blood_group = student_info.blood_group;
                old_data.category_id = student_info.category_id;
                old_data.contact_no = student_info.contact_no;
                old_data.email = student_info.email;
                old_data.first_name = student_info.first_name;
                old_data.gender_id = student_info.gender_id;
                old_data.grade_no = student_info.grade_no;
                old_data.height = student_info.height;
                old_data.last_name = student_info.last_name;
                old_data.middle_name = student_info.middle_name;
                old_data.mother_tongue = student_info.mother_tongue;
                old_data.nationality = student_info.nationality;
                old_data.physical_disability = student_info.physical_disability;
                old_data.religion_id = student_info.religion_id;

                if (!string.IsNullOrEmpty(student_info.PhotoFileName))
                {
                    HttpPostedFileBase postedFile = Request.Files[student_info.PhotoFileName];
                    var response = UploadHelper.UploadFile(postedFile, Properties.Settings.Default.StudentFilePath);
                    if (response.Status)
                    {
                        old_data.image_name = response.FileName;
                        old_data.image_path = response.FilePath;
                    }
                    else
                    {
                        throw new Exception(response.ErrorMessage);
                    }
                }

                if (!string.IsNullOrEmpty(student_info.SignatureFileName))
                {
                    HttpPostedFileBase postedFile = Request.Files[student_info.SignatureFileName];
                    var response = UploadHelper.UploadFile(postedFile, Properties.Settings.Default.StudentSignPath);
                    if (response.Status)
                    {
                        old_data.sign_name = response.FileName;
                        old_data.sign_path = response.FilePath;
                    }
                    else
                    {
                        throw new Exception(response.ErrorMessage);
                    }
                }

                db.student_documents.RemoveRange(old_data.student_documents);
                db.academic_detail.RemoveRange(old_data.academic_detail);
                db.student_relatives_details.RemoveRange(old_data.student_relatives_details);

                if (student_info.student_documents != null)
                {
                    foreach (var data in student_info.student_documents)
                    {
                        HttpPostedFileBase postedFile = Request.Files[data.SelectedFileName];
                        if (student_info.student_documents != null)
                        {
                            var response = UploadHelper.UploadFile(postedFile, Properties.Settings.Default.StudentSignPath);
                            if (response.Status)
                            {
                                data.file_name = response.FileName;
                                data.file_path = response.FilePath;
                            }
                            else
                            {
                                throw new Exception(response.ErrorMessage);
                            }
                            old_data.student_documents.Add(data);
                        }
                    }
                }
                if (student_info.student_relatives_details != null)
                {
                    foreach (var data in student_info.student_relatives_details)
                    {
                        old_data.student_relatives_details.Add(data);
                    }
                }
                if (student_info.academic_detail != null)
                {
                    foreach (var data in student_info.academic_detail)
                    {
                        old_data.academic_detail.Add(data);
                    }
                }
                if (old_data.id == 0)
                {
                    db.student_info.Add(old_data);
                }
                else
                {
                    db.Entry(old_data).State = EntityState.Modified;
                }
                db.SaveChanges();
                Mes = "Saved Successfully";
                return Json(new { Status = true, Mes }, JsonRequestBehavior.AllowGet);
            }
            catch (DbEntityValidationException ex)
            {
                Mes = ErrorHelper.GetMsg(ex, ex);
            }
            catch (Exception ex)
            {
                Mes = ErrorHelper.GetMsg(ex);
            }
            return Json(new { Status = false, Mes }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            student_info student_info = db.student_info.Find(id);
            if (student_info == null)
            {
                return HttpNotFound();
            }
            return View(student_info);
        }

        [HttpPost, ActionName("Delete")]
        public JsonResult DeleteConfirmed(int id)
        {
            string Mes = "";
            try
            {
                student_info student_info = db.student_info.Find(id);

                db.student_documents.RemoveRange(student_info.student_documents);
                db.academic_detail.RemoveRange(student_info.academic_detail);
                db.student_relatives_details.RemoveRange(student_info.student_relatives_details);
                db.student_info.Remove(student_info);
                db.SaveChanges();
                Mes = "Removed Successfully";
                return Json(new { Status = true, Mes }, JsonRequestBehavior.AllowGet);
            }
            catch (DbEntityValidationException ex)
            {
                Mes = ErrorHelper.GetMsg(ex, ex);
            }
            catch (Exception ex)
            {
                Mes = ErrorHelper.GetMsg(ex);
            }
            return Json(new { Status = false, Mes }, JsonRequestBehavior.AllowGet);
        }
    }
}
