import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserStore } from './stores/user.store';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent  {
  readonly userStore = inject(UserStore);
  readonly storageService = inject(StorageService);

  constructor() {
    if(this.storageService.getUser()) {
      this.userStore.updateUser(this.storageService.getUser());
    }

    if(this.storageService.getToken()) {
      this.userStore.updateToken(this.storageService.getToken());
    }
  }
}
