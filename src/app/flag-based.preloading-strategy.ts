import { Injectable } from "@angular/core";
import { PreloadingStrategy, Route } from "@angular/router";

import { Observable, of } from "rxjs";

@Injectable({ providedIn: "root" })
export class FlagBasedPreloadingStrategy extends PreloadingStrategy {
  // An HTTP call to preload the component is made when the application is rendered & it does not get initialized until the user asks for it.
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    return route.data?.["preload"] === true ? load() : of(null);
  }
}
