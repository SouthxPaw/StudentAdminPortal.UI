import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gender } from '../models/api-models/gender.model';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  private baseApiUrl = 'https://localhost:44352';

  constructor(private httpClient: HttpClient) { }

  getGenderList(): Observable<Gender[]> {
    return this.httpClient.get<Gender[]>(this.baseApiUrl + '/Genders');
  }
}
