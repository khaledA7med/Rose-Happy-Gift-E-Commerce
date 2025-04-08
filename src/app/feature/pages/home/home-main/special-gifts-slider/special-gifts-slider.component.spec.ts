import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialGiftsSliderComponent } from './special-gifts-slider.component';

describe('SpecialGiftsSliderComponent', () => {
  let component: SpecialGiftsSliderComponent;
  let fixture: ComponentFixture<SpecialGiftsSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialGiftsSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialGiftsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
