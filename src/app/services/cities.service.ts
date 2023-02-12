import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Main } from '../models/city.interface';

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  constructor(private http: HttpClient) {}
  getCitiesData(): Observable<Main> {
    return this.http.get<Main>(environment.cityApiBaseUrl, {
      headers: new HttpHeaders()
        .set(environment.xRapidAPIHostName, environment.xRapidAPIHost)
        .set(environment.xRapidAPIKeyName, environment.xRapidAPIKey),
      // : new HttpParams(),
    });
  }
}
