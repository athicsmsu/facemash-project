import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from '../../../config/constants';
import { UserService } from '../../../services/api/user.service';
import { PostService } from '../../../services/api/post.service';
import { VoteService } from '../../../services/api/vote.service';
import { CommonModule } from '@angular/common';
import { DailystatsService } from '../../../services/api/dailystats.service';


@Component({
  selector: 'app-image',
  standalone: true,
  imports: [MatButtonModule,CommonModule],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss'
})
export class ImageComponent {
  pid : any;
  image : any;
  AllDataYesterday : any[] = [];
  NumNowRank : any[] = [];
  constructor(private router: Router,private route: ActivatedRoute,private http : HttpClient,private constants: Constants,private userService : UserService,private postService : PostService,private voteService : VoteService,private dailyService : DailystatsService){
		this.route.queryParams.subscribe(params =>{
			this.pid = params['posts'];
		});
    if (!localStorage.getItem('user')) {
      this.router.navigateByUrl('');
    }
    this.loadDataAsync();
	}
  async loadDataAsync(){
    this.image = await this.postService.getPostsByPid(this.pid);
    console.log(this.image);
    this.AllDataYesterday.push(await this.dailyService.getAllDailystats(this.pid));
    console.log( this.AllDataYesterday);
    this.NumNowRank.push(this.AllDataYesterday[0][0].rank);
    console.log(this.NumNowRank);
  }
}