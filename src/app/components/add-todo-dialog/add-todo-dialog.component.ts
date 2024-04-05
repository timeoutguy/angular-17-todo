import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodosStore } from '../../stores/todos.store';
import { DialogRef } from '@angular/cdk/dialog';

export type AddTodoDialogData = {
  title: FormControl<string>;
  description: FormControl<string>;
}

@Component({
  selector: 'app-add-todo-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
  ],
  templateUrl: './add-todo-dialog.component.html',
  styleUrl: './add-todo-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTodoDialogComponent {
  readonly store = inject(TodosStore);
  public dialogRef = inject(DialogRef);

  public todoFormGroup = new FormGroup<AddTodoDialogData >({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required]}),
    description: new FormControl('', { nonNullable: true , validators: [Validators.required]}),
  })

  public saveTodo() {
    if(this.todoFormGroup.valid) {
      this.store.addTodo({
        title: this.todoFormGroup.get('title')?.value,
        description: this.todoFormGroup.get('description')?.value,
      })

      this.dialogRef.close();
    }
  }
}
