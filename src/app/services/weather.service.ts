import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Root } from '../models/weather.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}
  getWeatherData(cityName: string): Observable<Root> {
    return this.http.get<Root>(environment.weatherApiBaseUrl, {
      // headers: new HttpHeaders()
      //   .set(environment.XRapidAPIHostName, environment.XRapidAPIHostValue)
      //   .set(environment.XRapidAPIKeyName, environment.XRapidAPIKeyValue),
      params: new HttpParams()
        .set('q', cityName)
        .set('appid', '09f7ca0489b3288ab090aa8dfa2ca305')
        .set('units', 'metric'),
    });
  }
}
