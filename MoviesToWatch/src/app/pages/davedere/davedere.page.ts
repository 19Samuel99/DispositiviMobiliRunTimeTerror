import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/app';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
@Component({
  selector: 'app-davedere',
  templateUrl: './davedere.page.html',
  styleUrls: ['./davedere.page.scss'],
})
export class DavederePage implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute , private firestore: AngularFirestore,
              public auth: AngularFireAuth) { }

  ngOnInit() {
    this.controllaDaVedere()
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
   async controllaDaVedere() {
let arraiDiID = []
     const promise = this.firestore.collection('Utenti').doc(firebase.auth().currentUser.uid).get()
     promise.toPromise().then(snapshot =>{
       const data = snapshot.data()
       console.log(data)
       for(let i = 0; i< data['davedere'].length; i++){
         arraiDiID[i] = data['davedere'][i]
       console.log(arraiDiID[i])
         console.log(arraiDiID)
     }
       console.log('questo è array fuori dal ciclo', arraiDiID)

     })

       }

}
  //return await this.firestore.collection('Utenti').doc(firebase.auth().currentUser.uid).get().subscribe(snapshot=> console.log('document data:' , snapshot.data()))
    //return await this.firestore.collection('Utenti').doc(firebase.auth().currentUser.uid).get().subscribe(snapshot=> console.log('document data:' , snapshot.data().davedere))
   // console.log('ma funziona?')
 //

/* let   rootRef = firebase.database().ref();
   let  currentUID = firebase.auth().currentUser.uid
   let  oneRef = rootRef.child('Utenti').child(currentUID).child('davedere')
console.log(oneRef)*/
