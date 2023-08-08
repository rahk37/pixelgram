import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Post } from 'src/app/post/post.component';
import { SearchbarService } from 'src/app/services/searchbar.service';
@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
  @Input() checkRouteSearch = false; //from navbar.ts, shows or hides search bar
  mainPageSearchInput:string = ""; 
  posts:Post[] = [];

  constructor(private searchbarService:SearchbarService) { }

  ngOnInit(): void {
    this.searchbarService.getSearchFilter().subscribe(async (value) => {
      
      if (this.searchbarService.filter.value.length <= 0){
        this.mainPageSearchInput = value;

      } else{
        this.mainPageSearchInput = value;
      }
    });
  }  
  
  searchPostDescriptions(input:string):void {
    this.searchbarService.setLoading(true);

    setTimeout(() =>{
      this.searchbarService.setFilter(input);
      this.searchbarService.setLoading(false);
    }
      , 2000); 
  }
}