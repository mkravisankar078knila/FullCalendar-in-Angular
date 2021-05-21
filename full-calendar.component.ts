import { Component, OnInit } from '@angular/core';
// import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { FullCalendarService } from '../services/full-calendar.service';
@Component({
  selector: 'app-full-calendar',
  templateUrl: './full-calendar.component.html',
  styleUrls: ['./full-calendar.component.css']
})

export class FullCalendarComponent implements OnInit {
  json_events:any ={
    id :'',    title:'',    startStr:'' ,    endStr:''  }
  evnetArray:any=[] ;
  calendarOptions:any;

  constructor(public service:FullCalendarService) {}

  ngOnInit(): void {
    //  this.getEvents();
     this.service.refreshList().subscribe(
      res=>{
        this.json_events=res
        for(let i of JSON.parse(JSON.stringify(this.json_events))){
          let newName = {
            title:i.title,
            start:i.startStr,
            end:i.endStr
         };
         this.evnetArray.push(newName);
        }
        console.log(res)
        console.log(this.evnetArray)

        this.calendarOptions= {
          // plugins: [dayGridPlugin, interactionPlugin],
          // initialView: 'dayGridMonth',
          weekends: true,
          selectable: true,
        
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay'
          },
          editable: true,
          
          // dateClick: this.handleDateClick.bind(this), // bind is important!          
            // events: [ // put the array in the `events` property
            // {
            //   title  : 'event1',
            //   start  : '2021-05-01'
            // },  

          events:this.evnetArray,
          select: this.selectDates.bind(this),
        }
       
      },

      err=>{console.log(err);
        alert('Not Found!')},
      
    );  


  }
  
 
  // calendarOptions: calendar = {
  //   // initialView: 'dayGridMonth',
  //   weekends: true,
  //   selectable: true,
  //   // defaultAllDay:true,
  
  //   headerToolbar: {
  //     left: 'prev,next today',
  //     center: 'title',
  //     right: 'dayGridMonth,dayGridWeek,dayGridDay'
  //   },
  //   editable: true,
    
    
  //   select: this.selectDates.bind(this),
  //   events:[this.evnetArray]
    
    
  // };
  


   getEvents(){
    this.service.refreshList().subscribe(
          res=>{
            this.json_events=res
            for(let i of JSON.parse(JSON.stringify(this.json_events))){
              let newName = {
                title:i.title,
                start:i.startStr,
                end:i.endStr
             };
             this.evnetArray.push(newName);
            }
            console.log(res)
            console.log(this.evnetArray)           
          },
          err=>{console.log(err);}
        );  
  }

  selectDates(events: any) {
    var title = prompt('Enter a title');
    const data={title:title,startStr:events.startStr,endStr:events.endStr};
    const select=JSON.stringify(data);
    
    this.service.postCalendar(select).subscribe(
      res=>{
        // console.log(select)
        alert('Added Successfully')
      },
      err=>{console.log(err);}
    );
  }

  handleDateClick(arg: { dateStr: string; }) {
    // alert('date click! ' + arg.dateStr)
    var title = prompt('Enter a date in YYYY-MM-DD format');
     const data={title:title,startDate:arg.dateStr,endDate:arg.dateStr};
     const events=JSON.stringify(data);
     this.service.postCalendar(events).subscribe(
      res=>{
        console.log(JSON.stringify(data))
        alert('date click! ' + title)
      },
      err=>{console.log(err);}
    );
  }

}
