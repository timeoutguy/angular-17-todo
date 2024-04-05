import { Component, Input } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { octPencil, octX } from '@ng-icons/octicons';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss',
  viewProviders: [provideIcons({ octX, octPencil})]
})
export class TodoCardComponent {
  @Input() todo: Todo | undefined;
}
