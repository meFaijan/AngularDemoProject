//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace AngularDemoProject.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class student_info
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public student_info()
        {
            this.academic_detail = new HashSet<academic_detail>();
            this.student_documents = new HashSet<student_documents>();
            this.student_relatives_details = new HashSet<student_relatives_details>();
        }
    
        public int id { get; set; }
        public string grade_no { get; set; }
        public System.DateTime Admin_date { get; set; }
        public string first_name { get; set; }
        public string middle_name { get; set; }
        public string last_name { get; set; }
        public int gender_id { get; set; }
        public Nullable<System.DateTime> birth_date { get; set; }
        public Nullable<int> religion_id { get; set; }
        public Nullable<int> category_id { get; set; }
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
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<academic_detail> academic_detail { get; set; }
        public virtual category category { get; set; }
        public virtual gender gender { get; set; }
        public virtual religion religion { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<student_documents> student_documents { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<student_relatives_details> student_relatives_details { get; set; }
    }
}
