import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
  interval,
  timer,
  fromEvent,
  Observable,
  noop,
  of,
  concat,
  merge
} from "rxjs";
import { createHttpObserable } from "../common/util";
import { map } from "rxjs/operators";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"]
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const source0$ = interval(1000);
    const source1$ = source0$.pipe(map(val => val * 5));

    const result$ = merge(source0$, source1$);

    result$.subscribe(console.log);
  }
}
