import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Country, Movie, MovieResult, ServerData } from 'src/app/shared/models/movie';
import { MovieService } from 'src/app/shared/services/movie.service';
import { getDataLocalStorage, getStatus, getStatusColor, parseHtmlToText } from 'src/app/shared/common/utils';
import { APP_NAME_STATUS, APP_NAME_TYPE, PLAYER_ID, slideOpts, TRAILER_ID } from 'src/app/shared/common/const';
import { LoggedInGuard } from 'src/app/shared/guards/canActive';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, AfterViewInit {
  slug = '';
  isPlaying = false;
  movie: Movie | undefined;
  episodes: ServerData[] = [];
  showTimes = '';
  content = '';
  showAllContent = false;
  videoPlayer: any = {};
  slideOpts = slideOpts;
  playerId = PLAYER_ID;
  trailerId = TRAILER_ID;
  type: any = {};
  status: any = [];
  url = 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4';
  dataLoaded = false;
  counter = 0;
  active = 1;
  config: SwiperOptions = {
    slidesPerView: 'auto',
    navigation: true,
  };
  private handlerPlay: any;

  constructor(
    private router: Router,
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.type = getDataLocalStorage(APP_NAME_TYPE);
    this.status = getDataLocalStorage(APP_NAME_STATUS);
  }

  ngAfterViewInit() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.slug = paramMap.get('id') || '';
      this.movieService.getMovie(this.slug).subscribe(async (result: MovieResult) => {
        this.movie = result.movie;
        console.log(this.movie);
        this.movie.director = this.movie.director.filter(d => d.trim());
        this.movie.actor = this.movie.actor.filter(a => a.trim());
        this.episodes = result.episodes[0].server_data;
        // this.url = this.episodes[0].link_m3u8 || this.episodes[0].link_embed || this.movie?.trailer_url;

        // this.parseHtmlToText(result.movie.content, true);
        // this.parseHtmlToText(result.movie.showtimes);

        // const player: any = await setVideoPlayer();
        // this.videoPlayer = player.plugin;
        // this.handlerPlay = await this.videoPlayer.addListener('jeepCapVideoPlayerPlay', () => this.isPlaying = true, false);
        // this.initPlayer(this.url, PLAYER_ID, 1, 3);
        // this.loadingText = 'Khởi tạo trình xem phim...';
        // if (this.movie?.trailer_url) {
        //   if (this.movie?.trailer_url.includes('youtu')) {
        //     this.initYoutubePlayer(TRAILER_ID, this.movie?.trailer_url.split('v=')[1], true);
        //   } else {
        //     this.initPlayer(this.movie?.trailer_url, TRAILER_ID, 3, 9);
        //   }
        // }
      });
    });
  }

  parseHtmlToText(html?: string) {
    return parseHtmlToText(html);
  }

  async initYoutubePlayer(playerId: string, videoId: string, isTrailer?: boolean) {
    // await YoutubePlayer.initialize({
    //   playerId, videoId,
    //   playerSize: {
    //     width: document.body.clientWidth - (isTrailer ? 32 : 0),
    //     height: document.body.clientHeight / (isTrailer ? 4 : 3)
    //   }
    // });
  }

  async initPlayer(url: string, playerId: string, widthRate: number, heightRate: number) {
    const res = await this.videoPlayer.initPlayer({
      mode: 'embedded', url, playerId, componentTag: 'app-movie',
      width: document.body.clientWidth / widthRate, height: document.body.clientHeight / heightRate
    });
    console.dir(res);
    this.dataLoaded = true;
  }

  addToFavorite() {
    // (new LoggedInGuard(this.router, this.alertController)).canActivate();
  }
}
