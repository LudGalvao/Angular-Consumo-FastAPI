import { Component } from '@angular/core';
import { BuscaComponent } from './components/busca/busca.component';
@Component({
  selector: 'app-root',
  imports: [BuscaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'siteytmp3';
}
