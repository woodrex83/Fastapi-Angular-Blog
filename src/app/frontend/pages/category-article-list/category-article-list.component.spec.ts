import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryArticleListComponent } from './category-article-list.component';

describe('CategoryArticleListComponent', () => {
  let component: CategoryArticleListComponent;
  let fixture: ComponentFixture<CategoryArticleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryArticleListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryArticleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
