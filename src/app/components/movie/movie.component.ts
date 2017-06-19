import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  private movie: any;
  constructor(private movieService: MovieService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe((params) => {
      this.getMovie(params.id);
    });
  }

  getMovie(id){
    this.movieService.getMovie(id).subscribe(movie => {
      this.movie = movie;
    });
  }

}
