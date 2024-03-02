import { Component } from '@angular/core';
import { PostService } from '../../services/api/post.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule,RouterLink, RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  id:any;
  image : any[] = [];
  score : any[] = [];
  image1 : any;
  image2 : any;
  score1 : any;
  score2 : any;

  constructor(private postService : PostService,private router: Router,private route: ActivatedRoute){
    this.route.queryParams.subscribe(params =>{
			this.id = params['user'];
		}); 
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/user'], {
        queryParams: { user: localStorage.getItem('user') },
      });
    } else {
      this.router.navigateByUrl('');
    }
    this.loadDataAsync();
  }

  async loadDataAsync (){
    this.image = await this.postService.getPosts();
    this.image1 = this.image[getRandomIndex(this.image)];
    do {
      this.image2 = this.image[getRandomIndex(this.image)];
    } while (this.image2 === this.image1);
    // console.log(this.image1);
    // console.log(this.image2);
    this.score = await this.postService.getScore(this.image1.Pid);
    this.score1 = this.score[0].total_score;
    this.score = await this.postService.getScore(this.image2.Pid);
    this.score2 = this.score[0].total_score;
    if(this.score1 == null){
      this.score1 = 0;
    }
    if(this.score2 == null){
      this.score2 = 0;
    }
  }

  Vote(WinPid : Number,LosePid : Number) {
    const K = 32;
    console.log("Vote");
    console.log("Pid : "+WinPid);
    console.log(this.score1);
    console.log(this.score2);
    const EA = 1/(1+(10**((2600-3000)/400)));
    console.log(EA);
    const RA = K*(1-EA);
    const EB = 1/(1+(10**((3000-2600)/400)));
    console.log(EB);
    // const EB = 1/1+10 (this.score2-this.score1)/400;
  }
  VoteWin2(Pid : Number) {
    const K = 32;
    console.log("Vote");
    console.log("Pid : "+Pid);
    console.log(this.score1);
    console.log(this.score2);
    const EA = 1/(1+(10**((2600-3000)/400)));
    console.log(EA);
    const EB = 1/(1+(10**((3000-2600)/400)));
    console.log(EB);
    // const EB = 1/1+10 (this.score2-this.score1)/400;
  }
}
function getRandomIndex(array: any[]): number {
  return Math.floor(Math.random() * array.length);
}