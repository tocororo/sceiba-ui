import { Injectable } from "@angular/core";
import {
  BreakpointObserver,
  Breakpoints,
  MediaMatcher,
} from "@angular/cdk/layout";

@Injectable({
  providedIn: "root",
})
export class GetBreakpointService {
  private mobileQuery: any;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private mediaMatcher: MediaMatcher
  ) {
    this.mobileQuery = this.mediaMatcher.matchMedia("(max-width: 599.98px)");
  }
  /**
   * get the name of the current breakpoint based on the screen size
   * @returns the name of the current breakpoint
   */
  public getBreakpoint(): string {
    if (this.mobileQuery.matches) {
      return "Handset";
    } else if (this.breakpointObserver.isMatched(Breakpoints.Tablet)) {
      return "Tablet";
    } else if (this.breakpointObserver.isMatched(Breakpoints.Web)) {
      return "Web";
    } else {
      return "Unknown";
    }
  }
}
