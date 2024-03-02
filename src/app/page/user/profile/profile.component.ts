import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/api/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  id:any;
  user : any;
  Avatar : any;
  constructor(private route: ActivatedRoute,private userService : UserService){
		this.route.queryParams.subscribe(params =>{
			this.id = params['user'];
		});
	}
  ngOnInit(): void {
    this.loadDataAsync();
  }
  async loadDataAsync (){
    this.user = await this.userService.getUser(this.id);
    this.Avatar = this.user[0].Avatar;
    console.log(this.user);
  }
}
