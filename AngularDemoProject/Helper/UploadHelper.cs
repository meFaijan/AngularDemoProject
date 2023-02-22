using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace AngularDemoProject
{
    public class UploadHelper
    {
        public static UploadResponse UploadFile(HttpPostedFileBase MainFile, string Destination)
        {
            UploadResponse NewResponse = new UploadResponse() { Status = false, ErrorCode = 999, ErrorMessage = "Unknown" };
            var Ext = Path.GetExtension(MainFile.FileName).ToLower();
            Guid newGUID = Guid.NewGuid();
            string newName = newGUID.ToString() + Ext;
            var dirPath = System.Web.HttpContext.Current.Server.MapPath(Destination);
            var path = Path.Combine(System.Web.HttpContext.Current.Server.MapPath(Destination + "/" + newName));

            try
            {
                if (!System.IO.Directory.Exists(dirPath))
                {
                    System.IO.Directory.CreateDirectory(dirPath);
                }
                if (System.IO.File.Exists(path))
                {
                    System.IO.File.Delete(path);
                }

                MainFile.SaveAs(path);
                
                //resize code
                //resize
                //if (imageExt.Contains(newExt))
                //{
                //    WebImage img = new WebImage(path);
                //    if (img.Width > 600)
                //        img.Resize(1000, 1000);
                //}
                NewResponse.Status = true;
                NewResponse.FileName = newName;
                NewResponse.FilePath = Destination;
            }
            catch (Exception ex)
            {
                NewResponse.ErrorCode = 501;
                NewResponse.ErrorMessage = ex.Message;
            }
            return NewResponse;
        }
    }

    public class UploadResponse
    {
        public bool Status { get; set; }
        public string FileName { get; set; }
        public int ErrorCode { get; set; }
        public string ErrorMessage { get; set; }
        public string FilePath { get; set; }
    }
}