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
  }
  search() {
    if (this.cityName.trim() !== '') {
      // Search only if the input is not empty
      this.fetchWeatherData(this.cityName);
    }
  }

  // to fetch weather data a/c to the city
  fetchWeatherData(city: string) {
    this.http.get(`${this.API_URL}?key=${this.API_KEY}&q=${city}&days=4`)
      .subscribe((response: any) => {
        // console.log(response);
        this.weatherData = response;
        this.upcomingForecast = response.forecast.forecastday.slice(1);
      });
  }

  // converting date to day name
  dateToDay(_date: any) {
    const date = new Date(_date);
    const dayName = date.toLocaleString('en-US', { weekday: 'long' });
    return dayName;
  }
}
