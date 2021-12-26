import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import esLocale from '@fullcalendar/core/locales/es';
import { Reminder } from 'src/app/interfaces/reminder.interface';
import { RemindersService } from 'src/app/services/reminder.service';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/material.css'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  arrReminders: Reminder[] = [];
  arrEvents: any = [];
  calendarOptions: CalendarOptions = {};
  constructor(private remindersService: RemindersService) { }

  async ngOnInit() {
    this.arrReminders = await this.remindersService.getAllReminders();
    this.arrEvents = this.arrReminders.map(reminder => {
      return { title: reminder.description, id: (reminder.id)?.toString(), start: new Date(reminder.reminder_date).toLocaleDateString('en-CA'), description: 'Categoría: ' + reminder.type + '<br>Animal: ' + reminder.animal }
    });
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      locale: esLocale,
      events: this.arrEvents,

      eventClick: function (info) {
        console.log(info.event);
      },

      eventMouseEnter: function (info) {
        info.el.style.cursor = 'pointer';
        info.el.style.backgroundColor = 'lightblue';
      },

      eventMouseLeave: function (info) {
        info.el.style.backgroundColor = '#3788d8';
      },

      eventDidMount: (info) => {
        tippy(info.el, {
          content: info.event.extendedProps['description'],
          placement: 'top',
          arrow: true,
          maxWidth: 200,
          allowHTML: true,
        })
      },
    };

  }



}
