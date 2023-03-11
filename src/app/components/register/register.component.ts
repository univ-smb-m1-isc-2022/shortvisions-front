import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  constructor() {
  }
  ngOnInit(): void {
    console.log('RegisterComponent.ngOnInit()', this);
    console.log('MOUNTED')
  }

  submitButton(){
    console.log('RegisterComponent.submitButton()', this);
  }
}
