import { Injectable } from '@angular/core';
import { Config } from 'src/assets/config';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WeatherData } from '../app/Models/WeatherData'


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  readonly config = new Config();
  private _url = this.config.service_api + this.config.service_key;
  private url: string;

  constructor(private http: HttpClient) { }

  getWeatherByCity(filterText:string) : Observable<WeatherData>
  {
    //return this.http.get(this._url);
    this.url = 'https://api.openweathermap.org/data/2.5/weather?q='+filterText+'&APPID=88dc251c19359890486549fc1a7f4bc7';
    return this.http.get(this.url).pipe(map(res => JSON.parse(JSON.stringify(res))));
  }
}
