
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Todo } from "../models/todo.model";
import { computed } from "@angular/core";

type TodosState = {
  todos: Todo[];
  isLoading: boolean;
  filter: "all" | "completed" | "active";
}

const initialState: TodosState = {
  todos: [
    { id: crypto.randomUUID(), title: "Learn Angular", description: 'I need to learn more about angular', completed: true },
    { id: crypto.randomUUID(), title: "Learn NgRx", description: 'I need to learn more about NgRx', completed: false },
    { id: crypto.randomUUID(), title: "Learn RxJS", description: 'I need to learn more about RxJS', completed: false },
  ],
  isLoading: false,
  filter: "all"
}

export const TodosStore = signalStore(
  {providedIn: 'root'},
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
    }
  })
  )
)
