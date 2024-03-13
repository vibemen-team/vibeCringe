import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizeFormComponent } from './authorize-form.component';

describe('AuthorizeFormComponent', () => {
  let component: AuthorizeFormComponent;
  let fixture: ComponentFixture<AuthorizeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
