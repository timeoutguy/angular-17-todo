import { Component, inject } from '@angular/core';
import { TodosStore } from '../../stores/todos.store';
import { Dialog } from '@angular/cdk/dialog';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AddTodoDialogComponent } from '../../components/add-todo-dialog/add-todo-dialog.component';
import { CommonModule } from '@angular/common';
import { TodosComponent } from '../../components/todos/todos.component';
import { UserStore } from '../../stores/user.store';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TodosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: []
})
export class HomeComponent {
  readonly store = inject(TodosStore);
  readonly userStore = inject(UserStore);
  readonly dialog = inject (Dialog);
  private storageService = inject(StorageService);
  private router = inject(Router);
  public filterFormControl = new FormControl<'all' | 'active' | 'completed'>(this.store.filter());

  ngOnInit(): void {
    if(!this.storageService.getUser()) {
      this.router.navigate(['/login'])
    }
    this.changeFilterOnStore();
    this.store.getTodoByUserId(this.userStore.user.id);
  }
  private changeFilterOnStore() {
    this.filterFormControl.valueChanges.subscribe((value) => {
      if(value) this.store.updateFilter(value);
    });
  }
  title = 'todo-list';

  constructor() {}

  openAddTodoDialog() {
    const addTodoDialogRef = this.dialog.open(AddTodoDialogComponent);
  }
}
