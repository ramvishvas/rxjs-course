import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { interval, timer, fromEvent, Observable, noop } from "rxjs";
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

    const courses$ = http$.pipe(map(res => Object.values(res["payload"])));

    courses$.subscribe(
      courses => console.log(courses),
      noop,
      () => console.log("completed")
    );
  }
}
