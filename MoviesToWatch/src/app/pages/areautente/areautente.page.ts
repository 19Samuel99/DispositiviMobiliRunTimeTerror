import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import firebase from 'firebase';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-areautente',
  templateUrl: './areautente.page.html',
  styleUrls: ['./areautente.page.scss'],
})
export class AreautentePage implements OnInit {

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

  linkLogin(){
    this.router.navigate(['/login']);
  }
  getEmail(){
    if (firebase.auth().currentUser !== null){
      const email = firebase.auth().currentUser.email;
      document.getElementById('emailtd').innerHTML = email;
    }
  }
}
