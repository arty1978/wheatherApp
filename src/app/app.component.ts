import { Component, OnInit } from '@angular/core';
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

  weatherData: Root;
  cityName = 'Rishon LeZiyyon';
  alt: string;
  image: string;
  favorites: string[] = [];
  event: undefined;

  ngOnInit(): void {
    this.getWeather(this.cityName);
    this.cityName = '';
    const favFromlcStorage = localStorage.getItem('favorites');
    if (favFromlcStorage) {
      this.favorites = JSON.parse(favFromlcStorage);
    }
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
  public handleAddressChange(address: any) {
    this.cityName = address.formatted_address;
  }
  add(cityName: string) {
    this.getWeather(cityName);
    this.cityName = '';
  }
  public getWeather(city: string) {
    this.weatherService.getWeatherData(city).subscribe({
      next: (res) => {
        this.weatherData = res;
        this.changePic();
      },
    });
  }
  changePic() {
    if (this.weatherData.weather[0].main === 'Rain') {
      this.image = 'rain';
      this.alt = 'Rain image';
    } else if (this.weatherData.weather[0].main === 'Clear') {
      this.image = 'sunny';
      this.alt = 'sun image';
    } else if (this.weatherData.weather[0].main === 'Snow') {
      this.image = 'snow';
      this.alt = 'snow image';
    } else if (this.weatherData.weather[0].main === 'Clouds') {
      this.image = 'cloudy';
      this.alt = 'clouds image';
    }
  }

  favorite(cityName: string) {
    this.getWeather(cityName);
    const favFromlcStorage = localStorage.getItem('favorites');
    if (favFromlcStorage) {
      this.favorites = JSON.parse(favFromlcStorage);

      for (let i = 0; i <= this.favorites.length; i++) {
        if (this.favorites[i] === cityName) this.favorites.splice(i, 1);
      }
      if (this.favorites.length > 17) {
        alert('You have reached the maximum number of favorite cities');
      } else {
        this.favorites.push(cityName);
      }

      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }
    this.cityName = '';
  }
  removeFav(item: string) {
    for (let i = 0; i <= this.favorites.length; i++) {
      if (this.favorites[i] === item) {
        this.favorites.splice(i, 1);
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
        break;
      }
    }
  }
}
