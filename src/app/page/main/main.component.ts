import { Component } from '@angular/core';
import { PostService } from '../../services/api/post.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule,RouterLink, RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  image : any[] = [];
  image1 : any;
  image2 : any;
  constructor(private postService : PostService,private router: Router){}

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
    // console.log(this.image);
    this.image1 = this.image[getRandomIndex(this.image)];
    do {
      this.image2 = this.image[getRandomIndex(this.image)];
    } while (this.image2 === this.image1);
  }
}
function getRandomIndex(array: any[]): number {
  return Math.floor(Math.random() * array.length);
}