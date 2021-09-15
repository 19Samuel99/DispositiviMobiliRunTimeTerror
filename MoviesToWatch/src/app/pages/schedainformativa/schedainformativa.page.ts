import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/app';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';

// eslint-disable-next-line @typescript-eslint/naming-convention
declare function GetFullCredits(idFilm): any;

@Component({
  selector: 'app-schedainformativa',
  templateUrl: './schedainformativa.page.html',
  styleUrls: ['./schedainformativa.page.scss'],
})
export class SchedainformativaPage implements OnInit {

  idFilm = null;

  constructor(private router: Router, private activatedRoute: ActivatedRoute , private firestore: AngularFirestore,
  public auth: AngularFireAuth) {

  }

  ngOnInit() {
    this.idFilm = this.activatedRoute.snapshot.paramMap.get('idFilm');
    GetFullCredits(this.idFilm);//PARTE AL CARICAMENTO DELLA PAGINA
  }

  linkHome() {
    this.router.navigate(['/home']);
  }

  linkFilmvisti() {
    this.router.navigate(['/giavisti']);
  }

  linkFilmdavedere() {
    this.router.navigate(['/davedere']);
  }

  linkAreautente() {
    this.router.navigate(['/areautente']);
  }

  linkRicerca() {
    this.router.navigate(['/ricerca']);
  }

  async addDaVedere() {//AGGIUNGE IL FILM AL PREMERE DEL BOTTONE IN SCHEDA INFORMATIVA
    this.idFilm = this.activatedRoute.snapshot.paramMap.get('idFilm');
    await this.firestore.collection('Utenti').doc(firebase.auth().currentUser.uid).update({
      davedere: firebase.firestore.FieldValue.arrayUnion( this.idFilm )
    });
  }
  async addGiaVisti() {//AGGIUNGE IL FILM AL PREMERE DEL BOTTONE IN SCHEDA INFORMATIVA
    this.idFilm = this.activatedRoute.snapshot.paramMap.get('idFilm');
    await this.firestore.collection('Utenti').doc(firebase.auth().currentUser.uid).update({
      giavisti: firebase.firestore.FieldValue.arrayUnion( this.idFilm )
    });
  }

}
