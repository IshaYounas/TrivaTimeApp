import { Injectable } from '@angular/core';

//imports
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {

  // creating an instance of HttpClient
  constructor(private httpClient: HttpClient) { }

  // using Observable in the method as type any
  getQuestion(): Observable<any>
  {
    // httpClient getting the api
    return this.httpClient.get('https://opentdb.com/api.php?amount=5&type=multiple');
  } // getQuestion
}
