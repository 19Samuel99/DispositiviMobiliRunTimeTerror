import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { NavController } from '@ionic/angular';
import {AuthService} from '../../services/auth.service';

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
      {type:'minlength', message:'La password deve essere almeno di 5 caratteri'}

    ]
  };

  validationFormUser: FormGroup;

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
        Validators.minLength(5)
      ]))
    });
  }

  linkRegistrazione(){
    this.router.navigate(['/registrazione']);
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  LoginUser(value){
    console.log('Am logged in');
    try{
      this.authservice.loginFireauth(value).then( resp =>{
        console.log(resp);
        //  this.router.navigate(['tabs'])

        if(resp.user){

          this.authservice.setUser({
            username : resp.user.displayName,
            uid: resp.user.uid
          });

          const userProfile = this.firestore.collection('profile').doc(resp.user.uid);

          userProfile.get().subscribe( result=>{

            if(result.exists){
              this.nav.navigateForward(['tabs']);
            }else{

              this.firestore.doc(`profile/${this.authservice.getUID()}`).set({
                name: resp.user.displayName,
                email: resp.user.email
              });

              this.nav.navigateForward(['uploadimage']);
            }
          });
        }
      });
    }catch(err){
      console.log(err);
    }
  }
}
