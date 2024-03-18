import { Injectable } from '@angular/core';
import { Constants } from '../../config/constants';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DailystatsService {

  constructor(private constants : Constants,private http:HttpClient) { }

  public async getYesterdayDailystats(options?:any){
    let url = '';
    if(options){
      const id = options;
      url = this.constants.API_ENDPOINT + '/dailystats/' + id;
    }else{
      url = this.constants.API_ENDPOINT + '/dailystats';
    }
    const response = await lastValueFrom(this.http.get(url));
    return response as any[];
  }

  public async getAllDailystats7day(options?:any){
    let url = '';
    if(options){
      const id = options;
      url = this.constants.API_ENDPOINT + '/dailystats/grahp/' + id;
    }else{
      url = this.constants.API_ENDPOINT + '/dailystats/grahp/';
    }
    const response = await lastValueFrom(this.http.get(url));
    return response as any[];
  }
}
