import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://my-movie-overview.herokuapp.com/'; // maybe add /movies ?


//This is a decorator: a function that augments a piece of code—usually another function or a class -- tells Angular that this service will be available everywhere (hence the root)
@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  constructor(private http: HttpClient) {
  }

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> { //Observable is a TypeCript cast, like an enhanced promise. 
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe( //.pipe() combines multiple functions into a single function
      catchError(this.handleError)
    );
  }

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //check if this works during next exercise, or if it's okay to just use movieList objects stored as cards. 
  getOneMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/:Title', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/director/:Name', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genres/:Title', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');
    return this.http.get(apiUrl + `users/${userName}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  addFavoriteMovie(_id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');
    return this.http.post(apiUrl + `users/${userName}/${_id}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  deleteFavoriteMovie(_id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${userName}/${_id}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');
    return this.http.put(apiUrl + `users/${userName}`, userDetails, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${userName}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private extractResponseData(res: Response | Object): any { //Ali: what does | do?
    const body = res;
    return body || {};
  }
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}