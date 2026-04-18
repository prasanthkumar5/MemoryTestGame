import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cardsgame } from './cardsgame';

describe('Cardsgame', () => {
  let component: Cardsgame;
  let fixture: ComponentFixture<Cardsgame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Cardsgame],
    }).compileComponents();

    fixture = TestBed.createComponent(Cardsgame);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
