import { Component } from '@angular/core';
import { VoteService } from '../../../services/api/vote.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { DailystatsService } from '../../../services/api/dailystats.service';

@Component({
  selector: 'app-rank',
  standalone: true,
  imports: [CommonModule,RouterLink, RouterOutlet],
  templateUrl: './rank.component.html',
  styleUrl: './rank.component.scss'
})
export class RankComponent {

  image : any[] = [];
  BeforeRank : any[] = [];
  NowRank : any[] = [];
  num : any[] = [];
  constructor(private router: Router,private voteService : VoteService,private dailyService : DailystatsService){
    this.loadDataAsync();
  }

  async loadDataAsync (){
    this.image = await this.voteService.getRank();
    for(let i = 0;i<this.image.length;i++){
      this.BeforeRank.push(await this.dailyService.getAllDailystats(this.image[i].Pid));
    }
    for(let i = 0;i<this.image.length;i++){
      this.NowRank.push(this.BeforeRank[i][0].rank);
    }
    console.log(this.NowRank);
  }
}