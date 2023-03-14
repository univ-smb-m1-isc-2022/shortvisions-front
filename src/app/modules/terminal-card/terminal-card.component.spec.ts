import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalCardComponent } from './terminal-card.component';

describe('TerminalCardComponent', () => {
  let component: TerminalCardComponent;
  let fixture: ComponentFixture<TerminalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerminalCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerminalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
