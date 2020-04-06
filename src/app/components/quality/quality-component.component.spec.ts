import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityComponentComponent } from './quality-component.component';

describe('QualityComponentComponent', () => {
  let component: QualityComponentComponent;
  let fixture: ComponentFixture<QualityComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
