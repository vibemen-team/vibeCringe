import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMenuInfoComponent } from './user-menu-info.component';

describe('UserMenuInfoComponent', () => {
  let component: UserMenuInfoComponent;
  let fixture: ComponentFixture<UserMenuInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMenuInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMenuInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
