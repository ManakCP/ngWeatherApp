import { Injectable } from '@angular/core';
import { Config } from 'src/assets/config';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {
  private _url: (new Config()).service_api;
  constructor() { }
}
