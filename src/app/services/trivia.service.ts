import { Injectable } from '@angular/core';

//imports
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {

  // creating an instance of HttpClient
  constructor(private httpClient: HttpClient) { }

  // using Observable in the method as type any
  getEasyQuestions(): Observable<any>
  {
    // httpClient getting the api - easy questions
    return this.httpClient.get('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple');
  } // getEasyQuestions

  getQuestions(): Observable<any>
  {
    // httpClient getting the api - medium & hard questions
    return this.httpClient.get('https://opentdb.com/api.php?amount=5&type=multiple');
  } // getEasyQuestions

  getAllQuestions(): Observable<any>
  {
    const easyQuestions = this.getEasyQuestions();
    const mediumHardQuestions = this.getQuestions();

    // using a forkJoin to call the apis together
    return forkJoin([easyQuestions, mediumHardQuestions]).pipe(
      map(([easy, mediumHard]) => ({ // using map format to combine results
        easyQuestions:easy.results, 
        mediumHardQuestions:mediumHard.results}))
      );
  } // getAllQuestions

  //decoding the html entities into readable text
  decodeHtml(text: string): string
  {
    const txt = document.createElement('textarea');
    txt.innerHTML = text; 
    return txt.value;
  } // decodeHtml

  decodeQuestions(questions: any[]): any[]
  {
    const decoded = questions.map(q => ({
      ...q,
      question: this.decodeHtml(q.question), // decoding the question 
      correct_answer: this.decodeHtml(q.correct_answer), // decoding the correct answer
      incorrect_answers: q.incorrect_answers.map((a: string) => this.decodeHtml(a)) // decoding the incorrect answer
    }));
    return this.shuffleArray(decoded);
  } // decodeQuestions

  // shuffling the questions
  shuffleArray(shuffle: any[]):any[]
  {
    for (let i = shuffle.length - 1; i > 0; i--)
    {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffle[i], shuffle [j]] = [shuffle[j], shuffle[i]];
    } // for

    return shuffle;
  } //shuffleArray
}
