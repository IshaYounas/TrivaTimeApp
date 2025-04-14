import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor() { }

  async saveScore(score: number)
  {
    const position = await Geolocation.getCurrentPosition(); // getting the location
    const result = await Preferences.get({ key: 'scores' }); // getting teh already existing scores

    let oldScores = [];
    if (result.value)
    {
      oldScores = JSON.parse(result.value);
    }

    // newScore array
    const newScore = {score: score,
      date: new Date().toDateString(),
      loctaion:
      {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      }    
    };

    // pushing the newScores on to the old scores
  	oldScores.push(newScore);    

    // saving updated scores
    await Preferences.set
    ({
      key: 'scores',
      value: JSON.stringify(oldScores)
    })
  } // saveScore

    async getScores(): Promise<any[]>
    {
        const result = await Preferences.get({key: 'scores'});
        if (result.value)
        {
          return JSON.parse(result.value);
        } // if

        else
        {
          return [];
        } // else
    } // getScores
}
