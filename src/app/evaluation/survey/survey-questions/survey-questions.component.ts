
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ActionText } from 'toco-lib';

import { SurveySection } from '../evaluation.entity';

/**
 * Represents a control that contains the questions associated with the survey.
 * The questions are group in categories.
 * The categories are group in sections.
 */
@Component({
	selector: 'app-survey-questions',
	templateUrl: './survey-questions.component.html',
	styleUrls: ['./survey-questions.component.scss']
})
export class SurveyQuestionsComponent implements OnInit
{
	/**
	 * Returns the action through a text.
	 * It is like a readonly field, and it is only used to initialize the form; for that reason,
	 * its name begins with an underscore to remember you that you can NOT change its value after
     * it is initialized.
	 */
	public _actionText: ActionText;

	/**
	 * Returns the array of sections associated with the survey.
	 * It is like a readonly field, and it is only used to initialize the form; for that reason,
	 * its name begins with an underscore to remember you that you can NOT change its value after
	 * it is initialized.
	 */
	public _survey: Array<SurveySection>;

	/**
	 * Returns the `FormGroup` for the array of sections associated with the survey.
	 */
	public surveyFormGroup: FormGroup;

	public constructor()
	{
		this._actionText = undefined;
		this._survey = undefined;
		this.surveyFormGroup = undefined;
	}

	public ngOnInit(): void
	{
		console.log('Data got for SurveyQuestionsComponent: ', this.surveyFormGroup);

	}
}
