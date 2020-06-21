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
  AllWeatherData: WeatherData[] = [];

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.GetGeoWeather();
  }

  GetGeoWeather() {
    let coord: Coord;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        coord = {
          lon: Math.round(position.coords.longitude),
          lat: Math.round(position.coords.latitude)
        };
        //this.weatherData = JSON.parse('{"coord":{"lon":73,"lat":19},"weather":[{"id":721,"main":"Haze","description":"haze","icon":"50n"}],"base":"stations","main":{"temp":30,"feels_like":35.2,"temp_min":30,"temp_max":30,"pressure":1006,"humidity":84},"visibility":3000,"wind":{"speed":3.6,"deg":190},"clouds":{"all":40},"dt":1592666198,"sys":{"type":1,"id":9052,"country":"IN","sunrise":1592613082,"sunset":1592660868},"timezone":19800,"id":6619347,"name":"Navi Mumbai","cod":200}');
        this.weatherService.getWeatherByCoords(coord).subscribe(
          data => {
            this.weatherData = data;
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

  Search() {
    this.weatherService.getWeatherByCity(this.filterText).subscribe
      (
        data => { this.weatherData = data; },
        error => { console.log(error); }
      );
  }

  PinLocation(currentLocation) {
    if (this.AllWeatherData.indexOf(currentLocation) === -1) {
      this.AllWeatherData.push(currentLocation);
    }
  }

  UnPinLocation(currentLocation) {
    this.AllWeatherData = this.AllWeatherData.filter(x => x != currentLocation);
  }

  UpdateSelected(selectedLocation)
  {
    this.weatherData = selectedLocation;
  }
}