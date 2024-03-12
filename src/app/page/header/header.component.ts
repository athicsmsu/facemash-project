import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/api/user.service';

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
  user : any;
  constructor(private location: Location,private router: Router,private userService : UserService){
    this.id = localStorage.getItem('user');
  }
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.routerState.snapshot.url;
        if (currentRoute.includes('/rank')) {
          this.title= "RANK";
        }
        if (currentRoute.includes('/profile') || currentRoute.includes('/image')) {
          this.title= "PROFILE";
        }
        if (currentRoute.includes('/user')) {
          this.title= "VOTE";
        }
        if (currentRoute == '/edit') {
          this.title= "EDIT";
        }
        if (currentRoute.includes('/login')) {
          this.title= "LOGIN";
        }
        if (currentRoute == '/') {
          this.title= "VOTE";
        }
      }
    });
    this.loadDataUser();
  }
  async loadDataUser(){
    this.user = await this.userService.getAllDataUser(this.id);
  }
  goBack(): void {
		this.location.back();
    // Subscribe to NavigationEnd event to get the current route after navigation
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.routerState.snapshot.url;
        if (currentRoute.includes('/rank')) {
          this.title= "RANK";
        }
        if (currentRoute.includes('/profile')) {
          this.title= "PROFILE";
        }
        if (currentRoute.includes('/user')) {
          this.title= "VOTE";
        }
        if (currentRoute == '/edit') {
          this.title= "EDIT";
        }
        if (currentRoute.includes('/login')) {
          this.title= "LOGIN";
        }
        if (currentRoute == '/') {
          this.title= "VOTE";
        }
      }
    });
	}
  logout(): void{
    localStorage.removeItem('user');
    this.router.navigate(['/']);
    this.title= "VOTE";
    this.id = null;
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
  header.loadDataUser();
}
export function setHeaderProfile(header : HeaderComponent) {
  header.title = "PROFILE";
}