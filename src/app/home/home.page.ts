import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonInput } from '@ionic/angular/standalone'; // importing IonButton
import { RouterModule } from '@angular/router'; // importing router
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, FormsModule, IonInput, IonLabel, IonItem, RouterModule, IonButton, IonHeader, IonToolbar, IonTitle, IonContent],
})

export class HomePage {
  // variables
  username: string = "";

  constructor() {}

  saveUser()
  {
    localStorage.setItem("username", this.username);
    //console.log(this.username); DEBUG
  } // saveUser
}
