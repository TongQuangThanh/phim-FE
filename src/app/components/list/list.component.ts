import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { APP_NAME_CATEGORY_SELECTED, type } from 'src/app/shared/common/const';
import { getDataLocalStorage } from 'src/app/shared/common/utils';
import { InternalPageResult } from 'src/app/shared/models/data';
import { Movie } from 'src/app/shared/models/movie';
import { MovieService } from 'src/app/shared/services/movie.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  page = '';
  title = '';
  pageNumber = 0;
  movies: Movie[] = [];
  selectedGenres = getDataLocalStorage(APP_NAME_CATEGORY_SELECTED) || [];
  constructor(private activatedRoute: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.page = paramMap.get('id') || '';
      this.title = type.find(t => t.url === this.page)?.title || '';
      this.getMovies();
    });
  }

  getMovies(event?: any) {
    this.pageNumber++;
    this.movieService.getMoviesInternal(this.page, this.pageNumber, this.selectedGenres).subscribe(result => {
      const data = result.data as InternalPageResult;
      this.movies = this.movies.concat(data.movies);
      if (event) {
        event.target.complete();
        if (this.pageNumber === data.allPage) {
          event.target.disabled = true;
        }
      }
    });
  }
}
