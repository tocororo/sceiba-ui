import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  Output
} from "@angular/core";

import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatSelectionListChange } from "@angular/material/list";
import { PageEvent } from "@angular/material/paginator";
import {
  Aggr,
  SearchService
} from "toco-lib";
@Component({
  selector: "app-agregations-modal",
  templateUrl: "./agregations-modal.component.html",
  styleUrls: ["./agregations-modal.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordsAgregationsModalComponent implements OnInit {
  @Output()
  agregations_selected: any;
  page: number = 0;
  disabled: boolean = false;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  aggrsSelection: any = {};

  constructor(
    public dialog: MatDialog,
    private _searchService: SearchService,
    public dialogRef: MatDialogRef<RecordsAgregationsModalComponent>,
    /**
     * with this line , capture the key that was sent from the parent component search who was sending to the modal
     */
    @Inject(MAT_DIALOG_DATA) public agregations: any
  ) {}

  ngOnInit() {


  }
  /**
   * that method capture all the parameters we need to make a request and display the response
   * @param event in this event we capture the pageSize ,lenght,pageIndex of the paginator component
   * by carlosmonterrey
   */
  changesOnParameters(event: PageEvent) {
    this.pageEvent = event;
    console.log(this.pageEvent);
    this.agregations = this.getAgregationsByParameters(
      this.pageEvent.pageSize,
      this.pageEvent.pageIndex,
      this.agregations
    );
  }
  /**
   *  * work with the parameters locate on pageEvent variable and make a query with them
   * @param pageSize the number of item you are going to have on that page
   * @param pageIndex the number of the page
   * @param agregation_key the key of the agregation
   * @returns a list of the agregations that meet the parameters
   */
  getAgregationsByParameters(
    pageSize: number,
    pageIndex: number,
    agregation_key: string
  ): Aggr[] {
    console.log("cantidad elementos", pageSize);
    console.log("numero de pagina", pageIndex);
    console.log("key de agregaciones", agregation_key);

    return;
  }
/**
 * if a option is selected the method deselect all the options and select the current option,ensuring that the selection is unique
 * @param event the change event
 */
  handleChange(event: MatSelectionListChange) {
    if (event.options[0].selected) {
      event.source.deselectAll();
      event.options[0].selected = true;
    }
  }
}
