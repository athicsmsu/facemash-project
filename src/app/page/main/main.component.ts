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
import { UserService } from '../../services/api/user.service';
import { HeaderComponent, setHeaderProfile } from '../header/header.component';

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
  user1: any;
  user2: any;
  score1: any;
  score2: any;
  canVote = true;
  countnum = 0;

  constructor(
    private postService: PostService,
    private userService : UserService,
    private router: Router,
    private route: ActivatedRoute,
    private constants: Constants,
    private http: HttpClient,
    private header:HeaderComponent
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
    this.user1 = await this.userService.getAllDataUser(this.image1.UserID);
    this.user2 = await this.userService.getAllDataUser(this.image2.UserID);
    this.score = await this.postService.getScore(this.image1.Pid);
    this.score1 = this.score[0].total_score;
    this.score = await this.postService.getScore(this.image2.Pid);
    this.score2 = this.score[0].total_score;
    // เปิดให้สามารถกด Vote ได้อีก
    this.canVote = true;
  }

  async Vote(WinPid: Number, LosePid: Number, check: Number) {
    
    if (!this.canVote) {
      return; // ไม่สามารถกด Vote ได้อีก
    } else {
      this.countnum = 5;
    }
    this.canVote = false;
    const url = this.constants.API_ENDPOINT + "/vote";
    const K = 32;
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
          // console.log(data);
        });
      this.http
        .post(url + '/lose', {
          Pid: LosePid,
          score: RB,
        })
        .subscribe((data: any) => {
          // console.log(data);
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
          // console.log(data);
        });
      this.http.post(url + '/lose', {
          Pid: LosePid,
          score: RA,
        })
        .subscribe((data: any) => {
          // console.log(data);
        });
    }
    // รอเวลา 5 วินาที
    await this.delay(1000);
    this.countnum = 4;
    await this.delay(1000);
    this.countnum = 3;
    await this.delay(1000);
    this.countnum = 2;
    await this.delay(1000);
    this.countnum = 1;
    await this.delay(1000);
    this.countnum = 0;
    // โหลดข้อมูลใหม่หลังจาก Vote
    this.loadDataAsync();
  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  ChangeHeader(){
    setHeaderProfile(this.header);
  }
}
function getRandomIndex(array: any[]): number {
  return Math.floor(Math.random() * array.length);
}