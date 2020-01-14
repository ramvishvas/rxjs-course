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
    // PART 1
    // const http$ = createHttpObserable("/api/courses");

    // const courses$ = http$.pipe(map(res => Object.values(res["payload"])));

    // courses$.subscribe(
    //   courses => {
    //     console.log(courses);
    //     this.beginnerCourses = courses.filter(
    //       course => course.category == "BEGINNER"
    //     );
    //     this.advanceCourses = courses.filter(
    //       course => course.category == "ADVANCED"
    //     );
    //   },
    //   noop,
    //   () => console.log("completed")
    // );

    // PART 2
    const http$: Observable<Course[]> = createHttpObserable("/api/courses");

    const courses$ = http$.pipe(map(res => Object.values(res["payload"])));

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
