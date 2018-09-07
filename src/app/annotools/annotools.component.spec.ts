import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotoolsComponent } from './annotools.component';

describe('AnnotoolsComponent', () => {
  let component: AnnotoolsComponent;
  let fixture: ComponentFixture<AnnotoolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnotoolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
