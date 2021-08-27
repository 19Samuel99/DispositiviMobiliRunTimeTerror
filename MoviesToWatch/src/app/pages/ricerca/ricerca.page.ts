import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TestService} from '../../services/test.service';

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.page.html',
  styleUrls: ['./ricerca.page.scss'],
})
export class RicercaPage implements OnInit {

  myInput = '';

  constructor(private router: Router, public testservice: TestService,) { }

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
  /*
  linkSchedainformativa(){
    this.router.navigate(['/schedainformativa']);
  }*/

  // eslint-disable-next-line @typescript-eslint/naming-convention
 /** Cerca(nome){
    this.testservice.getFilm(nome).subscribe(data => {
      console.log(data);  //al posto di data facciamo l'operazione richiesta.
    });
  }*/
}
