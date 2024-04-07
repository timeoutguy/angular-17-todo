
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Todo } from "../models/todo.model";
import { computed, inject } from "@angular/core";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { distinctUntilChanged, pipe, switchMap, tap } from "rxjs";
import { TodoService } from "../services/todo.service";
import { tapResponse } from "@ngrx/operators";

type TodosState = {
  todos: Todo[];
  isLoading: boolean;
  filter: "all" | "completed" | "active";
}

const initialState: TodosState = {
  todos: [],
  isLoading: false,
  filter: "all"
}

export const TodosStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ todos, filter }) => ({
    filteredTodos: computed(() => {
      switch (filter()) {
        case "completed":
          return todos().filter((todo) => todo.completed);
        case "active":
          return todos().filter((todo) => !todo.completed);
        default:
          return todos();
      }
    })

  })),
  withMethods((store, todoService = inject(TodoService)) => ({
    updateFilter(filter: "all" | "completed" | "active"): void {
      patchState(store, { filter })
    },
    markAllAsCompleted(): void {
      patchState(store, { todos: store.todos().map(todo => ({ ...todo, completed: true })) })
    },
    deleteTodoById(id: string): void {
      patchState(store, { todos: store.todos().filter(todo => todo.id !== id) })
    },
    toggleTodoById(id: string): void {
      patchState(store, { todos: store.todos().map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo) })
    },
    addTodo(todo: Partial<Todo>): void {

      const todoToAdd = { id: crypto.randomUUID(), ...todo, completed: false } as Todo;

      patchState(store, { todos: [...store.todos(), todoToAdd] })
    },
    getTodoByUserId: rxMethod<any>(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap((userId: number) => {
          return todoService.getTodoByUserId().pipe(
            tapResponse({
              next: ({ data }) => {
                patchState(store, { todos: data })
              },
              error: console.error,
              finalize: () => patchState(store, { isLoading: false })
            })
          )
        }),
      )
    )
  })
  )
)
