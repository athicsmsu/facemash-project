import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/api/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
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