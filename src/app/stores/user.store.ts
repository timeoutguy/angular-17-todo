import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { User } from "../models/user.model"
import { inject } from "@angular/core";
import { UserService } from "../services/user.service";
import { distinctUntilChanged, pipe, switchMap, tap } from "rxjs";
import { tapResponse } from "@ngrx/operators";

type UserState = {
  user: User;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: {
    name: '',
    email: '',
    id: 0,
  },
  isLoading: false,
  error: null,
  token: null,
}

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, userService = inject(UserService)) => ({
    login: rxMethod<any>(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap((credentials) => {
          return userService.login(credentials).pipe(
            tapResponse({
              next: ({ data }) => {
                patchState(store, {
                  user: data.user,
                  token: data.token,
                  error: null,
                })
              },
              error: console.error,
              finalize: () => patchState(store, { isLoading: false })
            })
          )
        })
      )
    )
  }))
)
