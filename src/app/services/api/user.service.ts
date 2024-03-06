import { Injectable } from '@angular/core';
import { Constants } from '../../config/constants';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ResUser } from '../../model/res_get_user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private constants : Constants,private http:HttpClient) { }

  public async getAllDataUser(options?:any){
    let url = '';
    if(options){
      const id = options;
      url = this.constants.API_ENDPOINT + '/user/' + id;
    }else{
      url = this.constants.API_ENDPOINT + '/user';
    }
    const response = await lastValueFrom(this.http.get(url));
    console.log(response);
    
    return response as ResUser[];
  }
}