import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
declare function delay(): any;
@Component({
  selector: 'app-splashscreen',
  templateUrl: './splashscreen.page.html',
  styleUrls: ['./splashscreen.page.scss'],
})
export class SplashscreenPage implements OnInit {

  constructor() { }

  ngOnInit() {
    delay();
  }

}
