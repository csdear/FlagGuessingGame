import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlagsComponent } from './flags/flags.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FlagsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'flags';
}
