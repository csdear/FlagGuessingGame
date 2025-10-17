import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { COUNTRIES, Country } from '../data/countryCodes';

const SIZE = 3;

@Component({
  selector: 'app-flags',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './flags.component.html',
  styleUrls: ['./flags.component.scss']
})
export class FlagsComponent {
  countries = COUNTRIES.map(c => ({...c, code: c.code.toLocaleLowerCase()}));
  currentIndex = 0;
  guessCountries: Country[] = [];
  showAutoComplete = false;
  currentName = '';
  message = '';
  guessCounter = 0;
  gameState = 'start';

  constructor() {
    const countryIndexes = new Set<number>();
    while (countryIndexes.size < SIZE) {
      countryIndexes.add(this.getRandIndex(COUNTRIES.length));
    }

    for (const i of countryIndexes) {
      this.guessCountries.push({
        ...COUNTRIES[i],
        code: COUNTRIES[i].code.toLowerCase(),
      });
    }
  }

  selectedIndex: number | null = null;

  selectCountry(code: string) {
    this.currentName = this.countries.filter(c => c.code === code)[0].name
    this.showAutoComplete = false;
  }

  keyUp(keyUp: any) {
    this.showAutoComplete = true;
    this.currentName = keyUp.target.value;
    this.countries = COUNTRIES.filter((c) => 
      c.name.toLowerCase().includes(this.currentName.toLowerCase())
    );

    if (this.countries.length === 0){
      this.showAutoComplete = false;
    }
  }

  guess() {
    this.message = '';

    const guessedCountry = COUNTRIES.find(c => c.name === this.currentName);

    if (!guessedCountry) {
      this.message = "You have to select from the listed countries";
      return;
    }

    this.guessCounter++;

    if (guessedCountry.code.toLowerCase() !== this.guessCountries[this.currentIndex].code) {
      this.message = "Guess again!";
      return;
    }

    this.message = "Correct!";
    this.currentIndex++;

    this.countries = COUNTRIES.map(c => ({ ...c, code: c.code.toLowerCase() }));
    this.currentName = "";

    if (this.currentIndex === SIZE) {
      this.gameState = "finished";
    }
  }

  getRandIndex(n: number): number {
    return Math.floor(Math.random() * n);
  }
}
