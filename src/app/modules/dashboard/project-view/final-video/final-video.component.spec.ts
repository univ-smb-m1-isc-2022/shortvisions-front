import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalVideoComponent } from './final-video.component';

describe('FinalVideoComponent', () => {
  let component: FinalVideoComponent;
  let fixture: ComponentFixture<FinalVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalVideoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
