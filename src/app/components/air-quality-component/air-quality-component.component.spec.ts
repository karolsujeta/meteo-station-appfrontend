import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AirQualityComponentComponent } from './air-quality-component.component';
import { AirQualityService } from 'src/app/services/air-quality/air-quality.service';


describe('AirQualityComponentComponent', () => {
  let component: AirQualityComponentComponent;
  let fixture: ComponentFixture<AirQualityComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirQualityComponentComponent ],
      imports: [ HttpClientTestingModule, HttpClientModule ],
      providers: [AirQualityService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirQualityComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
