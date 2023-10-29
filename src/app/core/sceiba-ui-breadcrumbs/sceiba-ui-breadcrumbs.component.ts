import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sceiba-ui-breadcrumbs',
  templateUrl: './sceiba-ui-breadcrumbs.component.html',
  styleUrls: ['./sceiba-ui-breadcrumbs.component.scss'],
})
export class SceibaUiBreadcrumbsComponent implements OnInit {
  breadcrumbList: Array<any> = [];

  constructor(private _router: Router) {}

  ngOnInit() {
    this.listenRouting();
  }
  listenRouting() {
    let routerUrl: string, routerList: Array<any>, target: any;
    this._router.events.subscribe((router: any) => {
      routerUrl = router.urlAfterRedirects;
      if (routerUrl && typeof routerUrl === 'string') {
        this.breadcrumbList.length = 0;
        routerList = routerUrl.slice(1).split('/');
        this.breadcrumbList = routerList
        // routerList.forEach((router, index) => {
        //   target = target.find((page) => page.path.slice(2) === router);
        //   this.breadcrumbList.push({
        //     name: target.name,
        //     path:
        //       index === 0
        //         ? target.path
        //         : `${this.breadcrumbList[index - 1].path}/${target.path.slice(
        //             2
        //           )}`,
        //   });
        //   if (index + 1 !== routerList.length) {
        //     target = target.children;
        //   }
        // });

        console.log(this.breadcrumbList);
      }
    });
  }
}
