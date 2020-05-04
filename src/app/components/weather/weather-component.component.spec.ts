import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { WeatherComponentComponent } from './weather-component.component';
import { WeatherServiceService } from 'src/app/services/weather/weather-service.service';

import {By} from "@angular/platform-browser";


describe('WeatherComponentComponent', () => {
  let component: WeatherComponentComponent;
  let fixture: ComponentFixture<WeatherComponentComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherComponentComponent],
      imports: [ HttpClientTestingModule, HttpClientModule ],
      providers: [WeatherServiceService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show input for city name', () => {
    const input = fixture.nativeElement.querySelectorAll('nav__buttons__input');
    expect(input).toBeTruthy();
  })


  it('should show left table', () => {
    const table = fixture.nativeElement.querySelectorAll('left_side_table');
    expect(table).toBeTruthy();
  })


  it('should show right table', () => {
    const table = fixture.nativeElement.querySelectorAll('right_side_table');
    expect(table).toBeTruthy();
  })


  it('should show temperature chart', () => {
    const chart = fixture.nativeElement.querySelectorAll('chart-area');
    expect(chart).toBeTruthy();
  })


it('should not show any error message if city does exist', () => {
  fixture.whenStable().then((done) => {
    let input = fixture.debugElement.query(By.css('nav__buttons__input'));
    let el = input.nativeElement;

    el.value = 'Warszawa';
    el.dispatchEvent(new Event('input'));

    const errorElement = fixture.nativeElement.querySelectorAll('nav__error');
    expect(errorElement.textContent).toBe("");
    done();
  });
});

it('should show list of cities that user was searching for', () => {
  fixture.whenStable().then((done) => {
    let input = fixture.debugElement.query(By.css('nav__buttons__input'));
    let el = input.nativeElement;

    el.value = 'Białystok';
    el.dispatchEvent(new Event('input'));
    el.value = 'Warszawa';
    el.dispatchEvent(new Event('input'));
    el.value = 'Opole';
    el.dispatchEvent(new Event('input'));


    const rowHtmlElements = fixture.nativeElement.querySelectorAll('#weather-table');
    expect(rowHtmlElements.rows.length).toBe(3);
    done();
  });
});

it('should not show city weather if city does not exist', () => {
  fixture.whenStable().then((done) => {
    let input = fixture.debugElement.query(By.css('nav__buttons__input'));
    let el = input.nativeElement;

    el.value = 'Non existing city';
    el.dispatchEvent(new Event('input'));

    const rowHtmlElements = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rowHtmlElements.length).toBe(0);
    done();
  });
});

it('should show error if city does not exist', () => {
  fixture.whenStable().then((done) => {
    let input = fixture.debugElement.query(By.css('nav__buttons__input'));
    let el = input.nativeElement;

    el.value = 'Non existing city';
    el.dispatchEvent(new Event('input'));

    const errorElement = fixture.nativeElement.querySelectorAll('nav__error');
    expect(errorElement.textContent).toBe("Nie wprowadzono miejscowości lub wprowadzono złą nazwę!");
    done();
  });
});
});
