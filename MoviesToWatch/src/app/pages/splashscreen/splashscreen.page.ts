import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
declare function delayScreen(): any;
@Component({
  selector: 'app-splashscreen',
  templateUrl: './splashscreen.page.html',
  styleUrls: ['./splashscreen.page.scss'],
})
export class SplashscreenPage implements OnInit {

  constructor() { }

  ngOnInit() {
    delayScreen();
  }

}
