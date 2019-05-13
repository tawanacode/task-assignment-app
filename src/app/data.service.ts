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

  constructor(private http: HttpClient) { }
  
  getScouts(){
    return this.http
    .get('https://sherlock.aerobotics.io/developers/clients/?format=json', api_key);
  }
  
  getMissions(){
    return this.http
    .get('https://sherlock.aerobotics.io/developers/scoutmissions/?format=json', api_key);
  }
}
