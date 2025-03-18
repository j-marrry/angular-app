import { Component } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { ToastModule } from 'primeng/toast';
import { User } from '../../models/user';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-add-user',
  imports: [
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    RouterModule,
    FormsModule,
    MessagesModule,
    ToastModule,
    FloatLabelModule,
    DatePickerModule,
    CommonModule,
    CheckboxModule,
  ],
  providers: [MessageService],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent {
  username: string = '';
  password: string = '';
  email: string = '';
  lastname: string = '';
  firstname: string = '';
  middlename: string = '';
  birthdate: Date = new Date();
  userroles: [] = [];

  roles = ['admin', 'user', 'manager'];

  maxDate: Date = new Date();

  constructor(
    private userService: UserService,
    private router: Router,
    private messageService: MessageService
  ) {}

  onSaveUser() {
    const newUser: User = {
      id: Date.now(),
      username: this.username,
      password: this.password,
      email: this.email,
      lastname: this.lastname,
      firstname: this.firstname,
      middlename: this.middlename,
      birthdate: this.birthdate,
      roles: this.userroles,
    };

    this.userService.addUser(newUser);
    this.messageService.add({
      severity: 'success',
      summary: 'Успех',
      detail: 'Пользователь успешно добавлен!',
      sticky: true,
    });
  }
  onInputChange(event: any) {
    const inputValue = event.target.value;
    if (inputValue.trim() !== '') {
      event.target.classList.add('p-filled');
    } else {
      event.target.classList.remove('p-filled');
    }
  }

  usersRedirect() {
    this.router.navigate(['/users']);
  }
}
