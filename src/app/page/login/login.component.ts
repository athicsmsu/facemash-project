import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent, setHeaderAdmin, setHeaderID } from '../header/header.component';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../config/constants';
import { Router } from '@angular/router';
import { UserService } from '../../services/api/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent{ 
  loading = false;
  constructor(private toastr: ToastrService,private http:HttpClient,private constants : Constants, private router: Router,private header:HeaderComponent,private userService :UserService){
    if (localStorage.getItem('user')) {
      this.router.navigate(['/user'], {
        queryParams: { user: localStorage.getItem('user') },
      });
    }
  }
  login(email: HTMLInputElement,password: HTMLInputElement) {
    const url = this.constants.API_ENDPOINT + `/user`;

    if(email.value && password.value){
        this.http.get(url, {
          params : {
            Email: email.value,
          }
      }).subscribe((data:any)=>{
        if(data == null || (Array.isArray(data) && data.length === 0)){
          this.toastr.error('Email Notfound', 'Error');
        } else {
            if(data[0].Password == password.value){
              if(data[0].Type.includes("user")){
                localStorage.setItem('user', data[0].UserID);
                this.router.navigate(['/user'],{
                  queryParams: { user : data[0].UserID }
                });
                setHeaderID(this.header);
                this.toastr.success('Login');
              }
              else if(data[0].Type.includes("admin")){
                localStorage.setItem('admin', data[0].UserID);
                this.router.navigate(['/admin']);
                setHeaderAdmin(this.header);
                this.toastr.success('Login Success', 'Admin');
              }
            } else{
              this.toastr.error('Password Incorrect', 'Error');
            }
          }
      });
    } else {
        this.toastr.warning('Input is invalid', 'Warning');
    }
  }
  
  register(username: HTMLInputElement,email: HTMLInputElement,password: HTMLInputElement) {
    if(this.loading){
      this.toastr.warning('Please Wait...', 'Warning');
      return;
    } else{
      // this.toastr.info('Process...');
      this.loading = true;
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
              this.toastr.success('Sing up', 'Success');
              this.loading = false;
            });
            this.toastr.info('Process...');
          } else {
            this.toastr.error('Email already registered.', 'Error');
            this.loading = false;
          }
        })
      }else{
        this.toastr.warning('Input is Invalid', 'Warning');
        this.loading = false;
      }
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