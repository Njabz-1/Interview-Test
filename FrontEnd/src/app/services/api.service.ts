import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../models/hero';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private heroesUrl = 'http://localhost:4201/api/heroes';

  constructor(private http: HttpClient) { }
  getHeroes(){
    return this.http.get(this.heroesUrl);
  }
  postHeroAction(hero: Hero): Observable<any> {
    const url = `${this.heroesUrl}?action=evolve`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, hero, { headers: headers })
      .pipe(
        catchError((error: any) => {
          if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
          }
  
          // Return an observable with a user-facing error message.
          return throwError('Something bad happened; please try again later.');
        })
      );
  }

}