import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Howtoplay } from './howtoplay';

describe('Howtoplay', () => {
  let component: Howtoplay;
  let fixture: ComponentFixture<Howtoplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Howtoplay],
    }).compileComponents();

    fixture = TestBed.createComponent(Howtoplay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
