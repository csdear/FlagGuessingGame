import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { COUNTRIES, Country } from './data/countryCodes';
import { JsonPipe } from '@angular/common';

const SIZE = 3;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'flags';
  countries = COUNTRIES.map(c => ({...c, code: c.code.toLocaleLowerCase()}));
  // 2 currentCountry: Country;
  currentIndex = 0;
  guessCountries: Country[] = [];
  showAutoComplete = false;
  currentName = '';
  message = '';
  guessCounter = 0; // wrong guess counter
  gameState = 'start'; //kinda like state management.


  constructor() {
    //3 this.currentCountry = this.getRandomCountry();

    // Ten random country indexes. A unique finite set. i.e. 10 random unique indices.
    const countryIndexes = new Set<number>(); // 32:21
    
    // If set size is less than 10, get random indexes.. the list of 10 "guess" countries? 
    while (countryIndexes.size < 3) {
      countryIndexes.add(this.getRandIndex(COUNTRIES.length));
    }

    // to list, list of unique indices
    // const uniqueIndexes = Array.from(countryIndexes);
    //1 this.currentCountry = this.countries[uniqueIndexes[0]];

    // 5
    // 6 somehow this died (no flags) -> refactored.
    for (const i of countryIndexes) {
      this.guessCountries.push({
        ...COUNTRIES[i],
        code: COUNTRIES[i].code.toLowerCase(),
    });
    }
  }
  
  selectedIndex: number | null = null;

  //7 selectCountry - by index
  // selectCountry(i: number) {
    // console.log(i);
    // console.log(`hit selectCountry`);
    // console.log(`selected country index value ${i})`); // log index for now.
  // }

  //8 selectCountry - by country code
    
  selectCountry(code: string) {
  //11 whenever there is a selectCountry event(incident)
    console.log(code);
    this.currentName = this.countries.filter(c => c.code === code)[0].name
    this.showAutoComplete = false;  // no Idea what this does in the UI 45:04
    // console.log(`hit selectCountry`);
    // console.log(`selected country index value ${i})`); // log index for now.
  }

  //6 keyup 10 when there is a value
  keyUp(keyUp: any) {
    // console.log('Hit Keyup');
    this.showAutoComplete = true;
    // console.log(keyUp);
    
    // const val = keyUp.target.value;
    this.currentName = keyUp.target.value;
    //console.log("Val:", keyUp.target.value); // key in "z" to the input field and console logs out val as z.  
    //9 "includes" the value. Text getting predictive now. Mon --> Mongolia.
    // dep. c.name.toLowerCase().includes(val.toLowerCase())  
    this.countries = COUNTRIES.filter((c) => 
      c.name.toLowerCase().includes(this.currentName.toLowerCase())
     );

     //13 if the countries list is zero just hide the dropdown 
     if (this.countries.length === 0){
        this.showAutoComplete = false;
     } 
  }

   guess() {
  console.log('guess() CurrentIndex', this.currentIndex); 
  this.message = ''; // reset message

  const guessedCountry = COUNTRIES.find(c => c.name === this.currentName);

  if (!guessedCountry) {
    this.message = "You have to select from the listed countries";
    return;
  }

  // increment guess counter for every attempt
  this.guessCounter++;

  // wrong guess
  if (guessedCountry.code.toLowerCase() !== this.guessCountries[this.currentIndex].code) {
    this.message = "Guess again!";
    return;
  }

  // correct guess
  this.message = "Correct!";

  // move to next flag
  this.currentIndex++;

  // reset countries list for autocomplete
  this.countries = COUNTRIES.map(c => ({ ...c, code: c.code.toLowerCase() }));
  this.currentName = "";

  // finished after 3 correct guesses
  if (this.currentIndex === SIZE) {
    console.log('HIT GAMESTATE');
    this.gameState = "finished"; // ✅ assignment
  }
}

  //Pick a random country. Of type Country. Return a Country.  Many countries. 300. Wowza.
  // 4
  // getRandomCountry(): Country {
  //   return this.countries[Math.floor(Math.random() * COUNTRIES.length)]
  // }

  // By random index instead. p1 type number. function returns type number. 
  getRandIndex(n: number): number {
    return Math.floor(Math.random() * n);
  }

}
