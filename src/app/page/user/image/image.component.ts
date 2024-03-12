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


@Component({
  selector: 'app-image',
  standalone: true,
  imports: [MatButtonModule,ChartModule,CommonModule],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss'
})
export class ImageComponent implements OnInit {
  pid : any;
  image : any;
  AllDataYesterday : any[] = [];
  NumNowRank : any[] = [];
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http : HttpClient,
    private constants: Constants,
    private userService : UserService,
    private postService : PostService,
    private dailyService: DailystatsService
  ) {
    this.route.queryParams.subscribe(params =>{
      this.pid = params['posts'];
    });
    console.log(this.pid);
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

  day: any;
  scroe: any;

  ngOnInit() {
    this.day = {
      labels: ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'],
      datasets: [
        {
          label: 'Dataset',
          data: [50, 40, 60, 50],
          fill: false, //พื้นที่ใต้กราฟ
          borderColor: '#000000', //เส้นของข้อมูล
        },
      ]
    };

    this.scroe = {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      scales: {
        x: {
          ticks: {
            color: 'rgba(255,255,255,255)'
          },
          grid: {
            color: 'rgba(255,255,255,255)',
            borderColor: 'rgba(255,255,255,255)',
            borderWidth: 1,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: 'rgba(255,255,255,255)'
          },
          grid: {
            color: 'rgba(255,255,255,255)',
            borderColor: 'rgba(255,255,255,255)',
            borderWidth: 1,
            drawBorder: false
          }
        }
      }
    };
  }
}
