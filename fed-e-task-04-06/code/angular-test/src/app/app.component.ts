import { selectTodos } from './store/selector/todo.selectors';
import { addTodo, deleteTodo, deleteTodos } from './store/actions/todo.actions';
import { AppState } from './store/index';
// import {
//   animate,
//   group,
//   query,
//   style,
//   transition,
//   trigger
// } from "@angular/animations"
import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core"
// import { RouterOutlet } from "@angular/router"
import { Store } from '@ngrx/store';
import { fromEvent, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Todo } from './store/reducers/todo.reducer';
import { select } from '@ngrx/store';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styles: [],
  // animations: [
  //   trigger("routerAnimation", [
  //     transition("one => two, one => three, two => three", [
  //       query(":enter", style({ transform: "translateX(100%)", opacity: 0 })),
  //       group([
  //         query(
  //           ":enter",
  //           animate(
  //             "0.4s ease-in",
  //             style({ transform: "translateX(0)", opacity: 1 })
  //           )
  //         ),
  //         query(
  //           ":leave",
  //           animate(
  //             "0.4s ease-out",
  //             style({ transform: "translateX(-100%)", opacity: 0 })
  //           )
  //         )
  //       ])
  //     ]),
  //     transition("three => two, three => one, two => one", [
  //       query(
  //         ":enter",
  //         style({ transform: "translateX(-100%)", opacity: 0 })
  //       ),
  //       group([
  //         query(
  //           ":enter",
  //           animate(
  //             "0.4s ease-in",
  //             style({ transform: "translateX(0)", opacity: 1 })
  //           )
  //         ),
  //         query(
  //           ":leave",
  //           animate(
  //             "0.4s ease-out",
  //             style({ transform: "translateX(100%)", opacity: 0 })
  //           )
  //         )
  //       ])
  //     ])
  //   ])
  // ]
})
export class AppComponent implements AfterViewInit{
  @ViewChild('AddTodoInput') AddTodoInput!: ElementRef;
  todos: Observable<Todo[]>;
  checkeds: string[] = [];
  constructor(private store: Store<AppState>) {
    this.todos = this.store.pipe(select(selectTodos))
  }
  ngAfterViewInit(): void {
    fromEvent<KeyboardEvent>(
      this.AddTodoInput.nativeElement,
      'keyup'
      ).pipe(
        filter(event => event.key === 'Enter'),
        map(event => (<HTMLInputElement>event.target).value),
        map(title => title.trim()),
        filter(title => title !== ''),
      ).subscribe((title) => {
        this.store.dispatch(addTodo({title}));
        this.AddTodoInput.nativeElement.value = ''
    })
  }
  deleteTodo(id: string) {
    this.store.dispatch(deleteTodo({id}));
  }
  deleteTodos() {
    this.store.dispatch(deleteTodos({ids: this.checkeds}))
  }
  changeInput(id: string) {
    const index = this.checkeds.findIndex(check => check === id);
    if (index > -1) {
      this.checkeds.splice(index, 1);
    } else {
      this.checkeds.push(id);
    }
  }
  // prepare(outlet: RouterOutlet) {
  //   if (
  //     outlet &&
  //     outlet.activatedRouteData &&
  //     outlet.activatedRouteData.animation
  //   ) {
  //     return outlet.activatedRouteData.animation
  //   }
  // }
}
