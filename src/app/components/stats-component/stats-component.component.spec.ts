import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { StatsComponentComponent } from './stats-component.component';
import { MeteoStatsService } from 'src/app/services/meteo-stat/meteo-stats.service';

describe('StatsComponentComponent', () => {
  let component: StatsComponentComponent;
  let fixture: ComponentFixture<StatsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsComponentComponent ],
      imports: [ HttpClientTestingModule, HttpClientModule ],
      providers: [MeteoStatsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
