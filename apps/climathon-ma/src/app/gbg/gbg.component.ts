import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'climathon-ma-gbg',
  templateUrl: './gbg.component.html',
  styleUrls: ['./gbg.component.scss']
})
export class GbgComponent implements OnInit {
  displayedColumns: string[] = ['street', 'houseNo', 'temp', 'humidity'];
  data = [
    { street: 'L8', houseNo: '19', temp: 22.97, humidity: 0.16, need: false },
    {
      street: 'Keplerstraße',
      houseNo: '12/2',
      temp: 28.31,
      humidity: 0.13,
      need: false
    },
    {
      street: 'Werderstraße',
      houseNo: '32a',
      temp: 15.5,
      humidity: 0.32,
      need: false
    },
    { street: 'D7', houseNo: '4', temp: 15.9, humidity: 0.05, need: true },
    {
      street: 'Brahmsstraße',
      houseNo: '4b',
      temp: 9.92,
      humidity: 0.07,
      need: true
    }
  ];

  constructor() {}

  ngOnInit() {}
}
