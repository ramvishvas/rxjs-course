import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { interval, timer, fromEvent, Observable, noop } from "rxjs";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"]
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    // Understing about stream;
    // document.addEventListener("click", event => {
    //   console.log(event);
    //   setTimeout(() => {
    //     let counter = 0;
    //     setInterval(() => {
    //       console.log(counter);
    //       counter++;
    //     }, 1000);
    //   }, 3000);
    // });
    // const interval$ = interval(1000);
    // interval$.subscribe(val => {
    //   console.log("stream 1 " + val);
    // });
    // interval$.subscribe(val => {
    //   console.log("stream 2 " + val);
    // });
    // const interval$ = timer(3000, 1000);
    // const sub = interval$.subscribe(val => {
    //   console.log("stream 1 " + val);
    // });
    // setTimeout(() => sub.unsubscribe(), 5000)
    // const click$ = fromEvent(document, "click");
    // click$.subscribe(
    //   event => {
    //     console.log(event);
    //   },
    //   err => {
    //     console.error(err);
    //   },
    //   () => {
    //     console.log("completed");
    //   }
    // );

    // fetch("/api/courses")
    //   .then(data => {
    //     console.log(data);
    //   })
    //   .catch(err => {
    //     console.error();
    //   });

    // fetch("/api/courses")
    //   .then(data => {
    //     console.log(data.json());
    //   })
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });

    const http$ = Observable.create(observer => {
      fetch("/api/courses")
        .then(res => {
          // console.log(res);
          return res.json();
        })
        .then(body => {
          observer.next(body);
          observer.complete();
        })
        .catch(err => {
          // console.error(err);
          observer.error(err);
        });
    });

    // http$.subscribe(
    //   courses => console.log(courses),
    //   err => {
    //     console.error(err);
    //   },
    //   () => console.log("completed")
    // );

    http$.subscribe(
      courses => console.log(courses),
      noop,
      () => console.log("completed")
    );
  }
}
