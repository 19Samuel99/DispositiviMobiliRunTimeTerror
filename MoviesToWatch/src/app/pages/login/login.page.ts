import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { NavController } from '@ionic/angular';
import {AuthService} from '../../services/auth.service';
import firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validationUserMessage ={
    email:[
      {type:'required', message:'Inserisci la tua email'},
      {type:'pattern', message:'Email non valida. Riprova'}
    ],
    password:[
      {type:'required', message:'Inserisci la password'},
      {type:'minlength', message:'La password deve essere almeno di 6 caratteri'}

    ]
  };

  validationFormUser: FormGroup;
  data: any;
  constructor(private router: Router, public formbuilder: FormBuilder, public authservice: AuthService,
              private firestore: AngularFirestore, private nav: NavController) { }

  ngOnInit() {
    this.validationFormUser = this.formbuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]))
    });
  }

  linkRegistrazione(){
    this.router.navigate(['/registrazione']);
  }


  // eslint-disable-next-line @typescript-eslint/naming-convention
  LoginUser(value){
    try{
      this.authservice.loginFireauth(value).then( resp =>{
        console.log(resp);
        // this.router.navigate(['areautente']);
        if(resp.user){
          this.authservice.setUser({
            email: resp.user.email,
            uid: resp.user.uid
          });
          const userProfile = this.firestore.collection('Utenti').doc(resp.user.uid);
          console.log(userProfile);
          userProfile.get().subscribe( result=>{
            if(result.exists){
              console.log('esiste');
              if (firebase.auth().currentUser !== null)
                {console.log('user id: ' + firebase.auth().currentUser.uid);}
              this.nav.navigateForward(['areautente']);
            }else{
              console.log('non esiste');
              this.firestore.doc(`Utenti/${this.authservice.getUID()}`).set({
                name: resp.user.displayName,
                email: resp.user.email,
                giavisti: [],
                davedere: []
              });
              this.nav.navigateForward(['areautente']);
            }
          });
        }
      });
    }catch(err){
      console.log(err); //email o password errate
    }
  }
}


