import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Task } from './tasks';
import { User } from './user';
import { Assign } from './assign';

// const api_key = {
//   headers: new HttpHeaders().set('Authorization',  '1536660107LWZ2JGK17J72HR4O5NU53FBBSLSMRB')
// };

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private usersUrl:string = 'https://jsonplaceholder.typicode.com/users';
  private tasksUrl:string = 'http://jsonplaceholder.typicode.com/todos';
  tasksLimit:string = '?_limit=12';

  assignDB: Assign[] = [];

  constructor(private http: HttpClient) { }
  
  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }
  
  getTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(`${this.tasksUrl}${this.tasksLimit}`)
      .pipe(
        catchError(this.handleError<Task[]>('getTasks', []))
      );
  }

    getUser(id: number): Observable<User> {
      const url = `${this.usersUrl}/${id}`;
      return this.http.get<User>(url).pipe(
        tap(_ => console.log(`fetched user id=${id}`)),
        catchError(this.handleError<User>(`getUser id=${id}`))
      );
    }

    getTask(id: number): Observable<Task> {
      const url = `${this.tasksUrl}/${id}`;
      return this.http.get<Task>(url).pipe(
        tap(_ => console.log(`fetched Task id=${id}`)),
        catchError(this.handleError<Task>(`getTask id=${id}`))
      );
    }

    getAssignByUser(id: number): Observable<Assign> {
      return of(this.assignDB.find(data => data.user_id === id));
    }

    getAssignByTask(id: number): Observable<User> {
      const clientId = this.assignDB.find(data => data.task_id === id).user_id;
      console.log(clientId);
      if(!clientId) return;
      return this.getUser(clientId);
    }

    addAssignDB(id:number, user_id: number, task_id: number){
      const data = new Assign(id, user_id, task_id);
      return (of(this.assignDB.push(data)));
    }

    getAssignDB(){
      return (of(this.assignDB));
    }

    updateAssignDB(user_id: number, task_id: number){
      return of(this.assignDB.filter(e => {
        if(e.task_id === task_id) e.user_id = user_id}));
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
