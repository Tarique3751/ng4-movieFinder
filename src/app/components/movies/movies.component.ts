import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  public popularList: any[];
  public inTheatersList: any[];
  public query: string;
  public queryResults: any[];

  constructor(public movieService: MovieService) { }

  ngOnInit() {
    this.movieService.getPopular().subscribe(res => {
      this.popularList = res.results;
    });

    this.movieService.getInTheaters().subscribe(res => {
      this.inTheatersList = res.results;
    });

  }

  searchMovies(){
    if(this.query == '') this.query = undefined;
    this.movieService.searchMovies(this.query)
    .distinctUntilChanged()
    .debounceTime(500)
    .subscribe(res => {
      this.queryResults = res.results;
    });
  }

}
