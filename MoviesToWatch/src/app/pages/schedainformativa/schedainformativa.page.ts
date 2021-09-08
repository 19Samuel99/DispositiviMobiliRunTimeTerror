import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

declare function GetFullCredits(idFilm): any;

@Component({
  selector: 'app-schedainformativa',
  templateUrl: './schedainformativa.page.html',
  styleUrls: ['./schedainformativa.page.scss'],
})
export class SchedainformativaPage implements OnInit {

  idFilm = null;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.idFilm = this.activatedRoute.snapshot.paramMap.get('idFilm');
    GetFullCredits(this.idFilm)
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
}
