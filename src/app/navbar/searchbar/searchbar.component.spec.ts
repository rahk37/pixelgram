import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SearchbarComponent } from './searchbar.component';

describe('SearchbarComponent', () => {
  let component: SearchbarComponent;
  let fixture: ComponentFixture<SearchbarComponent>;
  const searchPostDescriptions = jasmine.createSpy("searchPostDescriptions");
  const searchbarServiceSpy = jasmine.createSpyObj('SearchbarService', ['setFilter', 'setLoading', 'filter', 'loading']);


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchbarComponent ],
      imports: [HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should timeout when searchPostDescriptions is called', fakeAsync(() => {
    spyOn(window, 'setTimeout').and.callThrough();
    let random = "anything";
    component.searchPostDescriptions(random);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    tick(2000);
    expect(setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 2000);
  }));
});
