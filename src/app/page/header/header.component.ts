import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule,RouterOutlet, RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  id:any;
  title:any = "VOTE";
  constructor(private location: Location,private router: Router){}

  goBack(): void {
		this.location.back();
	}
  logout(): void{
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
  isLoggedIn(): boolean {
    return localStorage.length > 0;
  }
  changProfile(){
    this.title = "PROFILE";
  }
  changVote(){
    this.title = "VOTE";
  }
  changRank(){
    this.title = "RANK";
  }
  changLogin(){
    this.title = "LOGIN";
  }
}
export function setHeaderID(header : HeaderComponent) {
  header.id = localStorage.getItem('user');
  header.title = "VOTE";
}