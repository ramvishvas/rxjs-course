import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { interval, timer, fromEvent, Observable, noop, of, concat } from "rxjs";
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
    // const http$ = createHttpObserable("/api/courses");

    // const courses$ = http$.pipe(map(res => Object.values(res["payload"])));

    // courses$.subscribe(
    //   courses => console.log(courses),
    //   noop,
    //   () => console.log("completed")
    // );

    // if source 0 is never completed then source 1,2,3 will never complete
    const source0$ = interval(1000);

    const source1$ = of(1, 2, 3);
    const source2$ = of(4, 5, 6);
    const source3$ = of(7, 8, 9);

    const result$ = concat(source1$, source2$, source3$);

    // result$.subscribe(val => console.log(val));

    result$.subscribe(console.log);
  }
}
