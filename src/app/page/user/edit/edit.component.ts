import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent, setHeaderID } from '../../header/header.component';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../../config/constants';
import { UserService } from '../../../services/api/user.service';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { ResRe } from '../../../model/res_get';


@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [RouterLink, RouterOutlet,ToastModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
  providers: [MessageService]
})
export class EditComponent {

  id:any;
  result : ResRe | any;
  constructor(private toastr: ToastrService,private messageService: MessageService, private route: ActivatedRoute, private http:HttpClient,private constants : Constants, private router: Router,private header:HeaderComponent,private userService :UserService){
    this.id = localStorage.getItem('user');
  }

  async edit(oldPass: HTMLInputElement, newPass: HTMLInputElement, cfPass: HTMLInputElement) {
    if(newPass.value && cfPass.value){
      this.result = await this.userService.UpdatePassword(this.id,oldPass.value,newPass.value,cfPass.value);
      // console.log(this.result.result);
      if(this.result.result.includes("Not_Password")){
        this.toastr.error('Old Password is incorrect');
      }
      else if(this.result.result.includes("Not_Math")){
        this.toastr.info('New Passwords Not Match');
      }
      else if(this.result.result.includes("success")){
        this.toastr.success('Successfully');
        const UserID = localStorage.getItem('user');
        this.router.navigate(['/profile'],{
          queryParams: { user : UserID}
        });
      }
    } else {
      this.toastr.warning('Input is invalid')
    }
  }

}
