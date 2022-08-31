import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/list/list.component';
import { MovieComponent } from './components/movie/movie.component';
import { PlayComponent } from './components/play/play.component';

const routes: Routes = [
  {
    path: 'danh-sach/:id',
    component: ListComponent
  },
  {
    path: 'phim/:id',
    component: MovieComponent
  },
  {
    path: 'xem-phim/:id',
    component: PlayComponent
  },
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
