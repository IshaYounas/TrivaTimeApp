import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // for ngFor
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonButton, IonList, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonText } from '@ionic/angular/standalone';
import { ScoreService } from '../services/score.service'; // score service

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
  standalone: true,
  imports: [IonText, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonItem, IonList, IonButton, IonButtons, IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ResultPage implements OnInit {
  // variables
  scores: any[] = []; // array of type any

  // creating an instance of the score service
  constructor(private scoreService: ScoreService) { }

  ngOnInit() {
    this.loadScores();
  }

  async loadScores()
  {
    // using the score service to get the scores
   this.scoreService.getScores().then((res) => 
    {
      this.scores = res;
    });
  } // loadScores

  async clearScores()
  {
    await this.scoreService.clearAllScores();
    this.scores = [];
  } // clearScores
}
