import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { Constants } from '../../config/constants';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private http:HttpClient,private constants : Constants, private router: Router){}

  register(username: HTMLInputElement,email: HTMLInputElement,password: HTMLInputElement) {
    const url = this.constants.API_ENDPOINT + `/user`;
    if(username.value && email.value && password.value){
      this.http.post(url, {
          Username: username.value,
          Email: email.value,
          Password: password.value
      }).subscribe((data:any)=>{
        console.log(data);
        this.router.navigate(['/login']);
      })
    }else{
      console.log("Please Input");
    }
  }
}