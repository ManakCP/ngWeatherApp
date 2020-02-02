import { Injectable } from '@angular/core';
import { Config } from 'src/assets/config';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  readonly config = new Config();
  private _url = this.config.service_api + this.config.service_key;

  constructor(private http: HttpClient) { }

  getCityWeather()
  {
    return this.http.get(this._url);
  }
}
