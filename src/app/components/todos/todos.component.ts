import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TodosStore } from '../../stores/todos.store';
import { TodoCardComponent } from '../todo-card/todo-card.component';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule, TodoCardComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent {
  readonly store = inject(TodosStore);
}
