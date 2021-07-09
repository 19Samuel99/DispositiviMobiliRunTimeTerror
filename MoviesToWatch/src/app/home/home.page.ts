import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) { }

  ngOnInit(){
  }

  linkHome(){
    this.router.navigate(['/home']);
  }

  linkFilmvisti(){
    this.router.navigate(['/filmvisti']);
  }

  linkFilmdavedere(){
    this.router.navigate(['/filmdavedere']);
  }

  linkAreautente(){
    this.router.navigate(['/areautente']);
  }

  linkRicerca(){
    this.router.navigate(['/ricerca']);
  }

  linkToprated(){
    this.router.navigate(['/toprated']);
  }

  linkQuestionario(){
    this.router.navigate(['/questionario']);
  }

}
