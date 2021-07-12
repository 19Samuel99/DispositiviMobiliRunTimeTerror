import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-davedere',
  templateUrl: './davedere.page.html',
  styleUrls: ['./davedere.page.scss'],
})
export class DavederePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
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
  linkSchedainformativa(){
    this.router.navigate(['/schedainformativa']);
  }

}
