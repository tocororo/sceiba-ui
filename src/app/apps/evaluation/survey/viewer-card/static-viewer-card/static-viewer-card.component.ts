
import { Component, Input, OnInit } from '@angular/core';

import { SurveySection } from '../../evaluation.entity';

@Component({
	selector: 'app-static-viewer-card',
	templateUrl: './static-viewer-card.component.html',
	styleUrls: ['./static-viewer-card.component.scss']
})
export class StaticViewerCardComponent implements OnInit
{
	/**
	 * Returns the `SurveySection`. 
	 * It is used to create controls. 
	 */
	@Input()
	public surveySection: SurveySection;

	public constructor()
	{
		this.surveySection = undefined;
	}

	public ngOnInit(): void
	{
		this._initFormData();

		console.log('Data got for StaticViewerCardComponent: ', this.surveySection);
	}

	/**
	 * Initializes the form data. 
	 */
	private _initFormData(): void
	{
		/* Creates controls content. */

		/* Nothing to do because all is already initialized! */
	}
}
