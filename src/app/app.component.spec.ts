import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'video-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('video-app');
  });

  it('should render form to take input', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content form').length).toBeGreaterThan(0);
  });

  it('should show error for wrong input', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.nativeElement;

    const input: HTMLInputElement = compiled.querySelector('#source');
    const errorMessage: HTMLInputElement = compiled.querySelector('.error');

    fixture.whenStable().then(() => {
      input.value = 'plaintext'
      input.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(errorMessage.textContent).toBe('Please provide valid Vimeo Video url')
    });
  });
});
