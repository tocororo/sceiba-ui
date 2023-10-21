

import { Entity, EntityBase, InputContent, Params, SelectOption } from 'toco-lib';

/**
 * More general implementation for the future:
 * The evaluation data that is stored in the frontend and backend are divided into two parts: schema and answer.
 *  * Schema: (EvaluationSchema) A class that contains all the information to create the survey form dynamically.
 *  * Answer: (EvaluationAnswer) A class that contains all the information entered by the user in the survey form.
 *     * In addition, this class contains a `resultAndRecoms` field (for the result and recommendations), whose value is equal to or different from `undefined`.
 *        * The `resultAndRecoms` field equal to `undefined` means that the evaluation has not been processed by the backend (because the backend is the one who produces this value).
 *           * Examples of use of this case:
 *              * When using the `SurveyComponent` component to add an evaluation in the first and second part.
 *        * The `resultAndRecoms` field different from `undefined` means that the evaluation was processed by the backend.
 *           * Examples of use of this case:
 *              * When using the `SurveyComponent` component to add an evaluation in the third part.
 *              * When using the `SurveyComponent` component to view an evaluation.
 */


/**
 * An enum that represents the three main view types for doing an evaluation.
 */
export enum EvaluationViewType
{
    /**
     * Journal general data view.
     */
    journalData = 'journalData',

    /**
     * Journal survey view.
     */
    survey = 'survey',

    /**
     * Result and recommendations view.
     */
    resultAndRecoms = 'resultAndRecoms'
}

/**
 * An enum that represents the type of an `CategoryQuestion`.
 */
export enum CategoryQuestionType
{
    /**
     * The `bool` type is the default type. It shows a boolean control.
     */
    bool = 'bool',

    /**
     * It shows a numeric control.
     */
    integer = 'integer',

    /**
     * It shows a select control.
     */
    select = 'select'
}

/**
 * Entity for `CategoryQuestion` based on schema `...-v1.0.0.json`.
 * Represents a survey section category question.
 */
export class CategoryQuestion extends EntityBase
{
    /**
     * Question type.
     */
    type: CategoryQuestionType;
    /**
     * Question id.
     */
    id: string;
    /**
     * Question description.
     */
    desc: string;
    /**
     * Question hint.
     */
    hint: string;
    /**
     * Question answer.
     */
    answer: any;
    /**
     * Possible minimum value. It is used if `type` == CategoryQuestionType.integer.
     */
    min?: number;
    /**
     * Possible maximum value. It is used if `type` == CategoryQuestionType.integer.
     */
    max?: number;
	/**
     * Options list that can be selected. It is used if `type` == CategoryQuestionType.select.
	 */
    selectOptions?: SelectOption[];
    /**
     * This field is filled internally.
     * For internal use only.
     */
    _inputContent?: InputContent;
}

/**
 * Entity for `CategoryRecom` based on schema `...-v1.0.0.json`.
 * Represents a survey section category recommendation.
 */
export class CategoryRecom extends EntityBase
{
    /**
     * Recommendation id.
     */
    id: string;
    /**
     * Recommendation value.
     */
    value: string;
}

/**
 * Entity for `SectionCategory` based on schema `...-v1.0.0.json`.
 * Represents a survey section category.
 */
export class SectionCategory extends EntityBase
{
    /**
     * Category title.
     */
    title: string;
    /**
     * Category title evaluation value.
     * It is only used with the `ResultAndRecoms` type.
     */
    titleEvaluationValue?: string;
    /**
     * If this field is used with the `Evaluation.sections` field, then its type is `Array<CategoryQuestion>` (an array of questions associated with the category).
     * If this field is used with the `Evaluation.resultAndRecoms` field, then its type is `Array<CategoryRecom>` (an array of recommendations associated with the category).
     */
    questionsOrRecoms: Array<CategoryQuestion> | Array<CategoryRecom>;
}

/**
 * Entity for `SurveySection` based on schema `...-v1.0.0.json`.
 * Represents a survey section.
 */
export class SurveySection extends EntityBase
{
    /**
     * Section title.
     */
    title: string;
    /**
     * Section title evaluation value.
     * It is only used with the `ResultAndRecoms` type.
     */
    titleEvaluationValue?: string;
    /**
     * An array of categories associated with the section.
     */
    categories: Array<SectionCategory>;
}

/**
 * Entity for `JournalGeneralData` based on schema `...-v1.0.0.json`.
 * Represents the journal general data that a user fills in the first step.
 */
export class JournalGeneralData extends EntityBase
{
    /**
     * Journal name.
     */
     name: string;
    /**
     * Journal URL page.
     */
    url: string;
    /**
     * Journal ISSN.
     */
    issn: string;
}

/**
 * Entity for `ResultAndRecoms` based on schema `...-v1.0.0.json`.
 * Represents the result and recommendations data that are showed to the user as the result of the survey he did.
 */
export class ResultAndRecoms extends EntityBase
{
    /**
     * General evaluation name.
     */
    generalEvaluationName: string;
    /**
     * General evaluation value.
     */
    generalEvaluationValue: string;

    /**
     * An array of sections associated with the survey that contain its results.
     */
    sections: Array<SurveySection>;
}

/**
 * Entity for `Evaluation` based on schema `...-v1.0.0.json`.
 */
 export class Evaluation extends Entity
 {
    /**
     * User who made the evaluation.
     */
    user: string;
    /**
     * Evaluation date.
     */
    date: Date;

    /************************************* Journal Data ***************************/

    /**
     * Journal general data.
     */
    journalData: JournalGeneralData;

    /********************************** Survey (Questions) ************************/

    /**
     * An array of sections associated with the survey.
     */
    sections: Array<SurveySection>;

    /****************************** Result and Recommendations ********************/

    /**
     * Result and recommendations.
     * If this field is `undefined`, then the evaluation has NOT been done for the inserted data.
     */
    resultAndRecoms: ResultAndRecoms;
 }

/**
 * This interfax has data
 */

 export interface MyEvaluation
  {
    name: string;
    date: string;
    status: boolean;

  }

/**
 * Entity for `EvaluationAnswer` based on schema `...-v1.0.0.json`.
 * This class only contains the values that the user can add or modify.
 */

export class EvaluationAnswer extends Entity
{
    /**
     * User who made the evaluation.
     */
    user: string;
    /**
     * Evaluation date.
     */
    date: Date;

    /************************************* Journal Data ***************************/

    /**
     * Journal general data.
     */
    journalData: JournalGeneralData;

    /********************************** Survey (Questions) ************************/

    /**
     * Journal survey.
     */
    survey: Params<any>;

    /****************************** Result and Recommendations ********************/

    /**
     * Result and recommendations.
     * If this field is `undefined`, then the evaluation has NOT been done for the inserted data.
     */
    resultAndRecoms: ResultAndRecoms;
}


enum State {
    INITIAL = "initial",
    PROCESSING = "processing",
    FINISH = "finish",
    ERROR = "error",
  };

export class Evaluations
{
    id: number;
    uuid: string;
    state: State
    datetime: Date;
    notes: string;
    user_id: number;
    data: any;
    entity_type: string;
    methodology_name: string;

}
