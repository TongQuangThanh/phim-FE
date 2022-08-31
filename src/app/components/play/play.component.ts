import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Movie, ServerData, MovieResult } from 'src/app/shared/models/movie';
import { MovieService } from 'src/app/shared/services/movie.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  slug = '';
  url: SafeResourceUrl | undefined;
  movie: Movie | undefined;
  episode = 0;
  episodes: ServerData[] = [];
  constructor(
    private domSanitizer: DomSanitizer,
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.slug = paramMap.get('id') || '';
      this.movieService.getMovie(this.slug).subscribe(async (result: MovieResult) => {
        this.movie = result.movie;
        this.movie.director = this.movie.director.filter(d => d.trim());
        this.movie.actor = this.movie.actor.filter(a => a.trim());
        this.episodes = result.episodes[0].server_data;
        this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {
          this.episode = +(paramMap.get('tap') || 1) - 1;
          this.url = this.domSanitizer.bypassSecurityTrustResourceUrl(this.episodes[this.episode].link_m3u8 || this.episodes[this.episode].link_embed);
          console.log(this.episode);
          console.log(this.url);
        });
      });
    });
  }

  videoItems = [
    {
      name: 'Video one',
      src: 'http://static.videogular.com/assets/videos/videogular.mp4',
      type: 'video/mp4'
    },
    {
      name: 'Video two',
      src: 'http://static.videogular.com/assets/videos/big_buck_bunny_720p_h264.mov',
      type: 'video/mp4'
    },
    {
      name: 'Video three',
      src: 'http://static.videogular.com/assets/videos/elephants-dream.mp4',
      type: 'video/mp4'
    }
  ];
  activeIndex = 0;
  currentVideo = this.videoItems[this.activeIndex];
  data: any;
  videoPlayerInit(data: any) {
    this.data = data;
    this.data.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.initVdo.bind(this));
    this.data.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
  }
  nextVideo() {
    this.activeIndex++;
    if (this.activeIndex === this.videoItems.length) {
      this.activeIndex = 0;
    }
    this.currentVideo = this.videoItems[this.activeIndex];
  }
  initVdo() {
    this.data.play();
  }
  startPlaylistVdo(item: any, index: number) {
    this.activeIndex = index;
    this.currentVideo = item;
  }
}
