
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Todo } from "../models/todo.model";
import { computed, effect } from "@angular/core";

type TodosState = {
  todos: Todo[];
  isLoading: boolean;
  filter: "all" | "completed" | "active";
}

const initialState: TodosState = {
  todos: [
    { id: 1, title: "Learn Angular", text: 'I need to learn more about angular', completed: true },
    { id: 2, title: "Learn NgRx", text: 'I need to learn more about NgRx', completed: false },
    { id: 3, title: "Learn RxJS", text: 'I need to learn more about RxJS', completed: false },
  ],
  isLoading: false,
  filter: "all"
}

export const TodosStore = signalStore(
  withState(initialState),
  withComputed(({ todos, filter}) => ({
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
  withMethods((store) => ({
    updateFilter(filter: "all" | "completed" | "active"): void {
      patchState(store, { filter })
    }
  })
  )
)
