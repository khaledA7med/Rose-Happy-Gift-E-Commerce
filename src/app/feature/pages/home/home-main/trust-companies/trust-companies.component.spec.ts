import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustCompaniesComponent } from './trust-companies.component';

describe('TrustCompaniesComponent', () => {
  let component: TrustCompaniesComponent;
  let fixture: ComponentFixture<TrustCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrustCompaniesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrustCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
