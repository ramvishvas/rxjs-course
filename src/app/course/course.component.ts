import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Course } from "../model/course";
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  map,
  concatMap,
  switchMap,
  withLatestFrom,
  concatAll,
  shareReplay,
  throttle,
  throttleTime
} from "rxjs/operators";
import { merge, fromEvent, Observable, concat, interval } from "rxjs";
import { Lesson } from "../model/lesson";
import { createHttpObserable } from "../common/util";
import { debug, RxJsLoggingLevel } from "../common/debug";

@Component({
  selector: "course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.css"]
})
export class CourseComponent implements OnInit, AfterViewInit {
  courseId: string;
  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;

  @ViewChild("searchInput", { static: true }) input: ElementRef;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.courseId = this.route.snapshot.params["id"];

    this.course$ = createHttpObserable(`/api/courses/${this.courseId}`).pipe(
      debug(RxJsLoggingLevel.INFO, "Course Value ")
    );
  }

  ngAfterViewInit() {
    this.lessons$ = fromEvent<any>(this.input.nativeElement, "keyup").pipe(
      map(event => event.target.value),
      startWith(""),
      debug(RxJsLoggingLevel.TRACE, "Search "),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(search => this.loadLessons(search)),
      debug(RxJsLoggingLevel.DEBUG, "Lessons ")
    );

    // fromEvent<any>(this.input.nativeElement, "keyup")
    //   .pipe(
    //     map(event => event.target.value),
    //     debounceTime(400),
    //     distinctUntilChanged()
    //   )
    //   .subscribe(console.log);

    // fromEvent<any>(this.input.nativeElement, "keyup")
    //   .pipe(
    //     map(event => event.target.value),
    //     throttle(() => interval(500))
    //   )
    //   .subscribe(console.log);

    // fromEvent<any>(this.input.nativeElement, "keyup")
    //   .pipe(
    //     map(event => event.target.value),
    //     throttleTime(500)
    //   )
    //   .subscribe(console.log);
  }

  loadLessons(search = ""): Observable<Lesson[]> {
    return createHttpObserable(
      `/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`
    ).pipe(map(res => res["payload"]));
  }
}
