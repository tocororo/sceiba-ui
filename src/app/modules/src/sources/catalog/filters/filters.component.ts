/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ParamMap, Params } from '@angular/router';
import {
  ContainerPanelComponent,
  FlatTreeNode,
  FormFieldType,
  HintPosition,
  HintValue,
  Hit,
  InputTextComponent,
  Organization,
  PanelContent,
  SelectFilterComponent,
  SelectOption,
  SelectOptionNode,
  SelectOrgsComponent,
  SourceTypes,
  VocabulariesInmutableNames,
  VocabularyComponent,
} from 'toco-lib';

export const CatalogFilterKeys = {
  title: 'title',
  identifier: 'identifier',
  source_type: 'source_type',
  institutions: 'organizations',
  subjects: 'subjects',
  grupo_mes: 'grupo_mes',
  indexes: 'indexes',
  source_status: 'source_status',
};

@Component({
  selector: 'catalog-search-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  @Input()
  params: ParamMap;

  @Input()
  public topMainOrganization: Hit<Organization> = null;

  @Output()
  paramsChange: EventEmitter<Params> = new EventEmitter();

  filterPanel: PanelContent = null;
  formGroup: UntypedFormGroup;

  institutionTree: SelectOptionNode[] = [];
  institutionSelection: FlatTreeNode[];

  topOrganizationPID = '';

  filters: Map<string, string> = new Map<string, string>();

  constructor(private _formBuilder: UntypedFormBuilder) {}

  ngOnInit() {
    this.initPanels();

    // if (this.envService.extraArgs && this.envService.extraArgs["topOrganizationPID"]) {
    //   this.topOrganizationPID = this.envService.extraArgs["topOrganizationPID"];
    //   this.orgService.getOrganizationByPID(this.topOrganizationPID).subscribe(
    //     (response) => {
    //       this.topMainOrganization = new Organization();
    //       this.topMainOrganization.deepcopy(response.metadata);
    //       this.initPanels()
    //     },
    //     (error) => {
    //       console.log("error");
    //     },
    //     () => {}
    //   );
    // }
    // // TODO: si no hay un top level organization entonces hay que usar otro tipo de control para las organizaciones...
  }

  private initFilters() {
    if (this.params.has(CatalogFilterKeys.title)) {
      this.filters.set(
        CatalogFilterKeys.title,
        this.params.get(CatalogFilterKeys.title)
      );
    }

    if (this.params.has(CatalogFilterKeys.grupo_mes)) {
      this.filters.set(
        CatalogFilterKeys.grupo_mes,
        this.params.get(CatalogFilterKeys.grupo_mes)
      );
    }

    if (this.params.has(CatalogFilterKeys.institutions)) {
      this.filters.set(
        CatalogFilterKeys.institutions,
        this.params.get(CatalogFilterKeys.institutions)
      );
    }
    if (this.params.has(CatalogFilterKeys.indexes)) {
      this.filters.set(
        CatalogFilterKeys.indexes,
        this.params.get(CatalogFilterKeys.indexes)
      );
    }
    if (this.params.has(CatalogFilterKeys.subjects)) {
      this.filters.set(
        CatalogFilterKeys.subjects,
        this.params.get(CatalogFilterKeys.subjects)
      );
    }
    if (this.params.has(CatalogFilterKeys.source_type)) {
      this.filters.set(
        CatalogFilterKeys.source_type,
        this.params.get(CatalogFilterKeys.source_type)
      );
    }

    // this.filters.set(CatalogFilterKeys.subjects,
    //   this.params.has(CatalogFilterKeys.subjects) ?
    //     this.params.get(CatalogFilterKeys.subjects)
    //     : ""
    // );
  }

  initPanels() {
    this.formGroup = this._formBuilder.group({});
    this.initFilters();
    this.formGroup.valueChanges.subscribe({
      next: (values) => {
        // this.institutionSelection = values[CatalogFilterKeys.institutions];
        // this.changeTreeFilter();
        console.log('emit values...', values);
        if (
          values[CatalogFilterKeys.title] &&
          values[CatalogFilterKeys.title].length > 3
        ) {
          this.filters.set(
            CatalogFilterKeys.title,
            values[CatalogFilterKeys.title]
          );
        } else {
          this.filters.delete(CatalogFilterKeys.title);
        }

        if (
          values[CatalogFilterKeys.identifier] &&
          values[CatalogFilterKeys.identifier].length > 3
        ) {
          this.filters.set(
            CatalogFilterKeys.identifier,
            values[CatalogFilterKeys.identifier]
          );
        } else {
          this.filters.delete(CatalogFilterKeys.identifier);
        }


        this.changeTermMultipleFilter(
          values,
          CatalogFilterKeys.institutions,
          'id'
        );
        this.changeTermMultipleFilter(values, CatalogFilterKeys.subjects);
        this.changeTermMultipleFilter(values, CatalogFilterKeys.grupo_mes);
        this.changeTermMultipleFilter(values, CatalogFilterKeys.indexes);

        if (
          values[CatalogFilterKeys.source_type] &&
          values[CatalogFilterKeys.source_type].length > 0
        ) {
          this.filters.set(
            CatalogFilterKeys.source_type,
            values[CatalogFilterKeys.source_type][0]['value']
          );
        } else {
          this.filters.delete(CatalogFilterKeys.source_type);
        }
        console.log('filters...', this.filters);
        // if (
        //   values[CatalogFilterKeys.source_status] &&
        //   values[CatalogFilterKeys.source_status] != ""
        // ) {
        //   this.filters.set(CatalogFilterKeys.source_status,
        //     values[CatalogFilterKeys.source_status]);
        // }

        // this.params = convertToParamMap(this.filters);
        console.log('values again...', values);

        // console.log(this.filters);
        let res: Params = {};
        this.filters.forEach((value: string, key: string) => {
          console.log(value, key);
          if (value != '') {
            res[key] = value;
          }
        });
        // console.log(this.filters.keys());

        // for (const key in this.filters.keys()) {
        //   console.log(key)
        //   console.log(this.filters[key]);
        //   if (this.filters.get(key) != "") {
        //     res.set(key, this.filters.get(key));
        //   }
        // }
        console.log('emit res...', res);

        this.paramsChange.emit(res);
      },
      error: (err: any) => {
        console.log('error: ' + err + '.');
      },
      complete: () => {
        console.log('complete');
      },
    });
    this.filterPanel = {
      name: 'filterPanel',
      label: '',
      description: '',
      iconName: '',
      controlType: ContainerPanelComponent,
      formSection: this.formGroup,
      minWidth: '100%',
      formSectionContent: [
        {
          formControl: InputTextComponent.getFormControlByDefault(),
          name: 'title',
          label: 'Título',
          type: FormFieldType.text,
          controlType: InputTextComponent,
          required: false,
          width: '100%',
          startHint: new HintValue(HintPosition.start, ''),
          value: this.filters.get(CatalogFilterKeys.title),
        },
        {
          formControl: InputTextComponent.getFormControlByDefault(),
          name: 'identifier',
          label: 'Identificador (ISSN, RNPS, URL...)',
          type: FormFieldType.text,
          controlType: InputTextComponent,
          required: false,
          width: '100%',
          startHint: new HintValue(HintPosition.start, ''),
          value: this.filters.get(CatalogFilterKeys.identifier),
        },
        {
          formControl: InputTextComponent.getFormControlByDefault(),
          name: CatalogFilterKeys.source_type,
          label: 'Tipo',
          controlType: SelectFilterComponent,
          startHint: new HintValue(HintPosition.start, ''),
          required: false,
          width: '100%',
          extraContent: {
            multiple: false,
            selectedTermsIds: this.filters.has(CatalogFilterKeys.source_type)
              ? this.filters.get(CatalogFilterKeys.source_type).split(',')
              : [],
            getOptions: () => {
              const opts: SelectOption[] = [
                {
                  label: SourceTypes.JOURNAL.label,
                  value: SourceTypes.JOURNAL.value,
                },
                {
                  label: SourceTypes.REPOSITORY.label,
                  value: SourceTypes.REPOSITORY.value,
                },
                {
                  label: SourceTypes.STUDENT.label,
                  value: SourceTypes.STUDENT.value,
                },
                {
                  label: SourceTypes.POPULARIZATION.label,
                  value: SourceTypes.POPULARIZATION.value,
                },
                {
                  label: SourceTypes.SERIAL.label,
                  value: SourceTypes.SERIAL.value,
                },
                {
                  label: SourceTypes.WEBSITE.label,
                  value: SourceTypes.WEBSITE.value,
                },
                {
                  label: SourceTypes.OTHER.label,
                  value: SourceTypes.OTHER.value,
                },
              ];
              return opts;
            },
          },
        },
        {
          formControl: InputTextComponent.getFormControlByDefault(),
          name: CatalogFilterKeys.institutions,
          label: 'Organizaciones',
          controlType: SelectOrgsComponent,
          startHint: new HintValue(HintPosition.start, ''),
          required: false,
          width: '100%',
          extraContent: {
            multiple: true,
            orgFilter: { type: 'country', value: 'Cuba' },
            selectedOrgsIds: this.filters.has(CatalogFilterKeys.institutions)
              ? this.filters.get(CatalogFilterKeys.institutions).split(',')
              : [],
            // observable: this.searchService.getOrganizationById(this.topOrganizationPID),
            // getOptions: () => {
            //   const opts: SelectOption[] = [];
            //   console.log(this.topMainOrganization.metadata.relationships)
            //   this.topMainOrganization.metadata.relationships.forEach((child: Relationship) => {
            //     opts.push({
            //       value: child.id,
            //       label: child.label,
            //     });
            //   });
            //   console.log(opts)
            //   return opts;
            // },
            // selectionChange: selection => {
            //   console.log(selection);
            // }
          },
        },
        {
          formControl: InputTextComponent.getFormControlByDefault(),
          name: CatalogFilterKeys.subjects,
          label: 'Materias',
          // type: FormFieldType.vocabulary,
          controlType: VocabularyComponent,
          startHint: new HintValue(HintPosition.start, ''),
          required: false,
          width: '100%',
          extraContent: {
            multiple: true,
            selectedTermsIds: this.filters.has(CatalogFilterKeys.subjects)
              ? this.filters.get(CatalogFilterKeys.subjects).split(',')
              : [],
            vocab: VocabulariesInmutableNames.SUBJECTS,
            level: 0,
          },
        },
        {
          formControl: InputTextComponent.getFormControlByDefault(),
          name: CatalogFilterKeys.indexes,
          label: 'Indizaciones',
          // type: FormFieldType.vocabulary,
          controlType: VocabularyComponent,
          startHint: new HintValue(HintPosition.start, ''),
          required: false,
          width: '100%',
          extraContent: {
            multiple: true,
            selectedTermsIds: this.filters.has(CatalogFilterKeys.indexes)
              ? this.filters.get(CatalogFilterKeys.indexes).split(',')
              : [],
            vocab: VocabulariesInmutableNames.INDEXES,
            level: 0,
          },
        },
      ],
    };
  }

  // private initInstitutionTreeVocab(nodes: TermNode[]) {
  //   const opts: SelectOptionNode[] = [];
  //   nodes.forEach(node => {
  //     opts.push({
  //       element: {
  //         value: node.term.uuid,
  //         label: node.term.identifier
  //       },
  //       children: this.initInstitutionTreeVocab(node.children)
  //     });
  //   });
  //   return opts;
  // }
  // private initInstitutionTree(node: any) {
  //   if (node && node.children) {
  //     const opts: SelectOptionNode[] = [];
  //     node.children.forEach((node: any) => {
  //       opts.push({
  //         element: {
  //           value: node.uuid,
  //           label: node.name + " (" + node.count + ")"
  //         },
  //         children: this.initInstitutionTree(node)
  //       });
  //     });
  //     return opts;
  //   }
  //   return null;
  // }

  // private changeTreeFilter() {
  //   if (this.institutionTree && this.institutionSelection) {
  //     const selection = this.findFlatInInstTree(this.institutionTree);
  //     let val = "";
  //     selection.forEach(element => {
  //       val = val.concat(element.element.value, ",");
  //     });
  //     // val = val.concat(this.topOrganizationPID)
  //     val = val.slice(0, val.length - 1);
  //     // if (val != ''){
  //     // this.filters[CatalogFilterKeys.institutions] = val;
  //     this.filters.set(CatalogFilterKeys.institutions, val);
  //     // }
  //     // else if (this.topOrganizationPID != ''){
  //     //   this.filters[CatalogFilterKeys.institutions] = this.topOrganizationPID;
  //     // }
  //   }
  // }
  // private findFlatInInstTree(children: SelectOptionNode[]) {
  //   let result: FlatTreeNode[] = [];
  //   children.forEach(node => {
  //     const to_add = this.institutionSelection.find(
  //       f => f.element.value == node.element.value
  //     );
  //     if (to_add != undefined) {
  //       result.push(to_add);
  //     } else {
  //       result = result.concat(this.findFlatInInstTree(node.children));
  //     }
  //   });
  //   return result;
  // }

  private changeTermMultipleFilter(values, key, valuekey = 'uuid') {
    if (values[key]) {
      let val = '';
      values[key].forEach((element) => {
        console.log(element);

        val = val.concat(element[valuekey], ',');
      });
      val = val.slice(0, val.length - 1);
      // if (val != '') {
      this.filters.set(key, val);
      // this.filters[key] = val;
      // }
    }
  }
}

// (relations.uuid:4dbd2cda-6e42-4858-a999-1fa6ec210657 OR relations.uuid:eeab373f-f904-4f1e-ad91-b36e0e04fa3b)AND(relations.uuid:2f528a11-45d0-4ded-b4f4-98b791c0014e)

// OR(relations.inst.uuid=a1234ORrelations.inst.uuid:23)
