import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserStore } from '../../stores/user.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  readonly userStore = inject(UserStore);
  private router = inject(Router);

  public loginFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  public checkIfFieldHaserror(fieldName: string): boolean {
    const field = this.loginFormGroup.get(fieldName);
    return field?.invalid && field?.touched ? true : false;
  }

  public onSubmit() {
    this.userStore.login({
      email: this.loginFormGroup.get('email')?.value,
      password: this.loginFormGroup.get('password')?.value,
    })
  }
}
