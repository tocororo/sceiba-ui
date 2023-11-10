
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

import { ActionText, ChildControlsPath, InputContent, InputIssnComponent,
	InputTextComponent, InputUrlComponent, TextInputAppearance } from 'toco-lib';

import { JournalGeneralData } from '../evaluation.entity';

/**
 * Represents a control that contains the journal general data associated with the survey. 
 */
@Component({
	selector: 'app-survey-journal-data',
	templateUrl: './survey-journal-data.component.html',
	styleUrls: ['./survey-journal-data.component.scss']
})
export class SurveyJournalDataComponent implements OnInit
{
	/**
	 * An object of paths that is used to get the child controls in the `evaluationFormGroup` control. 
	 * The value of its properties is a dot-delimited string value or an array of string/number values 
	 * that define the path to a child control. 
	 */
	public readonly journalData_ChildControlsPath: ChildControlsPath = {
		'name': 'name',
		'url': 'url',
		'issn': 'issn'
	};

	/**
	 * Returns the action through a text. 
	 * It is like a readonly field, and it is only used to initialize the form; for that reason, 
	 * its name begins with an underscore to remember you that you can NOT change its value after 
	 * it is initialized. 
	 */
	@Input()
	public _actionText: ActionText;

	/**
	 * Returns the journal general data. 
	 * It is like a readonly field, and it is only used to initialize the form; for that reason, 
	 * its name begins with an underscore to remember you that you can NOT change its value after 
	 * it is initialized. 
	 */
	@Input()
	public _journalData: JournalGeneralData;

	/**
	 * Returns the journal general data `FormGroup`. 
	 */
	@Input()
	public journalDataFormGroup: UntypedFormGroup;
	public nameContent: InputContent;
	public urlContent: InputContent;
	public issnContent: InputContent;

	public constructor()
	{
		this._actionText = undefined;
		this._journalData = undefined;
		this.journalDataFormGroup = undefined;
		this.nameContent = undefined;
		this.urlContent = undefined;
		this.issnContent = undefined;
	}

	public ngOnInit(): void
	{
		this._initFormData();

		console.log('Data got for SurveyJournalDataComponent: ', this.journalDataFormGroup);
	    
	}

	/**
	 * Initializes the form data. 
	 */
	private _initFormData(): void
	{
		this.nameContent = {
			'formControl': InputTextComponent.getFormControlByDefault({ 'pattern': '^[a-zA-Z\_áéíóúÁÉÍÓÚ][a-zA-Z\-\_áéíóúÁÉÍÓÚ\ 0-9]*$' }),
			'name': this.journalData_ChildControlsPath.name as string,
			'label': 'NOMBRE',
			'placeholder': 'ESCR_NOMBRE_REVISTA',
			'controlType': InputTextComponent,
			'value': this._journalData.name,
			'required': true,
			'width': '100%',
			'appearance': TextInputAppearance.outline,
			'ariaLabel': 'NOMBRE'
		};

		this.urlContent = {
			'formControl': InputUrlComponent.getFormControlByDefault(),
			'name': this.journalData_ChildControlsPath.url as string,
			'label': 'Url',
			'placeholder': 'URL_GENERICA',
			'controlType': InputUrlComponent,
			'value': this._journalData.url,
			'required': true,
			'width': '100%',
			'appearance': TextInputAppearance.outline,
			'ariaLabel': 'Url'
		};

		this.issnContent = {
			'formControl': InputIssnComponent.getFormControlByDefault(),
			'name': this.journalData_ChildControlsPath.issn as string,
			'label': 'ISSN',
			/* The default `placeholder` is good enough. */
			'controlType': InputIssnComponent,
			'value': this._journalData.issn,
			'required': true,
			'width': '100%',
			'appearance': TextInputAppearance.outline,
			'ariaLabel': 'ISSN'
		};
 
		/* Adds control to `journalDataFormGroup`. */

		this.journalDataFormGroup.addControl(this.journalData_ChildControlsPath.name as string,
			this.nameContent.formControl
		);

		this.journalDataFormGroup.addControl(this.journalData_ChildControlsPath.url as string,
			this.urlContent.formControl
		);

		this.journalDataFormGroup.addControl(this.journalData_ChildControlsPath.issn as string,
			this.issnContent.formControl
		);

		


	}
}
