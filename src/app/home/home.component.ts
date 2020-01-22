import { Component, OnInit } from "@angular/core";
import { Course } from "../model/course";
import { interval, Observable, of, timer, noop } from "rxjs";
import {
  catchError,
  delayWhen,
  map,
  retryWhen,
  shareReplay,
  tap
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
      tap(() => console.log("Http Request Executed")),
      map(res => Object.values(res["payload"])),
      shareReplay(),
      catchError(err =>
        of([
          {
            id: 0,
            description: "RxJs In Practice Course",
            iconUrl:
              "https://s3-us-west-1.amazonaws.com/angular-university/course-images/rxjs-in-practice-course.png",
            courseListIcon:
              "https://angular-academy.s3.amazonaws.com/main-logo/main-page-logo-small-hat.png",
            longDescription:
              "Understand the RxJs Observable pattern, learn the RxJs Operators via practical examples",
            category: "BEGINNER",
            lessonsCount: 10
          }
        ])
      )
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
