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
  shareReplay
} from "rxjs/operators";
import { merge, fromEvent, Observable, concat } from "rxjs";
import { Lesson } from "../model/lesson";
import { createHttpObserable } from "../common/util";

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

    this.course$ = createHttpObserable(`/api/courses/${this.courseId}`);

    // this.lessons$ = this.loadLessons();
  }

  ngAfterViewInit() {
    const searchLesson$ = fromEvent<any>(
      this.input.nativeElement,
      "keyup"
    ).pipe(
      map(event => event.target.value),
      debounceTime(400), // get value in interval of 400ms
      distinctUntilChanged(), // remove duplicate value
      // concatMap(search => this.loadLessons(search)) // this will not meet upto mark
      switchMap(search => this.loadLessons(search))
    );

    const initialLesson$ = this.loadLessons();

    this.lessons$ = concat(initialLesson$, searchLesson$);
  }

  loadLessons(search = ""): Observable<Lesson[]> {
    return createHttpObserable(
      `/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`
    ).pipe(map(res => res["payload"]));
  }
}
