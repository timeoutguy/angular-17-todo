import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private userService = inject(UserService);

  public registerFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  public checkIfPasswordsMatch(): boolean {
    return this.registerFormGroup.get('password')?.value === this.registerFormGroup.get('confirmPassword')?.value;
  }

  public checkIfFieldHaserror(fieldName: string): boolean {
    const field = this.registerFormGroup.get(fieldName);
    return field?.invalid && field?.touched ? true : false;
  }

  public onSubmit(): void {
    if(this.registerFormGroup.valid && this.checkIfPasswordsMatch()) {
      this.userService.register(this.registerFormGroup.value).subscribe((response) => {

      });
    }
  }
}
