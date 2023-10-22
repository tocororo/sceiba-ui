/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Data, RouterOutlet } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { MetadataService } from 'toco-lib';

@Component({
    selector: 'catalog-static-pages',
    templateUrl: './static-pages.component.html',
    styleUrls: ['./static-pages.component.scss']
})
export class StaticPagesComponent implements OnInit {

    @Input() public src: string;

    @Input() public title: string;

    constructor(
      private metadata: MetadataService,
      private activatedRoute: ActivatedRoute,
      public transServ: TranslateService) { }

    ngOnInit() {
        if (this.src == undefined) this.src = '';
        if (this.title == undefined) this.title = '';
        this.metadata.setStandardMeta(this.title, '', '');

        this.activatedRoute.data.subscribe({
            next: (data: { src: string, title: string }) => {
                if (data) {
                    this.metadata.setStandardMeta(this.title, '', '');

                    this.src = data.src + '.' + this.transServ.currentLang + '.md';
                    this.title = data.title;
                    // this.metadata.setTitleDescription(this.title, '');

                    /* Changes the translation when the language changes. */
                    this.transServ.onLangChange.subscribe((params: LangChangeEvent) => {
                        this.src = data.src + '.' + params.lang + '.md';
                    });
                    this.metadata.meta.updateTag({name:"DC.title", content:data['title']});
                    this.metadata.meta.updateTag({name:"DC.description", content:data['src'].substring(0,160)});
                    this.metadata.meta.updateTag({name:"robots", content:"index,follow"});
                }

            },
            error: (e) => {console.log(e);},
            complete: () => {}
        });
    }

}
