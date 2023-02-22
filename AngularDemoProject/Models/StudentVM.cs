using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularDemoProject.Models
{
    public class StudentVM
    {
        public int id { get; set; }
        public string grade_no { get; set; }
        public System.DateTime Admin_date { get; set; }
        public string FullName { get; set; }
        public string first_name { get; set; }
        public string middle_name { get; set; }
        public string last_name { get; set; }
        public string Gender { get; set; }
        public Nullable<System.DateTime> birth_date { get; set; }
        public string Religion { get; set; }
        public string Category { get; set; }
        public string nationality { get; set; }
        public string blood_group { get; set; }
        public string contact_no { get; set; }
        public string email { get; set; }
        public string mother_tongue { get; set; }
        public string height { get; set; }
        public string weight { get; set; }
        public bool physical_disability { get; set; }
        public string image_path { get; set; }
        public string image_name { get; set; }
        public string sign_path { get; set; }
        public string sign_name { get; set; }
        public string AdmitDate { get; set; }
        public string BirthDate { get; set; }

    }
}