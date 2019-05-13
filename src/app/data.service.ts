import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 

const api_key = {
  headers: new HttpHeaders()
    .set('Authorization',  '1536660107LWZ2JGK17J72HR4O5NU53FBBSLSMRB')
};

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private scoutsUrl = 'https://sherlock.aerobotics.io/developers/clients/?format=json';
  private missionsUrl = 'https://sherlock.aerobotics.io/developers/scoutmissions/?format=json';

  constructor(private http: HttpClient) { }
  
  getScouts(){
    return this.http
    .get(this.scoutsUrl, api_key);
  }
  
  getMissions(){
    return this.http
    .get(this.missionsUrl, api_key);
  }
}
