import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMenuWrapperComponent } from './user-menu-wrapper.component';

describe('UserMenuWrapperComponent', () => {
  let component: UserMenuWrapperComponent;
  let fixture: ComponentFixture<UserMenuWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMenuWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMenuWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
