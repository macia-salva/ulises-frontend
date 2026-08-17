import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/Shared/services/message.service';
import { LocalStorageService } from 'src/app/Shared/services/local-storage.service';
import { AuthService } from '../../services/auth.service';
import { LoginDTO } from '../../models/login.dto';
import { AuthDTO } from '../../models/auth.dto';
import { AuthStorageService } from 'src/app/Shared/services/auth-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  username: FormControl;
  password: FormControl;
  loginForm: FormGroup;
  device_number: number | null;
  isValidating: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private localStorageService: LocalStorageService,
    private authStorageService: AuthStorageService,
    private authService: AuthService
  ) {
    this.isValidating = false;

    this.device_number = this.localStorageService.get('device_number');

    this.username = new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]);

    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]);

    this.loginForm = this.formBuilder.group({
      username: this.username,
      password: this.password,
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {}

  login(): void {
    this.isValidating = true;
    if (!this.loginForm.invalid) {
      this.authService
        .login({ ...this.loginForm.value, device_number: this.device_number })
        .subscribe(
          (auth: AuthDTO) => {
            this.authStorageService.setAuth(auth);
            this.isValidating = false;
            this.router.navigateByUrl('home');
          },
          (error) => {
            this.authStorageService.cleanAuth();
            this.messageService.showHttpResponseError('loginFeedback', error);
            this.isValidating = false;
          }
        );
    }
  }

  hasDevice(): boolean {
    return this.device_number != null;
  }
}
