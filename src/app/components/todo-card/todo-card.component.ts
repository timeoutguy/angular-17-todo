import { Component, Input, inject } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { octCheck, octPencil, octX } from '@ng-icons/octicons';
import { Todo } from '../../models/todo.model';
import { TodosStore } from '../../stores/todos.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [NgIconComponent, CommonModule],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss',
  viewProviders: [provideIcons({ octX, octPencil, octCheck})]
})
export class TodoCardComponent {
  @Input() todo!: Todo;

  readonly store = inject(TodosStore);
}
