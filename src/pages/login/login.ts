import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';
import {Validators, FormBuilder, FormControl, FormGroup, EmailValidator} from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styles: [`p {
    width:200px;
    background:lightgray;
    margin: 100px auto;
    text-align:center;
    padding:20px;
    font-size:1.5em;
  }`],
  animations: [
    trigger('myAwesomeAnimation', [
      state('small', style({
          transform: 'scale(1)',
      })),
      state('large', style({
          transform: 'scale(1.2)',
      })),
      transition('small <=> large', animate('300ms ease-in', keyframes([
        style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
        style({opacity: 1, transform: 'translateY(35px)',  offset: 0.5}),
        style({opacity: 1, transform: 'translateY(0)',     offset: 1.0})
      ]))),
  ]),
  ]
})
export class LoginPage {
  private form : FormGroup;
  public data:any = {};
  constructor(public navCtrl: NavController,
    private formBuilder: FormBuilder,) {
      this.form = formBuilder.group({
        nickname: ['', [Validators.required, Validators.minLength(5)]],
        password: ['', [Validators.required, Validators.minLength(5)]]
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  state: string = 'small';
  
    animateMe() {
          this.state = (this.state === 'small' ? 'large' : 'small');
    }

}
