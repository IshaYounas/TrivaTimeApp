import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons } from '@ionic/angular/standalone';

// imports
import { TriviaService } from '../services/trivia.service'; // trivia service
import { Router } from '@angular/router'; // router

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
  standalone: true,
  imports: [IonButtons, IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})

export class QuizPage implements OnInit {
  // variables
  questions: any[] = []; // array
  currentIndex: number = 0;
  score: number = 0;

  // creating an instance of the trivia service and router
  constructor(private triviaServie: TriviaService, private router:Router) { }

  ngOnInit() {
    this.triviaServie.getAllQuestions().subscribe((data) => {
      this.questions = [...data.easyQuestions, ...data.mediumHardQuestions] // combining the wuestions
    });
  }

  answer(isCorrect: boolean)
  {  
    if (isCorrect)
    {
      this.score++;  // incrementing the score  
    } // if

    this.currentIndex;

  } // answer
}
