import { Injectable } from '@angular/core';
import { Constants } from '../../config/constants';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ResRow } from '../../model/res_get_row';
import { ResPost } from '../../model/res_get_post';
import { ResScore } from '../../model/res_get_score';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private constants : Constants,private http:HttpClient) { }

  public async getPosts(options?:any){
    let url = '';
    if(options){
      const id = options;
      url = this.constants.API_ENDPOINT + '/posts/' + id;
    }else{
      url = this.constants.API_ENDPOINT + '/posts';
    }
    const response = await lastValueFrom(this.http.get(url));
    return response as ResPost[];
  }

  public async getScore(options?:any){
    let url = '';
    if(options){
      const id = options;
      url = this.constants.API_ENDPOINT + '/posts/score/' + id;
    }else{
      console.log("GET SCORE FAIL...");
    }
    const response = await lastValueFrom(this.http.get(url));
    return response as ResScore[];
  }

  public async UploadPosts(UserID?:any,formData?:any){
    let url = '';
    if(UserID){
      url = this.constants.API_ENDPOINT + '/posts/' + UserID;
    }else{
      console.log("UPLOAD FAIL...");  
    }
    const response = await lastValueFrom(this.http.post(url,formData));
    return response as ResRow[];
  }

  public async DeletePosts(options?:any){
    let url = '';
    if(options){
      const id = options;
      url = this.constants.API_ENDPOINT + '/posts/' + id;
    }else{
      console.log("DELETE FAIL...");
    }
    const response = await lastValueFrom(this.http.delete(url));
    return response as any[];
  }
}
