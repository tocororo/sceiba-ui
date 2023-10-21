import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { HelpRoutingModule } from "./help-routing.module";
import { HelpComponent } from "./help/help.component";
import { StaticPagesComponent } from "./static-pages/static-pages.component";

@NgModule({
  declarations: [HelpComponent, StaticPagesComponent],

  imports: [CommonModule, SharedModule, HelpRoutingModule],
})
export class HelpModule {}
