import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-stats-component',
  templateUrl: './stats-component.component.html',
  styleUrls: ['./stats-component.component.css']
})
export class StatsComponentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function () {
      $(".nav").fadeTo("slow", 1)
    })
  }
}