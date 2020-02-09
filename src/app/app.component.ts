import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/Services/weather.service';
import { WeatherData } from './Models/WeatherData';
import { Coord } from './Models/Coord';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  filterText: string;
  weatherData: WeatherData;
  AllWeatherData:{};

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getGeoWeather();
  }

  search() {
    this.weatherService.getWeatherByCity(this.filterText).subscribe
      (
        data => { this.weatherData = data; },
        error => { console.log(error); }
      );
  }

  getGeoWeather() {
    let coord: Coord;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        coord = {
          lon: Math.round(position.coords.longitude),
          lat: Math.round(position.coords.latitude)
        };
        this.weatherService.getWeatherByCoords(coord).subscribe(
          data => {
            this.weatherData = data;
            console.log(this.weatherData);
          },
          error => {
            console.log(error);
          }
        );
      });
    } else {
      console.log("Browser not support");
    }
  }
}