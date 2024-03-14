import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/api/user.service';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';  
import { Constants } from '../../config/constants';
import { PostService } from '../../services/api/post.service';
import { ResRow } from '../../model/res_get_row';
import { VoteService } from '../../services/api/vote.service';
import { HeaderComponent } from '../header/header.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule,HttpClientModule,RouterOutlet, RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  responseRow : ResRow | any;
  image : any[]=[];
  id:any;
  user : any;
  Avatar : any;
  file? : File;
  load : any;
  show : any = false;
  loadAvatar : any = false;
  loaddelete : any = false;

  constructor(private toastr: ToastrService,private header:HeaderComponent,private router: Router,private route: ActivatedRoute,private http : HttpClient,private constants: Constants,private userService : UserService,private postService : PostService,private voteService : VoteService)
  {
		this.route.queryParams.subscribe(params =>{
			this.id = params['user'];
		});
	}

  ngOnInit(): void {
    if (!localStorage.getItem('user')) {
      this.router.navigateByUrl('');
    }
    this.loadDataAsync();
  }

  async loadDataAsync (){
    if(localStorage.getItem('user') == this.id){
      this.show = true;
    } else {
      this.show = false;
    }
    this.user = await this.userService.getAllDataUser(this.id);
    this.image =  await this.postService.getPosts(this.id);
    this.Avatar = this.user[0].Avatar;
    // console.log(this.user);
    this.load = false;
    this.loadAvatar = false;
    this.loaddelete = false;
  }
  
  async onFileSelected(event: any): Promise<void> {
    this.load = true;
    this.file = event.target.files[0];
    if (this.file) {
      const formData = new FormData();
      formData.append('file',this.file);
      this.responseRow = await this.postService.UploadPosts(this.id,formData);
      this.responseRow = await this.voteService.NewPosts(this.responseRow.last_idx);
    }
    await this.delay(3000);
    this.toastr.success('Upload Success');
    this.loadDataAsync();
  }

  async onAvatar(event: any): Promise<void> {
    this.loadAvatar = true;
    this.toastr.info('Process...');
    this.file = event.target.files[0];
    if (this.file) {
      const formData = new FormData();
      formData.append('file',this.file);
      this.responseRow = await this.userService.UpdateAvatar(this.id,formData);
    }
    this.loadAvatar = true;
    await this.delay(3000);
    this.toastr.success('Change Avatar Success');
    this.loadDataAsync();
    this.header.loadDataUser();
  } 

  async delay(ms: number) {
    return await new Promise((resolve) => setTimeout(resolve, ms));
  }

  async DeletePost(Pid: any) {
    if(this.loaddelete){
      this.toastr.warning('Please Wait...')
      return;
    } else {
      this.toastr.info('Process...');
      this.loaddelete = true;
      const response = await this.postService.DeletePosts(Pid);
      await this.delay(3000);
      this.toastr.success('Delete Success');
      this.loadDataAsync();
    }
  }

  async ChangeInformation(username: HTMLInputElement,email: HTMLInputElement){
    const url = this.constants.API_ENDPOINT + `/user`;
    if(username.value && email.value){
      this.http.put(url + "/" + this.id, {
          Username: username.value,
          Email: email.value
      }).subscribe((data:any)=>{
        this.toastr.success('Save Success');
      });
      await this.delay(3000);
      this.loadDataAsync();
    }else{
      this.toastr.warning('Input is invalid', 'warning')
    }
  }
}