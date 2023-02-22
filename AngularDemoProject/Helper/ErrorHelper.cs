using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Routing;

namespace AngularDemoProject.Helper
{
    public static class ErrorHelper
    {
        public static string GetMsg(Exception ex, DbEntityValidationException exc = null)
        {
            if (exc != null)
            {
                return GetMsg(exc);
            }
            return ex.InnerException != null ? ex.InnerException.InnerException != null ? ex.InnerException.InnerException.Message : ex.InnerException.Message : ex.Message;
        }

        public static string GetMsg(DbEntityValidationException ex)
        {
            StringBuilder sb = new StringBuilder();
            foreach (var eve in ex.EntityValidationErrors)
            {
                sb.AppendFormat("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                    eve.Entry.Entity.GetType().Name, eve.Entry.State);
                foreach (var ve in eve.ValidationErrors)
                {
                    sb.AppendFormat("- Property: \"{0}\", Error: \"{1}\"",
                        ve.PropertyName, ve.ErrorMessage);
                }
            }
            return sb.ToString();
        }

    }
}
