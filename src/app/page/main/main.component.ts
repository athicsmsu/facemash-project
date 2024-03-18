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
import { HeaderComponent, setHeaderAdmin, setHeaderProfile } from '../header/header.component';
import { ToastrService } from 'ngx-toastr';

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
  canVote = true;
  countnum = 0;

  constructor(
    private postService: PostService,
    private userService : UserService,
    private router: Router,
    private route: ActivatedRoute,
    private constants: Constants,
    private http: HttpClient,
    private header:HeaderComponent,
    private toastr: ToastrService
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
    } else if (localStorage.getItem('admin')) {
      setHeaderAdmin(this.header);
      this.router.navigate(['/admin']);
    } else {
      this.router.navigateByUrl('');
    }
    this.loadDataAsync();
  }

  async loadDataAsync() {
    this.image = await this.postService.getPosts();
    this.image1 = this.image[this.getRandomIndex(this.image)];
    do {
      this.image2 = this.image[this.getRandomIndex(this.image)];
    } while (this.image2 === this.image1);
    // เปิดให้สามารถกด Vote ได้อีก
    this.canVote = true;
  }

  async Vote(WinPid: Number, LosePid: Number, check: Number) {
    
    if (!this.canVote) {
      this.toastr.warning('Please Wait...')
      return; // ไม่สามารถกด Vote ได้อีก
    } else {
      this.canVote = false;
      const url = this.constants.API_ENDPOINT + "/vote";
      const K = 32;
      const EA = 1 / (1 + 10 ** ((this.image2.total_score - this.image1.total_score) / 400));
      const EB = 1 / (1 + 10 ** ((this.image1.total_score - this.image2.total_score) / 400));
      this.toastr.success('Vote Success');
      if (check == 1) {
        //กรณี A ชนะ
        const RA = K * (1 - EA);
        console.log(RA);
        const RB = K * (0 - EB);
        console.log(RB);
        this.toastr.info('ภาพซ้าย +'+RA.toFixed(0).toString() + ' ภาพขวา '+RB.toFixed(0).toString());
        console.log('ภาพซ้าย '+this.image2.Pid+ RA.toFixed(0).toString() + ' ภาพขวา '+this.image1.Pid+ RB.toFixed(0).toString());
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
        this.toastr.info('ภาพซ้าย '+ RA.toFixed(0).toString() + ' ภาพขวา +'+ RB.toFixed(0).toString());
        console.log('ภาพซ้าย '+this.image1.Pid+ RA.toFixed(0).toString() + ' ภาพขวา '+this.image2.Pid+ RB.toFixed(0).toString());
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
      this.countnum = 3;
    }
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
  getRandomIndex(array: any[]): number {
    return Math.floor(Math.random() * array.length);
  }
}
// function getRandomIndex(array: any[]): number {
//   return Math.floor(Math.random() * array.length);
// }