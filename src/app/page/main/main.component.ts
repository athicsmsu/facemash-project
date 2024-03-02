import { Component } from '@angular/core';
import { PostService } from '../../services/api/post.service';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { Constants } from '../../config/constants';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  id: any;
  image: any[] = [];
  score: any[] = [];
  image1: any;
  image2: any;
  score1: any;
  score2: any;
  canVote = true;

  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private constants: Constants,
    private http: HttpClient
  ) {
    this.route.queryParams.subscribe((params) => {
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

  async loadDataAsync() {
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
    if (this.score1 == null) {
      this.score1 = 0;
    }
    if (this.score2 == null) {
      this.score2 = 0;
    }
  }

<<<<<<< HEAD
  Vote(WinPid: Number, LosePid: Number, check: Number) {
    
=======
  async Vote(WinPid: Number, LosePid: Number, check: Number) {
    if (!this.canVote) {
      return; // ไม่สามารถกด Vote ได้อีก
    }

    this.canVote = false;

    const url = this.constants.API_ENDPOINT + `/vote`;
    const K = 32;
    console.log('WinPid : ' + WinPid);
    console.log('LosePid : ' + LosePid);
    console.log('Check : ' + check);
    const EA = 1 / (1 + 10 ** ((this.score2 - this.score1) / 400));
    const EB = 1 / (1 + 10 ** ((this.score1 - this.score2) / 400));
>>>>>>> ee33166ecce091857be630a379e8cba396c1d4b1

    if(!this.canVote){
      return;
    } else{
      this.canVote = false;
      const url = this.constants.API_ENDPOINT + `/vote`;
      const K = 32;
      console.log('WinPid : ' + WinPid);
      console.log('LosePid : ' + LosePid);
      console.log('Check : ' + check);
      const EA = 1 / (1 + 10 ** ((this.score2 - this.score1) / 400));
      const EB = 1 / (1 + 10 ** ((this.score1 - this.score2) / 400));

      if (check == 1) {
        //กรณี A ชนะ
        const RA = K * (1 - EA);
        console.log(RA);
        const RB = K * (0 - EB);
        console.log(RB);
        this.http
          .post(url + '/win', {
            Pid: WinPid,
            score: RA,
          })
          .subscribe((data: any) => {
            console.log(data);
          });
        this.http
          .post(url + '/lose', {
            Pid: LosePid,
            score: RB,
          })
          .subscribe((data: any) => {
            console.log(data);
          });
      } else if (check == 2) {
        //กรณี ฺB ชนะ
        const RA = K * (0 - EA);
        console.log(RA);
        const RB = K * (1 - EB);
        console.log(RB);
        this.http.post(url + '/win', {
            Pid: WinPid,
            score: RB,
          })
          .subscribe((data: any) => {
            console.log(data);
          });
        this.http.post(url + '/lose', {
            Pid: LosePid,
            score: RA,
          })
          .subscribe((data: any) => {
            console.log(data);
          });
      }
    }

<<<<<<< HEAD
=======
    // รอเวลา 5 วินาที
  await this.delay(5000);

  // เปิดให้สามารถกด Vote ได้อีก
  this.canVote = true;

  // โหลดข้อมูลใหม่หลังจาก Vote
  this.loadDataAsync();

  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
>>>>>>> ee33166ecce091857be630a379e8cba396c1d4b1
  }
}
function getRandomIndex(array: any[]): number {
  return Math.floor(Math.random() * array.length);
}
