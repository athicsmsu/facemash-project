import { Injectable } from '@angular/core';
import { Constants } from '../../config/constants';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ResUser } from '../../model/res_get_user';
import { ResRow } from '../../model/res_get_row';
import { ResRe } from '../../model/res_get';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private constants : Constants,private http:HttpClient) { }

  public async getAllUser(){
    let url = this.constants.API_ENDPOINT + '/user/userAll';
    const response = await lastValueFrom(this.http.get(url));
    return response as any[];
  }

  public async getAllDataUser(options?:any){
    let url = '';
    if(options){
      const id = options;
      url = this.constants.API_ENDPOINT + '/user/' + id;
    }else{
      url = this.constants.API_ENDPOINT + '/user';
    }
    const response = await lastValueFrom(this.http.get(url));
    return response as ResUser[];
  }

  public async UpdateAvatar(UserID?:any,formData?:any){
    let url = '';
    if(UserID){
      url = this.constants.API_ENDPOINT + '/user/' + UserID;
    }else{
      console.log("UPLOAD FAIL...");  
    }
    const response = await lastValueFrom(this.http.post(url,formData));
    return response as any[];
  }

  public async UpdatePassword(UserID?:any,oldPass?:any,newPass?:any,cfPass?:any){
    let url = '';
    if(UserID){
      url = this.constants.API_ENDPOINT + '/user/edit';
    }else{
      console.log("UPLOAD FAIL...");  
    }
    const response = await lastValueFrom(this.http.post(url,{
      UserID: UserID,
      oldPass : oldPass,
      newPass : newPass,
      cfPass : cfPass
    }));
    return response as ResRe[];
  }
}