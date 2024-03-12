import { Injectable } from '@angular/core';
import { Constants } from '../../config/constants';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ResRow } from '../../model/res_get_row';
import { ResRank } from '../../model/res_get_rank';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  constructor(private constants : Constants,private http:HttpClient) { }

  public async getRank(){
    let url = '';
    url = this.constants.API_ENDPOINT + '/vote/rank';
    const response = await lastValueFrom(this.http.get(url));
    return response as ResRank[];
  }

  public async NewPosts(Pid?:any){
    let url = '';
    url = this.constants.API_ENDPOINT + '/vote/newposts';
    const response = await lastValueFrom(this.http.post(url,{
      Pid: Pid
    }));
    return response as ResRow[];
  }

  public async nowRank(){
    let url = '';
    url = this.constants.API_ENDPOINT + '/vote/nowRank';
    const response = await lastValueFrom(this.http.get(url));
    return response as any[];
  }
}