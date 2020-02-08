import { Component } from '@angular/core';
import { WeatherService } from 'src/Services/weather.service';
import { WeatherData } from './Models/WeatherData';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  filterText:string;
  weatherData: WeatherData;

  constructor(private weatherService:WeatherService){}

  search()
  {
    this.weatherService.getWeatherByCity(this.filterText).subscribe
    (
      data => 
      {
        this.weatherData = data;
        document.getElementById("location").innerText =
             this.weatherData.name + ", " + this.weatherData.sys.country;
      },
    );
  }

}
