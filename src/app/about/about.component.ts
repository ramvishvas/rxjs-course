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
    const http$ = createHttpObserable("/api/courses");

    const sub = http$.subscribe(console.log);

    setTimeout(() => sub.unsubscribe(), 0);
  }
}
