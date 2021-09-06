import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {AuthService} from 'src/app/services/auth.service';
import {AlertController, NavController,LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.page.html',
  styleUrls: ['./registrazione.page.scss'],
})

export class RegistrazionePage implements OnInit {
  validationMessages = {
    email: [
      {type: 'required',message:'Inserisci la tua email'},
      {type:'pattern', meesage:'Email non valida. Riprova'}
    ],
    password: [
      {type: 'required', message: 'Inserisci la password'},
      {type:'minlength', message: 'La password deve essere almeno di 6 caratteri'}
    ]
  };
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private ValidationFormUSer: FormGroup;
  private loading: LoadingController;

  constructor(private router: Router,
              private navCtr: NavController ,private formbuilder: FormBuilder,
              private authService: AuthService, public loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {this.loading = this.loadingCtrl;}

  ngOnInit() {
    this.ValidationFormUSer = this.formbuilder.group({
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

  registerUser(value){
    this.showalert();
    try{
      this.authService.userRegistration(value).then( response =>{
        console.log(response);
        if(response.user){
          response.user.updateProfile({
            displayName: value.email,
            email: value.email
          });
          this.loading.dismiss();
          this.router.navigate(['login']);
        }
      }, error=>{
        this.loading.dismiss();
        this.errorLoading(error.message);

      });
    }catch(erro){
      console.log(erro);
    }
  }


  async errorLoading(message: any){
    const loading = await this.alertCtrl.create({
      header:'Error Registering',
      message,
      buttons:[{
        text:'ok',
        handler: ()=>{
          this.navCtr.navigateBack(['registrazione']);
        }
      }]
    });
    await loading.present();
  }


  async showalert(){
    const load = await this.loadingCtrl.create({
      message:'please wait....'
    });
    load.present();
  }

}
