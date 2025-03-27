import { Component } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { UserService } from '../../services/user.service';
import { ToastModule } from 'primeng/toast';
import { User } from '../../models/user';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-edit-user',
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
    TranslocoModule
  ],
  providers: [MessageService],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
})
export class EditUserComponent {
  id!: number;
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
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private messageService: MessageService,
    private translocoService: TranslocoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.userService.getUserById(this.id).subscribe(user => {
        if (user) {
          this.username = user.username;
          this.email = user.email;
          this.lastname = user.lastname;
          this.firstname = user.firstname;
          this.middlename = user.middlename;
          this.birthdate = new Date(user.birthdate);
          this.userroles = user.roles || [];
        }
      });
    });
  }

  onSaveChanges() {
    this.userService.getUserById(this.id).pipe(
      switchMap(user => {
        if (user?.password) {
          this.password = user.password;
        }
  
        const updatedUser: any = {
          id: this.id,
          username: this.username,
          password: this.password,
          email: this.email,
          lastname: this.lastname,
          firstname: this.firstname,
          patronymic: this.middlename,
          birthday: this.birthdate,
          roles: this.userroles
        };
  
        return this.userService.updateUser(updatedUser);
      })
    ).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: this.translocoService.translate('msgSuccess'),
        detail: this.translocoService.translate('msgUserUpdate'),
        sticky: true
      });
    });
  }  
}
