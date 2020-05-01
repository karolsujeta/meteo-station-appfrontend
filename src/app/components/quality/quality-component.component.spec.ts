import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { QualityComponentComponent } from './quality-component.component';
import { QualityServiceService } from 'src/app/services/quality/quality-service.service';

describe('QualityComponentComponent', () => {
  let component: QualityComponentComponent;
  let fixture: ComponentFixture<QualityComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityComponentComponent ],
      imports: [ HttpClientTestingModule, HttpClientModule ],
      providers: [QualityServiceService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  // 
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
