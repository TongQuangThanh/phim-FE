import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { APP_NAME_TOKEN } from '../common/const';

@Injectable({ providedIn: 'root' })
export class LoggedInGuard implements CanLoad {
  constructor(private router: Router) { }
  async canLoad(route: Route, segments: UrlSegment[]) {
    if (localStorage.getItem(APP_NAME_TOKEN)) {
      return true;
    }
    return false;
  }

  async canActivate() {
    if (localStorage.getItem(APP_NAME_TOKEN)) {
      return true;
    }
    return false;
  }
}
