import { Component, OnInit } from "@angular/core";
import { Course } from "../model/course";
import { interval, Observable, of, timer, noop, throwError } from "rxjs";
import {
  catchError,
  delayWhen,
  map,
  retryWhen,
  shareReplay,
  tap,
  finalize
} from "rxjs/operators";
import { createHttpObserable } from "../common/util";
import { filter } from "rxjs/operators";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  //   beginnerCourses: Course[];
  //   advanceCourses: Course[];

  beginnerCourses$: Observable<Course[]>;
  advanceCourses$: Observable<Course[]>;

  constructor() {}

  ngOnInit() {
    const http$: Observable<Course[]> = createHttpObserable("/api/courses");

    const courses$ = http$.pipe(
      catchError(err => {
        console.error(err);
        return throwError(err);
      }),
      finalize(() => {
        console.log("Finalize executed...");
      }),
      tap(() => console.log("Http Request Executed")),
      map(res => Object.values(res["payload"])),
      shareReplay()
    );

    this.beginnerCourses$ = courses$.pipe(
      map((courses: Course[]) =>
        courses.filter(course => course.category == "BEGINNER")
      )
    );

    this.advanceCourses$ = courses$.pipe(
      map((courses: Course[]) =>
        courses.filter(course => course.category == "ADVANCED")
      )
    );
  }
}
