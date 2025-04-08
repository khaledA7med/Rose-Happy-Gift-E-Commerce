import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutInstgramComponent } from './about-instgram.component';

describe('AboutInstgramComponent', () => {
  let component: AboutInstgramComponent;
  let fixture: ComponentFixture<AboutInstgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutInstgramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutInstgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
