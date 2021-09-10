import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/app';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class QueryService {
  constructor( private firestore: AngularFirestore,
              public auth: AngularFireAuth) {}
  async updateArrayGiaVisti(idFilm) {
    await this.firestore.collection('Utenti').doc(firebase.auth().currentUser.uid).update({
      giavisti: []
    });
  }
  async updateArrayDaVedere(idFilm) {
    await this.firestore.collection('Utenti').doc(firebase.auth().currentUser.uid).update({
      davedere: []
    });
  }
}

