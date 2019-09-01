import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { InfiniteLoaderComponent } from 'ngx-weui/infiniteloader';
import { timer } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'tab-navigator',
  templateUrl: './tab-navigator.component.html',
  styleUrls: ['./tab-navigator.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TabNavigatorComponent implements OnInit {

  private isActive;
  constructor() {
    this.isActive = false;
  }

  ngOnInit() {
    this.isActive = true;
    // TODO
    // if (code) {
    //   this.isActive = true;
    // } else {
    //   Router(login-page);
    // }
  }

  time: number;
  onSelect() {
    this.time = new Date().getTime();
  }

  items: any[] = Array(20)
    .fill(0)
    .map((_v: any, i: number) => i);
  onLoadMore(comp: InfiniteLoaderComponent) {
    timer(1500).subscribe(() => {
      this.items.push(
        ...Array(10)
          .fill(this.items.length)
          .map((v, i) => v + i),
      );

      if (this.items.length >= 50) {
        comp.setFinished();
        return;
      }
      comp.resolveLoading();
    });
  }

}
