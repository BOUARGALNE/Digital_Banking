import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneAccountComponent } from './one-account.component';

describe('AccountsComponent', () => {
  let component: OneAccountComponent;
  let fixture: ComponentFixture<OneAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
