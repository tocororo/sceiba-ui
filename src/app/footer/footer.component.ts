
import { Component, Input, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class SceibaFooterComponent implements OnInit {

    @Input()
  public sites: Array<{ name: string; url: string; useRouterLink: boolean; }> = [];

    @Input()
  public information: Array<{ name: string; url: string; useRouterLink: boolean; }> = [];

    @Input()
    public image: string = ""

  public constructor(public iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    this.iconRegistry.addSvgIcon('facebook',this.sanitizer.bypassSecurityTrustResourceUrl('/assets/images/svg/facebook.svg'));
    this.iconRegistry.addSvgIcon('twitter',this.sanitizer.bypassSecurityTrustResourceUrl('/assets/images/svg/twitter.svg'));
    this.iconRegistry.addSvgIcon('github',this.sanitizer.bypassSecurityTrustResourceUrl('/assets/images/svg/github.svg'));
     }

    public ngOnInit(): void {
        if ( this.sites == undefined ) this.sites = new Array();
        if ( this.information == undefined ) this.information = new Array();

    }
}
