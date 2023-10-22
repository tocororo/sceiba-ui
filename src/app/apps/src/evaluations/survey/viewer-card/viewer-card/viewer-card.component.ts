
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

import { SelectContent, InputBoolComponent, InputNumberComponent, InputSelectComponent,
	TextInputAppearance, ValidatorArguments } from 'toco-lib';

import { CategoryQuestionType, SurveySection, CategoryQuestion } from '../../evaluation.entity';

@Component({
	selector: 'app-viewer-card',
	templateUrl: './viewer-card.component.html',
	styleUrls: ['./viewer-card.component.scss']
})
export class ViewerCardComponent implements OnInit
{
    /**
     * Represents the `CategoryQuestionType` enum for internal use.
     */
	public readonly categoryQuestionType: typeof CategoryQuestionType;

	public whereToLookForIt: string;

	/**
	 * Returns the `FormGroup` parent.
	 */
	@Input()
	public parentFormGroup: UntypedFormGroup;
	/**
	 * Returns the `SurveySection`.
	 * It is used to create controls.
	 */
	@Input()
	public surveySection: SurveySection;
  public step: number;

	public constructor(private _transServ: TranslateService)
	{
		this.categoryQuestionType = CategoryQuestionType;

		this._doTranslation();

		this.parentFormGroup = undefined;
		this.surveySection = undefined;
	}

	public ngOnInit(): void
	{
		/* Changes the translation when the language changes. */
		this._transServ.onLangChange.subscribe((params: LangChangeEvent) => {
			this._doTranslation();
		});

		this._initFormData();

		console.log('Data got for ViewerCardComponent: ', this.parentFormGroup);
	}

	/**
	 * Initializes the form data.
	 */
	private _initFormData(): void
	{
		/* Creates controls content. */

		let question: CategoryQuestion;
		let validatorArguments: ValidatorArguments;

		for (let category of this.surveySection.categories)
		{
			for (question of (category.questionsOrRecoms as Array<CategoryQuestion>))
			{
				switch (question.type)
				{
					case CategoryQuestionType.bool:
						{
							question._inputContent = {
								'formControl': InputBoolComponent.getFormControlByDefault(),
								'name': question.id,
								'label': undefined,
								'controlType': InputBoolComponent,
								'value': question.answer,
								'required': false,
								'width': '100%',
								'appearance': TextInputAppearance.standard,
								'ariaLabel': question.desc,
							};
							break;
						}

					case CategoryQuestionType.integer:
						{
							validatorArguments = { };
							if (question.min != undefined) validatorArguments.min = question.min;
							if (question.max != undefined) validatorArguments.max = question.max;

							question._inputContent = {
								'formControl': InputNumberComponent.getFormControlByDefault(validatorArguments),
								'name': question.id,
								'label': undefined,
								'controlType': InputNumberComponent,
								'value': question.answer,
								'required': false,
								'width': '100%',
								'appearance': TextInputAppearance.standard,
								'ariaLabel': question.desc,
							};
							break;
						}

					case CategoryQuestionType.select:
						{
							question._inputContent = {
								'formControl': InputSelectComponent.getFormControlByDefault(),
								'name': question.id,
								'label': undefined,
								'controlType': InputSelectComponent,
								'value': question.answer,
								'required': false,
								'width': '100%',
								'appearance': TextInputAppearance.standard,
								'ariaLabel': question.desc,
								'selectOptions': question.selectOptions,
								'multiple': false,
								'showTooltip': true,
								'selectTooltipPosition': 'below',
								'optionsTooltipPosition': 'left'
							} as SelectContent;
							break;
						}

					default:
						{
							throw new Error(`For the '${ ViewerCardComponent.name }' control, the category question type value has an error because the programme does not know what to do with it!`);
						}
				}

				/* Adds control to `parentFormGroup`. */
				this.parentFormGroup.addControl(question._inputContent.name, question._inputContent.formControl);
			}
		}
	}

	/**
	 * Does the translation.
	 */
	private _doTranslation(): void
	{
		this._transServ.get('DONDE_BUSCARLA').subscribe((res: any) => {
			this.whereToLookForIt = res;
		});
	}

  public setStep(index: number) {
    this.step = index;
  }

  public nextStep() {
    this.step++;
  }

  public prevStep() {
    this.step--;
  }
}
