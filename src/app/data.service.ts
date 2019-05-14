import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Mission } from './mission';
import { Scout } from './scout';

const api_key = {
  headers: new HttpHeaders().set('Authorization',  '1536660107LWZ2JGK17J72HR4O5NU53FBBSLSMRB')
};

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private scoutsUrl = 'https://sherlock.aerobotics.io/developers/clients/';
  private missionsUrl = 'https://sherlock.aerobotics.io/developers/scoutmissions/';

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

    /** GET hero by id. Return `undefined` when id not found */
    getMissionNo404<Data>(id: number): Observable<Mission> {
      const url = `${this.missionsUrl}${id}/`;
      return this.http.get<Mission[]>(url)
        .pipe(
          map(heroes => heroes[0]), // returns a {0|1} element array
          tap(h => {
            const outcome = h ? `fetched` : `did not find`;
            console.log(`${outcome} hero id=${id}`);
          }),
          catchError(this.handleError<Mission>(`getHero id=${id}`))
        );
    }

  getMission(id: number): Observable<Mission> {
    const url = `${this.missionsUrl}${id}/`;
    return this.http.get<Mission>(url, api_key).pipe(
      tap(_ => console.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Mission>(`getMission id=${id}`))
    );
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
