import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/api/user.service';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';  
import { Constants } from '../../config/constants';
import { PostService } from '../../services/api/post.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  image : any[]=[];
  id:any;
  user : any;
  Avatar : any;
  file? : File;
  constructor(private route: ActivatedRoute,private userService : UserService,private http : HttpClient,private constants: Constants,private postService : PostService){
		this.route.queryParams.subscribe(params =>{
			this.id = params['user'];
		});
	}

  ngOnInit(): void {
    this.loadDataAsync();
  }

  async loadDataAsync (){

    this.user = await this.userService.getUser(this.id);
    this.image =  await this.postService.getPosts(this.id);
    console.log(this.image);
    this.Avatar = this.user[0].Avatar;
    // console.log(this.user);
  }

  async onFileSelected(event: any): Promise<void> {
    this.file = event.target.files[0];
    console.log(this.file);

    if (this.file) {
      const formData = new FormData();
      formData.append('file',this.file);
      console.log(formData);
      const url = this.constants.API_ENDPOINT + "/posts/"+this.id;
      const response = await lastValueFrom(this.http.post(url, formData));
    }
    await this.delay(3000);
    this.loadDataAsync();

  }
  async delay(ms: number) {
    return await new Promise((resolve) => setTimeout(resolve, ms));
  }
}