import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { enviroment } from '../../../enviroments';

@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [InputTextModule, ButtonModule, ReactiveFormsModule,  HttpClientModule],
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.css'],  // Corrigido de `styleUrl` para `styleUrls`
})
export class BuscaComponent {
  youtubeUrl = new FormControl('');
  apiUrl = `${enviroment.apiServer}/download_audio`;

  constructor(private http: HttpClient) {}

  baixarMp3() {
    const url = this.youtubeUrl.value?.trim();
    if (!url) {
      alert('Por favor, insira um link válido do YouTube');
      return;
    }
  
    const params = new HttpParams().set('youtube_url', url);
  
    this.http.get(this.apiUrl, { params, responseType: 'blob' }).subscribe({
      next: (blob) => {
        // Garantir que o arquivo seja reconhecido
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = 'audio.mp3'; // Ou outro nome dinâmico baseado em resposta do backend
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        // Libera o objeto URL depois de usado
        window.URL.revokeObjectURL(downloadUrl);
      },
      error: (err) => {
        console.error('Erro ao baixar áudio:', err);
        if (err.status) {
          console.error('Status do erro:', err.status); // Código de status HTTP
          console.error('Mensagem do erro:', err.message); // Mensagem do erro
        }
      },
    });
  }
  
  
}
