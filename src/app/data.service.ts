import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Mission } from './mission';
import { Scout } from './scout';
import { Assign } from './assign';

const api_key = {
  headers: new HttpHeaders().set('Authorization',  '1536660107LWZ2JGK17J72HR4O5NU53FBBSLSMRB')
};

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private scoutsUrl = 'https://sherlock.aerobotics.io/developers/clients/';
  private missionsUrl = 'https://sherlock.aerobotics.io/developers/scoutmissions/';

  assignDB: Assign[] = [];

  constructor(private http: HttpClient) { }
  
  getScouts(): Observable<Scout[]>{
    return this.http.get<Scout[]>(this.scoutsUrl, api_key)
      .pipe(
        catchError(this.handleError<Scout[]>('getScouts', []))
      );
  }
  
  getMissions(): Observable<Mission[]>{
    return this.http.get<Mission[]>(this.missionsUrl, api_key)
      .pipe(
        catchError(this.handleError<Mission[]>('getMissions', []))
      );
  }

    getScout(id: number): Observable<Scout> {
      const url = `${this.scoutsUrl}${id}/`;
      return this.http.get<Scout>(url, api_key).pipe(
        tap(_ => console.log(`fetched scout id=${id}`)),
        catchError(this.handleError<Scout>(`getScout id=${id}`))
      );
    }

    getMission(id: number): Observable<Mission> {
      const url = `${this.missionsUrl}${id}/`;
      return this.http.get<Mission>(url, api_key).pipe(
        tap(_ => console.log(`fetched mission id=${id}`)),
        catchError(this.handleError<Mission>(`getMission id=${id}`))
      );
    }

    getAssignByScout(id: number): Observable<Assign> {
      return of(this.assignDB.find(data => data.scout_id === id));
    }

    getAssignByMission(id: number, name:string= '') {
      return of(this.assignDB.find(data => data.mission_id === id));
      
      // const clientId: number = this.assignDB.find(data => data.mission_id === id);
      // return of(this.getScout(clientId).subscribe(data => name = data.name));
    }

    addAssignDB(id:number, scout_id: number, mission_id: number){
      const data = new Assign(id, scout_id, mission_id);
      return (of(this.assignDB.push(data)));
    }

    getAssignDB(){
      return (of(this.assignDB));
    }

    updateAssignDB(scout_id: number, mission_id: number){
      return of(this.assignDB.filter(e => {
        if(e.mission_id === mission_id) e.scout_id = scout_id}));
    }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
