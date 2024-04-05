import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TodosComponent } from './components/todos/todos.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TodosStore } from './stores/todos.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, TodosComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [TodosStore],
})
export class AppComponent implements OnInit {
  readonly store = inject(TodosStore)
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
}
