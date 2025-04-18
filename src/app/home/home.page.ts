import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonInput } from '@ionic/angular/standalone'; // importing IonButton
import { RouterModule } from '@angular/router'; // importing router
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';

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
  age: number | null = null;
  isLoggedIn: boolean = false; // default
  selectedMode: string = "easy" // deafult

  constructor(private httpClient: HttpClient, private router: Router) {}
  ngOnInit()
  {
    this.getFunFact();
  }

  async login()
  {
    if (this.username && this.age)
    {
      await Preferences.set({
        key: 'user',
        value: JSON.stringify({username: this.username, age: this.age}),
      });
      this.isLoggedIn = true;
      this.saveUser()
    } // if
    
    else 
    {
      alert("Please enter username and age");
    } // else
  } // login

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

    if (this.age != null)
    {
      localStorage.setItem("age", this.age.toString());
    } // if
    //console.log(this.username); DEBUG
  } // saveUser
}
