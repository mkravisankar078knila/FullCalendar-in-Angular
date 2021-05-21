using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace JwtToken.Models
{
    public class CalendarEvents
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string StartStr { get; set; }
        public string EndStr { get; set; }
    }
}
