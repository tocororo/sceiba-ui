import { Component, Input, OnInit } from '@angular/core';
import { SourceClasification } from 'toco-lib';

/**
 * This component share the same scss that `JournalViewComponent`.
 * His goal is show a list of `terms`
 */
@Component({
    selector: 'catalog-journal-view-version-term',
    templateUrl: './journal-view-version-term.component.html',
    styleUrls: ['../version-view.component.scss']
})
export class SourceJournalViewVersionTermComponent implements OnInit {

    @Input() public title: string;

    @Input() public vocab_id: number;

    @Input() public terms: Array<SourceClasification>;

    constructor() {

    }

    ngOnInit(): void {
        if (this.terms == undefined) this.terms = new Array<SourceClasification>(0);

        if (this.vocab_id == undefined) this.vocab_id = 0;

        if (this.title == undefined) this.title = '';
    }
}

