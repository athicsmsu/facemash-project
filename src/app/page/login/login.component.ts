import { Component, ElementRef, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../config/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @ViewChild('email') email: ElementRef | undefined;
  id : any;

  constructor(private http:HttpClient,private constants : Constants, private router: Router){}

  login(email: HTMLInputElement,password: HTMLInputElement) {
    const url = this.constants.API_ENDPOINT + `/user`;
    
    if(email.value && password.value){
        this.http.get(url, {
          params : {
            Email: email.value,
          }
      }).subscribe((data:any)=>{
        if(data == null || (Array.isArray(data) && data.length === 0)){
          console.log("Email Incorrect");
        } else {
          if(data[0].Password == password.value){
            if(data[0].Type.includes("user")){
              console.log(data[0].Type);
              this.router.navigate(['/user'],{
                queryParams: { user : data[0].UserID }
              });
            }
            else if(data[0].Type.includes("admin")){
              console.log(data[0].Type);
              this.router.navigate(['/admin']);
            }
          } else{
            console.log("Password Incorrect");
          }
        }
      });
    } else {
      console.log("Input is invalid");
    }
  }
}