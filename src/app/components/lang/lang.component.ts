import { Component } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco'

@Component({
  selector: 'app-lang',
  imports: [],
  templateUrl: './lang.component.html',
  styleUrl: './lang.component.scss'
})
export class LangComponent {
  constructor(private translocoService: TranslocoService){}
  changeLang(lang: string){
    this.translocoService.setActiveLang(lang);
  }
}
