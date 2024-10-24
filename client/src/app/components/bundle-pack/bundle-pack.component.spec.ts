import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BundlePackComponent } from './bundle-pack.component';

describe('BundlePackComponent', () => {
  let component: BundlePackComponent;
  let fixture: ComponentFixture<BundlePackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BundlePackComponent]
    });
    fixture = TestBed.createComponent(BundlePackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
