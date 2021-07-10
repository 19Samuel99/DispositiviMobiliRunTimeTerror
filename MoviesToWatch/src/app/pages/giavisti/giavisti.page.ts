import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-giavisti',
  templateUrl: './giavisti.page.html',
  styleUrls: ['./giavisti.page.scss'],
})
export class GiavistiPage implements OnInit {

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
}
