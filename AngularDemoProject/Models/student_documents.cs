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
    
    public partial class student_documents
    {
        public int id { get; set; }
        public int student_id { get; set; }
        public int document_type_id { get; set; }
        public string file_path { get; set; }
        public string file_name { get; set; }
        public string description { get; set; }
    
        public virtual document_type document_type { get; set; }
        public virtual student_info student_info { get; set; }
    }
}