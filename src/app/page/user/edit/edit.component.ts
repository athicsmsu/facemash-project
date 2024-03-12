import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent, setHeaderID } from '../../header/header.component';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../../config/constants';
import { UserService } from '../../../services/api/user.service';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

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
  x:any;
  constructor(private messageService: MessageService, private route: ActivatedRoute, private http:HttpClient,private constants : Constants, private router: Router,private header:HeaderComponent,private userService :UserService,private toastr: ToastrService){
    this.id = localStorage.getItem('user');
    console.log(this.id);
  }

  async edit(oldPass: HTMLInputElement, newPass: HTMLInputElement, cfPass: HTMLInputElement) {
    const x = await this.userService.UpdatePassword(this.id,oldPass.value,newPass.value,cfPass.value);
    console.log(x);
  }
  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
}

}
