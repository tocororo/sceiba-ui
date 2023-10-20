
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { ActionText, Hit, MessageHandler, StatusCode } from 'toco-lib';

import { Evaluation } from '../evaluation.entity';

/**
 * Represents a control that allows to see the details of a Survey.
 */
@Component({
	selector: 'app-survey-view',
	templateUrl: './survey-view.component.html',
	styleUrls: ['./survey-view.component.scss']
})
export class SurveyViewComponent implements OnInit
{
	/**
	 * Returns true if the component has a task in progress; otherwise, false.
	 * Example of task is: loading, updating, etc.
	 * By default, its value is `true` because it represents the loading task.
	 */
	public hasTaskInProgress: boolean;

	public evaluation: Evaluation;  /* It is like a readonly field, and it is only used to initialize the view. */

	public constructor(private _router: Router,
		private _activatedRoute: ActivatedRoute,
		private _snackBar: MatSnackBar)
	{
		/* The component begins its loading task. */
		this.hasTaskInProgress = true;

		this.evaluation = undefined;
	}

	public ngOnInit(): void
	{
		this._activatedRoute.data.subscribe({
			next: (data: { 'evaluation': Hit<Evaluation> }) => {
				/* It is not necessary to realize deep copy because the `evaluation` field
				 * is like a readonly field, and it is only used to initialize the view. */
				this.evaluation = data.evaluation.metadata;

				/* The component ends its loading task. It is set here and not in the `complete` property because the `complete` notification is not sent. */
				this.hasTaskInProgress = false;
			},
			error: (err: any) => {
				/* The component ends its loading task. */
				this.hasTaskInProgress = false;

				const m = new MessageHandler(this._snackBar);
				m.showMessage(StatusCode.OK, err.message)
			}
		});

		console.log('Data got for viewing: ', this.evaluation);
	}

	/**
	 * Returns true if the user has permission to edit; otherwise false.
	 */
	 public get hasPermission(): boolean
	 {
		 // TODO: Implement this property.

		 return true;
	 }

	/**
	 * Does the tasks to go to the adding view.
	 */
	public edit(): void
	{
		/* Navigates to the adding view. */
		this._router.navigate(['survey', ActionText.add]);
	}

	/**
	 * Does the tasks to go back to the previous view.
	 */
	public goBack(): void
	{
		/* Relatively navigates back to the previous view. */
		this._router.navigate(['../'], { relativeTo: this._activatedRoute });
	}
}
