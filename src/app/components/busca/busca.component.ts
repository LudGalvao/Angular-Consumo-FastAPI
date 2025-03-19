import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { enviroment } from '../../../enviroments';


@Component({
  selector: 'app-busca',
  imports: [InputTextModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.css'
})

export class BuscaComponent {
  youtubeUrl = new FormControl('');
  apiUrl = `${enviroment.apiServer}/download_audio`;

  constructor(private http: HttpClient) {}

  baixarMp3(){
    const url = this.youtubeUrl.value?.trim()
    if (!url){
      alert('Por favor, insira um link válido do Youtube');
      return;
    }

    const params = new HttpParams().set('youtube_url', url)

    this.http.get(this.apiUrl, { params, responseType: 'blob'}).subscribe({
      next: (blob) => {
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = 'audio.mp3';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      },

      error: (err) =>{
        console.error('Erro ao baixar áudio:', err)
        alert('Erro ao baixar o áudio. Verifique a URL')
      }
    })
  }
}
