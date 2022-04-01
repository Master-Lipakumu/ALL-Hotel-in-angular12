import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartRankingComponent } from './start-ranking.component';

describe('StartRankingComponent', () => {
  let component: StartRankingComponent;
  let fixture: ComponentFixture<StartRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartRankingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
