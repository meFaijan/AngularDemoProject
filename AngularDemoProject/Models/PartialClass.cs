using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace AngularDemoProject.Models
{
    public partial class student_info
    {
        public string FullName => first_name + " " + middle_name + " " + last_name;

        public string PhotoFileName { get; set; }
        public string SignatureFileName { get; set; }
        public string AdmitDate { get; set; }
        public string BirthDate { get; set; }
    }

    public partial class student_documents
    {
        public string Ext => Path.GetExtension(file_name);
        public bool IsImage => IsImageExtension(Ext);

        public bool IsImageExtension(string file_name)
        {
            string ext = System.IO.Path.GetExtension(file_name != null ? file_name : "");
            ext = "." + ext.Replace(".", "");
            string[] _validExtensions = (new string[] { ".jpg", ".bmp", ".gif", ".png", ".jpeg" }).Select(x => x.Trim().ToLower()).ToArray();
            return _validExtensions.Contains(ext.ToLower());
        }

        public string SelectedFileName { get; set; }
    }
}