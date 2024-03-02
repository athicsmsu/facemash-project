import { Component } from '@angular/core';
import { VoteService } from '../../../services/api/vote.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-rank',
  standalone: true,
  imports: [CommonModule,RouterLink, RouterOutlet],
  templateUrl: './rank.component.html',
  styleUrl: './rank.component.scss'
})
export class RankComponent {
  image : any[] = [];
  constructor(private voteService : VoteService,private router: Router){
    this.loadDataAsync();
  }

  async loadDataAsync (){
    this.image = await this.voteService.getRank();
    console.log(this.image);
    
  }
}
