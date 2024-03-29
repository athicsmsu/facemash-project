import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/api/user.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule,RouterLink, RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

  
  data : any[] = [];

  constructor(private router: Router,private userService : UserService){
    if (localStorage.getItem('admin')) {
      this.router.navigateByUrl('/admin');
    } else {
      this.router.navigateByUrl('');
    }
    this.loadDataAsync();
  }

  async loadDataAsync (){
    this.data = await this.userService.getAllUser();
    // console.log(this.data);
  }
  
  IDuser(UserID: any) {
    console.log(UserID);

    
  }
}
