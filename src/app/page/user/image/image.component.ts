import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { Constants } from '../../../config/constants';
import { UserService } from '../../../services/api/user.service';
import { PostService } from '../../../services/api/post.service';
import { VoteService } from '../../../services/api/vote.service';


@Component({
  selector: 'app-image',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss'
})
export class ImageComponent {
  pid : any;

  constructor(private route: ActivatedRoute,private http : HttpClient,private constants: Constants,private userService : UserService,private postService : PostService,private voteService : VoteService){
		this.route.queryParams.subscribe(params =>{
			this.pid = params['posts'];
		});
    console.log(this.pid);
	}
}
