import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
// eslint-disable-next-line @typescript-eslint/naming-convention
declare function GetTopRated(): any;
@Component({
  selector: 'app-toprated',
  templateUrl: './toprated.page.html',
  styleUrls: ['./toprated.page.scss'],
})
export class TopratedPage implements OnInit {

  constructor(private router: Router) {  }

  ngOnInit() {
    GetTopRated();
  }
  linkHome(){
    this.router.navigate(['/home']);
  }

  linkFilmvisti(){
    this.router.navigate(['/giavisti']);
  }

  linkFilmdavedere(){
    this.router.navigate(['/davedere']);
  }

  linkAreautente(){
    this.router.navigate(['/areautente']);
  }

  linkRicerca(){
    this.router.navigate(['/ricerca']);
  }
  linkSchedainformativa(idFilm){
    this.router.navigate(['/schedainformativa',idFilm]);

  }
}
