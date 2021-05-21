using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JwtToken.DAL;
using JwtToken.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections;
//using Newtonsoft.Json.Linq;

namespace JwtToken.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Calendar : ControllerBase
    {
        private readonly StudentDbContext db;
        public Calendar(StudentDbContext _db)
        {
            db = _db;
        }
        [HttpGet]
        [Route("GetCalendarEvents")]
        public async Task<IActionResult> GetCalendarEvents()
        {

            int MODE = 3;
            //string[] arrayName;

            object[] param = { new SqlParameter("@MODE", MODE) };

            var getEvents = await db.CalendarEvents.FromSqlRaw("SP_CALENDAREVENTS @MODE", param).ToArrayAsync();
            //var studentsa = await db.Database.ExecuteSqlRawAsync("SP_STUDENTMAS @MODE", param);

            if (getEvents.Count() == 0)
            {
                return NotFound();
            }

            //foreach (var i in getEvents)
            //{
            //    arrayName = new string[]
            //    {
            //        "id",i.Id.ToString(),
            //        "title",i.Title,
            //        "start",i.StartStr.ToString(),
            //        "end",i.EndStr.ToString()

            //    };
            //};

            //return arrayName;

            return Ok(getEvents);

        }

        [HttpPost]
        //public JObject FundAllocation(JObject jsonResult)
        //{
        //    TripObject item = JsonConvert.DeserializeObject<TripObject>(jsonResult.ToString());
        //    return jsonResult;
        //}
        public async Task<IActionResult> postCalendar([FromBody] CalendarEvents calendarEvents)
        {
            //CalendarEvents calendarEvents = JsonConvert.DeserializeObject<CalendarEvents>(jsonResult.ToString());

            int MODE = 0;int id = 0;

            object[] param = { new SqlParameter("@MODE", MODE), new SqlParameter("@ID", id),
            new SqlParameter("@TITLE", calendarEvents.Title),new SqlParameter("@STARTDATE", calendarEvents.StartStr),
            new SqlParameter("@ENDDATE", calendarEvents.EndStr)};

            await db.Database.ExecuteSqlRawAsync("SP_CALENDAREVENTS @MODE,@ID,@TITLE,@STARTDATE,@ENDDATE", param);
            return Ok();
        }
    }
}
