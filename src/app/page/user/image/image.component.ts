import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from '../../../config/constants';
import { UserService } from '../../../services/api/user.service';
import { PostService } from '../../../services/api/post.service';
import { VoteService } from '../../../services/api/vote.service';
import { ChartModule } from 'primeng/chart';
import { DailystatsService } from '../../../services/api/dailystats.service';
import { CommonModule } from '@angular/common';
import { ResRow } from '../../../model/res_get_row';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-image',
  standalone: true,
  imports: [MatButtonModule,ChartModule,CommonModule],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss'
})
export class ImageComponent implements OnInit {
  
  responseRow : ResRow | any;
  pid : any;
  image : any;
  AllDataYesterday : any[] = [];
  data7day : any[] = [];
  NumNowRank : number = 0;
  NowRank : any[] = [];
  rank : number = 0;
  file? : File;
  score : any = 0;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private http : HttpClient,
    private constants: Constants,
    private userService : UserService,
    private postService : PostService,
    private dailyService: DailystatsService,
    private voteService : VoteService
  ) {
    this.route.queryParams.subscribe(params =>{
      this.pid = params['posts'];
    });
    if (!localStorage.getItem('user')) {
      this.router.navigateByUrl('');
    }
    
  }
  ngOnInit(): void {
    this.loadDataAsync();
  }

  async loadDataAsync(){
    this.image = await this.postService.getPostsByPid(this.pid);
    // console.log(this.image);
    this.data7day = await this.dailyService.getAllDailystats7day(this.pid);
    // console.log(this.data7day);
    if(this.data7day.length>0){
     this.NumNowRank = this.data7day[this.data7day.length-1].rank; 
    }
    else{
      this.NumNowRank = 0;
    }
    this.NowRank = await this.voteService.nowRank();
    // console.log(this.NowRank);
    for (let index = 0; index < this.NowRank.length; index++) {
      if(this.pid == this.NowRank[index].pid){  
        this.rank = this.NowRank[index].rank;
        this.score = this.NowRank[index].total_score;
      }
    }
    this.loadGraph();
  }
  
  async onChangePost(event: any): Promise<void> {
    this.toastr.info('Process...');
    this.file = event.target.files[0];
    if (this.file) {
      const formData = new FormData();
      formData.append('file',this.file);
      this.responseRow = await this.postService.UpdatePosts(this.pid,formData);
    }
    const UserID = localStorage.getItem('user');
    this.router.navigate(['/profile'],{
      queryParams: { user : UserID}
    });
    this.toastr.success('Change Success');
  }

  async delay(ms: number) {
    return await new Promise((resolve) => setTimeout(resolve, ms));
  }

  day: any;
  scroe: any;

  loadGraph() {
    const labels = this.data7day.map(day => day.formatted_date);
    const data = this.data7day.map(day => day.score);

    this.day = {
      labels: labels,
      datasets: [
        {
          label: 'Score',
          data: data,
          fill: false, //พื้นที่ใต้กราฟ
          borderColor: '#005f99', //เส้นของข้อมูล
        },
      ]
    };

    this.scroe = {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      width: 1000,
      scales: {
        x: {
          ticks: {
            color: '#000000'
          },
          grid: {
            color: '#000000',
            borderColor: '#000000',
            borderWidth: 1,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: '#000000'
          },
          grid: {
            color: '#000000',
            borderColor: '#000000',
            borderWidth: 1,
            drawBorder: false
          }
        }
      }
    };
  }
}
