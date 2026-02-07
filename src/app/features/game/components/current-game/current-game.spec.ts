import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentGame } from './current-game';

describe('Game', () => {
  let component: CurrentGame;
  let fixture: ComponentFixture<CurrentGame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentGame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentGame);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
