import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { parseHtmlToText } from 'src/app/shared/common/utils';
import { Movie } from 'src/app/shared/models/movie';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SlideComponent implements OnInit {
  @Input() title = '';
  @Input() urlPath = '';
  @Input() movies: Movie[] = [];
  config: SwiperOptions = {
    slidesPerView: 'auto',
    navigation: true,
  };
  // content = '';
  showAllContent = false;
  constructor() { }

  ngOnInit() {
    // this.parseHtmlToText(result.movie.content, true);
    // this.parseHtmlToText(result.movie.showtimes);
  }
  
  parseHtmlToText(html: string) {
    return parseHtmlToText(html);
  }
}
