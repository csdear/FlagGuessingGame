import { TestBed } from '@angular/core/testing';
import { FlagsComponent } from './flags.component';

describe('FlagsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlagsComponent],
    }).compileComponents();
  });

  it('should create the flags component', () => {
    const fixture = TestBed.createComponent(FlagsComponent);
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });

  it('should initialize the expected number of guess countries', () => {
    const fixture = TestBed.createComponent(FlagsComponent);
    const comp = fixture.componentInstance;
    // SIZE is 3 in the component; ensure guessCountries is populated
    expect(comp.guessCountries.length).toBe(3);
  });
});
