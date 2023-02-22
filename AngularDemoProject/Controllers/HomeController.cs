using AngularDemoProject.Helper;
using AngularDemoProject.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AngularDemoProject.Controllers
{
    public class HomeController : Controller
    {
        private MainEntities db = new MainEntities();

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Login()
        {
            string Mes = "";
            try
            {
                login_details login_details = JsonConvert.DeserializeObject<login_details>(Request.Form["login_details"]);
                var old_data = db.login_details.FirstOrDefault(x => x.username == login_details.username && x.password == login_details.password);
                if (old_data == null)
                {
                    throw new Exception("Username or password doesn't match.");
                }
                Mes = "Login Successful";
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