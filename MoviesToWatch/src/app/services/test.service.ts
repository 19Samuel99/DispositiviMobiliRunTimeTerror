import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private heroesUrl = 'https://imdb8.p.rapidapi.com/title/find?q=';
  constructor(
    private http: HttpClient,
   ) { }

  /** GET heroes from the server */
  getFilm(nome): Observable<any> {
    const headers= new HttpHeaders()
      .set('x-rapidapi-key', 'af622af5f0msh7c4f3576c3d19e1p1c9877jsna4822a599ad7')
      .set('x-rapidapi-host', 'imdb8.p.rapidapi.com');
      //.set( 'Content-Type', 'application/json' );
      nome.split(' ').join('%20');
    return this.http.get(this.heroesUrl+nome,{ headers });
  }
}
