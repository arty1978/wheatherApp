import { Component, Injectable, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { WeatherService } from './services/weather.service';
import { Root } from './models/weather.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DecimalPipe],
})
export class AppComponent implements OnInit {
  constructor(
    private decimalPipe: DecimalPipe,
    private weatherService: WeatherService
  ) {}

  imgName: string;
  weatherData: Root;
  cityName = 'Rishon LeZiyyon';
  alt: String;
  image: String;

  ngOnInit(): void {
    this.getWeather(this.cityName);
    this.cityName = '';
    this.imgName = '';
    this.changePic();
  }
  submit() {
    this.getWeather(this.cityName);
    this.cityName = '';
  }
  private getWeather(city: string) {
    this.weatherService.getWeatherData(city).subscribe({
      next: (res) => {
        this.weatherData = res;
        console.log(this.weatherData);
        console.log(this.weatherData.weather[0].main, '!!!');
        console.log(this.imgName);
      },
    });
  }
  changePic() {
    if (this.weatherData.weather[0].main === 'Rain') {
      this.imgName = 'rain';
      this.alt = 'Rain image';
    }
    if (this.weatherData.weather[0].main === 'Clear') {
      this.imgName = 'sunny';
      this.alt = 'sun image';
    }
    if (this.weatherData.weather[0].main === 'Snow') {
      this.imgName = 'snow';
      this.alt = 'snow image';
    }
    if (this.weatherData.weather[0].main === 'Clouds') {
      this.imgName = 'Rain';
      this.alt = 'clouds image';
    }
    this.image = `../assets/${this.imgName}.jpg`;
  }
}
