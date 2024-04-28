import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit{
  cityName: string = 'Guwahati';
  weatherData: any;
  upcomingForecast: any;
  API_URL = environment.apiUrl;
  API_KEY = environment.API_KEY

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.fetchWeatherData(this.cityName);
    // this.fetchUpcomingForecast(this.cityName);
  }
  search() {
    if (this.cityName.trim() !== '') {
      // Search only if the input is not empty
      this.fetchWeatherData(this.cityName);
      // this.fetchUpcomingForecast(this.cityName);
    }
  }

  fetchWeatherData(city: string) {
    this.http.get(`${this.API_URL}?key=${this.API_KEY}&q=${city}&days=4`)
      .subscribe((response: any) => {
        console.log(response);
        // response.location.name
        this.weatherData = response;
        this.upcomingForecast = response.forecast.forecastday.slice(1);
      });
  }

  // fetchUpcomingForecast(city: string) {
  //   this.http.get(`http://api.weatherapi.com/v1/forecast.json?key=${this.API_KEY}&q=${city}&days=3`)
  //     .subscribe((response: any) => {
  //       // response.location.name
  //       this.upcomingForecast = response;
  //     });
  // }

  timeToDate(day: any) {
    const date = new Date(day);
    const dayName = date.toLocaleString('en-US', { weekday: 'long' });
    return dayName;
  }
}
