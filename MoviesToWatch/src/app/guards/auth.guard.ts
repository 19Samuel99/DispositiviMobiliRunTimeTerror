import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise( (resolve, reject)=>{
   try{firebase.auth().onAuthStateChanged((user: firebase.User)=>{
     if(user){   //se è una variabile quindi se esiste
       resolve(true);
     }})}
     catch(error){
     console.log('sei stato reindirizzato perchè non avevi i permessi')
       this.router.navigate(['login']);
     }
      });

  }
}
