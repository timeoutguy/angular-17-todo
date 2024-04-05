import { Component, ComponentRef, OnInit, ViewChild, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TodosComponent } from './components/todos/todos.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TodosStore } from './stores/todos.store';
import { AddTodoDialogComponent } from './components/add-todo-dialog/add-todo-dialog.component';
import { Dialog, DialogModule } from '@angular/cdk/dialog'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, TodosComponent, ReactiveFormsModule, AddTodoDialogComponent, DialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  readonly store = inject(TodosStore);
  readonly dialog = inject (Dialog);
  public filterFormControl = new FormControl<'all' | 'active' | 'completed'>(this.store.filter());

  ngOnInit(): void {
    this.changeFilterOnStore();
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
