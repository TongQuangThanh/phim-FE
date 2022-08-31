import { Component, OnInit } from '@angular/core';
import { APP_NAME_CATEGORY_SELECTED } from 'src/app/shared/common/const';
import { getDataLocalStorage } from 'src/app/shared/common/utils';
import { Movie } from 'src/app/shared/models/movie';
import { MovieService } from 'src/app/shared/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  movie: Movie | undefined;
  series: Movie[] = [];
  single: Movie[] = [];
  latest: Movie[] = [];
  anime: Movie[] = [];
  tvShows: Movie[] = [];
  cinema: Movie[] = [];
  selectedGenres = getDataLocalStorage(APP_NAME_CATEGORY_SELECTED) || [];
  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.getHightLight();
    this.movieService.getHomeData(this.selectedGenres).subscribe(result => {
      console.log(result);
      this.series = result.data?.series as Movie[];
      this.single = result.data?.single as Movie[];
      this.latest = result.data?.latest as Movie[];
      this.anime = result.data?.hoathinh as Movie[];
      this.tvShows = result.data?.tvshows as Movie[];
      this.cinema = result.data?.cinema as Movie[];
    });
  }

  getHightLight() {
    this.movieService.getHightLight().subscribe(r => this.movie = r.data as Movie);
  }
}
