import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { enviroment } from '../../enviroments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class YoutubeService {

  private apiUrl = `${enviroment.apiServer}`;

  constructor(private http: HttpClient) {}

  
}
