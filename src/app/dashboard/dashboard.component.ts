import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/Services/weather.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data = {};
  constructor(private weatherSrv:WeatherService) { }

  ngOnInit() {
    this.weatherSrv.getCityWeather().subscribe
    (
      data => {this.data = data},
    );
  }
  Display(res: Object): void {
   this.data = res.toString();
   console.log(this.data);

  }
  

}
