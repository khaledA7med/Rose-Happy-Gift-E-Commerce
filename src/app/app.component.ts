import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { initFlowbite } from 'flowbite';
import { AuthComponent } from './feature/pages/auth/auth.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AuthComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ROSE happy gift';
  ngOnInit(): void {
    initFlowbite();
  }

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en'); // Default language
    const browserLang = this.translate.getBrowserLang() || 'en'; // Ensure it's always a string
    this.translate.use(browserLang.match(/en|ar/) ? browserLang : 'en');
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }
}
