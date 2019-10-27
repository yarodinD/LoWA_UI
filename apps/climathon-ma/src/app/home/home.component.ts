import { Component, OnInit, AfterViewInit } from '@angular/core';
import { tileLayer, latLng } from 'leaflet';
import { HttpClient } from '@angular/common/http';

const api = 'http://46.101.243.178:8080';

interface IMeasurements<T> {
  humidity: T;
  precipitation: T;
  temperature: T;
  windspeed: T;
}

interface ICoordMeasurementsResp extends IMeasurements<number> {
  history?: IMeasurements<number[]>;
}

export interface ICoordResp {
  latitude: number;
  longitude: number;
  radius: number;
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
  lastResult: ICoordResp;

  get warnings(): string[] {
    return this.lastResult && Array.isArray(this.lastResult.warnings)
      ? this.lastResult.warnings
      : [];
  }

  private get EmptyResult(): ICoordResp {
    return {
      latitude: 0,
      longitude: 0,
      radius: 0,
      warnings: this.warnings,
      measurements: {
        humidity: 0,
        precipitation: 0,
        temperature: 0,
        windspeed: 0,
        history: {
          humidity: [],
          precipitation: [],
          temperature: [],
          windspeed: []
        }
      }
    };
  }

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.center = { lat: 49.472953, lng: 8.474586 };
    this.lastResult = {
      ...this.EmptyResult,
      latitude: this.center.lat,
      longitude: this.center.lng
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

    this.makeCall(this.center.lng, this.center.lat).subscribe(result =>
      this.updateResult(result)
    );
  }

  ngAfterViewInit() {}

  refreshDetails(event: { lat: number; lng: number }) {
    if (event && event.lat && event.lng) {
      this.makeCall(event.lng, event.lat).subscribe(result =>
        this.updateResult(result)
      );
    }
  }

  trend(values: number[]): 'trending_up' | 'trending_down' | 'arrow_right_alt' {
    if (values && Array.isArray(values) && values.length > 0) {
      let sum = 0;
      values.forEach(item => (sum = sum + item));
      sum = sum - values[values.length - 1];

      const avg = sum / values.length - 1;
      if (avg > values[values.length - 1]) {
        return 'trending_down';
      } else if (avg < values[values.length - 1]) {
        return 'trending_up';
      }
    }
    return 'arrow_right_alt';
  }

  private makeCall(lng: number, lat: number) {
    return this.http.get<ICoordResp>(
      `${api}/v1/warnlevel/coordinates?long=${lng}&lat=${lat}`
    );
  }

  private updateResult(result: ICoordResp) {
    this.lastResult = {
      ...result,
      measurements: { ...result.measurements, history: this.randomHistoryData }
    };
  }

  private get randomHistoryData(): IMeasurements<number[]> {
    const randomHistory: IMeasurements<number[]> = {
      humidity: [],
      precipitation: [],
      windspeed: [],
      temperature: []
    };

    const rounds = Math.floor(this.generateRandomNumber(5, 20));
    for (let i = 0; i <= rounds; i++) {
      randomHistory.humidity.push(
        Math.floor(this.generateRandomNumber(0, 100))
      );
      randomHistory.precipitation.push(
        Math.floor(this.generateRandomNumber(0, 100))
      );
      randomHistory.windspeed.push(
        Math.floor(this.generateRandomNumber(0, 400))
      );
      randomHistory.temperature.push(
        Math.floor(this.generateRandomNumber(-10, 40))
      );
    }

    return randomHistory;
  }

  private generateRandomNumber(min: number = 0, max: number = 100) {
    return Math.random() * (max - min) + min;
  }
}
