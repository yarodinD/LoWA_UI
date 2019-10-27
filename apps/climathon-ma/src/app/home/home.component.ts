import { Component, OnInit, AfterViewInit } from '@angular/core';
import { tileLayer, latLng } from 'leaflet';
import { HttpClient } from '@angular/common/http';

const api = 'http://46.101.243.178:8080';

interface ICoordMeasurementsResp {
  humidity: number;
  precipitation: number;
  temperature: number;
  windspeed: number;
}

export interface ICoordResp {
  latitude: number;
  longitude: number;
  radius: any;
  warnings: string[];
  measurements: ICoordMeasurementsResp;
}

@Component({
  selector: 'climathon-ma-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  options: any;
  center: { lat: number; lng: number };
  warnings: string[];
  lastResult: ICoordResp;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.center = { lat: 49.472953, lng: 8.474586 };
    this.warnings = [];
    this.lastResult = {
      latitude: this.center.lat,
      longitude: this.center.lng,
      radius: 0,
      warnings: this.warnings,
      measurements: {
        humidity: 0,
        precipitation: 0,
        temperature: 0,
        windspeed: 0
      }
    };
    this.options = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '...'
        })
      ],
      zoom: 16,
      center: latLng(this.center.lat, this.center.lng)
    };

    this.makeCall(this.center.lng, this.center.lat).subscribe(result => {
      this.warnings = result.warnings;
      this.lastResult = result;
    });
  }

  ngAfterViewInit() {}

  private makeCall(lng: number, lat: number) {
    return this.http.get<ICoordResp>(
      `${api}/v1/warnlevel/coordinates?long=${lng}&lat=${lat}`
    );
  }

  refreshDetails(event: { lat: number; lng: number }) {
    if (event && event.lat && event.lng) {
      this.makeCall(event.lng, event.lat).subscribe(result => {
        this.warnings = result.warnings;
        this.lastResult = result;
      });
    }
  }
}
