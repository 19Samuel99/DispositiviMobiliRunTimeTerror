import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/app';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
@Component({
  selector: 'app-giavisti',
  templateUrl: './giavisti.page.html',
  styleUrls: ['./giavisti.page.scss'],
})
export class GiavistiPage implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute , private firestore: AngularFirestore,
              public auth: AngularFireAuth) { }

  ngOnInit() {
    this.controllaGiaVisti()
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
  async controllaGiaVisti() {
    let arraiDiID = []
    const promise = this.firestore.collection('Utenti').doc(firebase.auth().currentUser.uid).get()
    promise.toPromise().then(snapshot =>{
      const data = snapshot.data()
      console.log(data)
      for(let i = 0; i< data['giavisti'].length; i++){
        arraiDiID[i] = data['giavisti'][i]
        console.log(arraiDiID[i])
        console.log(arraiDiID)
      }
      console.log('questo è array fuori dal ciclo', arraiDiID)

    })

  }
}
