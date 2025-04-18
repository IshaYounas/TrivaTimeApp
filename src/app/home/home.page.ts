import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonInput } from '@ionic/angular/standalone'; // importing IonButton
import { RouterModule } from '@angular/router'; // importing router
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, FormsModule, IonInput, IonLabel, IonItem, RouterModule, IonButton, IonHeader, IonToolbar, IonTitle, IonContent],
})

export class HomePage implements OnInit {
  // variables
  username: string = "";
  funfact: string = "";

  constructor(private httpClient: HttpClient) {}
  ngOnInit()
  {
    this.getFunFact();
  }

  getFunFact()
  {
    this.httpClient.get('https://uselessfacts.jsph.pl/random.json?language=en').subscribe(
      (response: any) => {
        this.funfact = response.text;
      }
    )
  } // getFunFact
  
  saveUser()
  {
    localStorage.setItem("username", this.username);
    //console.log(this.username); DEBUG
  } // saveUser
}
