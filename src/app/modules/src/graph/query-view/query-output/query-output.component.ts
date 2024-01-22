import { Component } from '@angular/core';
import { GetBreakpointService } from 'src/services/shared-services/get-breakpoint.service';


@Component({
  selector: 'app-query-output',
  templateUrl: './query-output.component.html',
  styleUrls: ['./query-output.component.scss']
})
export class QueryOutputComponent {
  currentBreakpoint:String;
  constructor(
    public get_breakpoint_service:GetBreakpointService
   ) {

     this.currentBreakpoint = get_breakpoint_service.getBreakpoint();
   }

}
