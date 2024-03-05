import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent, setHeaderID } from '../header/header.component';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../config/constants';
import { Router } from '@angular/router';
import { UserService } from '../../services/api/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent{ 

  constructor(private http:HttpClient,private constants : Constants, private router: Router,private header:HeaderComponent,private userService :UserService){}

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
                // console.log(data[0].Type);
                localStorage.setItem('user', data[0].UserID);
                this.router.navigate(['/user'],{
                  queryParams: { user : data[0].UserID }
                });
                setHeaderID(this.header);
              }
              else if(data[0].Type.includes("admin")){
                // console.log(data[0].Type);
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
  register(username: HTMLInputElement,email: HTMLInputElement,password: HTMLInputElement) {

    const url = this.constants.API_ENDPOINT + `/user`;

    if(username.value && email.value && password.value){
      this.http.get(url, {
        params : {
          Email: email.value,
        }
      }).subscribe((data:any)=>{
        if(data == null || (Array.isArray(data) && data.length === 0)){
          this.http.post(url, {
              Username: username.value,
              Email: email.value,
              Password: password.value
          }).subscribe((data:any)=>{
            console.log(data);
          })
        } else {
          console.log("Email already registered.");
        }
      })
    }else{
      console.log("Input is invalid");
    }
  }

  @ViewChild('mainButton') mainButton!: ElementRef;
  openForm() {
    this.mainButton.nativeElement.className = 'active';
  }
  checkInput(input: HTMLInputElement) {
    if (input.value.length > 0) {
      input.className = 'active';
    } else {
      input.className = '';
    }
  }
  closeForm() {
    this.mainButton.nativeElement.className = '';
  }
}