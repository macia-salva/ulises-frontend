import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  destroyed = new Subject<void>();
  isLandscape: boolean;

  ngOnInit(): void {}
  constructor(private breakpointObserver: BreakpointObserver) {
    this.isLandscape=false;
    this.initObserver();

  }

  private initObserver() {
    this.breakpointObserver
      .observe([
        '(orientation: portrait)',
        '(orientation: landscape)',
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.isLandscape = query === '(orientation: landscape)';
          }
        }
      });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }


}
