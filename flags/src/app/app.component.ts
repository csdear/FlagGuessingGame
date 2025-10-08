import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { COUNTRIES, Country } from './data/countryCodes';
import { JsonPipe } from '@angular/common';

const SIZE = 10;

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


  constructor() {
    //3 this.currentCountry = this.getRandomCountry();

    // Ten random country indexes. A unique finite set. i.e. 10 random unique indices.
    const countryIndexes = new Set<number>(); // 32:21
    
    // If set size is less than 10, get random indexes.. the list of 10 "guess" countries? 
    while (countryIndexes.size < 10) {
      countryIndexes.add(this.getRandIndex(COUNTRIES.length));
    }

    // to list, list of unique indices
    // const uniqueIndexes = Array.from(countryIndexes);
    //1 this.currentCountry = this.countries[uniqueIndexes[0]];

    // 5
    for (const i of countryIndexes) {
      this.guessCountries.push(COUNTRIES[i]);
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
    console.log(code);
    // console.log(`hit selectCountry`);
    // console.log(`selected country index value ${i})`); // log index for now.
  }

  //6 keyup
  keyUp(keyUp: any) {
    console.log('Hit Keyup');
    this.showAutoComplete = true;
    console.log(keyUp);
    
    const val = keyUp.target.value;
    console.log("Val:", keyUp.target.value); // key in "z" to the input field and console logs out val as z.  
    //9 "includes" the value. Text getting predictive now. Mon --> Mongolia.  
    this.countries = COUNTRIES.filter((c) => 
      c.name.toLowerCase().includes(val.toLowerCase())
     );
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
