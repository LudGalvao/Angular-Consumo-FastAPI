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

  downloadMp3(youtubeUrl: string): Observable<Blob>{
    const params = new HttpParams().set('youtube_url', youtubeUrl);

    return this.http.get(`${this.apiUrl}/download_audio`, {
      params,
      responseType: 'blob',
    });
  }
}
