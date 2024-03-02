import { Injectable } from '@angular/core';
import { Constants } from '../../config/constants';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  constructor(private constants : Constants,private http:HttpClient) { }

  public async getRank(){
    let url = '';
    
      url = this.constants.API_ENDPOINT + '/vote/rank';
    
    const response = await lastValueFrom(this.http.get(url));
    return response as any[];
  }

}
