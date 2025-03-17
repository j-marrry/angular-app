import { Component } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { ToastModule } from 'primeng/toast';
import { User } from '../../models/user';

@Component({
  selector: 'app-add-user',
  imports: [InputGroupModule, InputGroupAddonModule, ButtonModule, RouterModule, FormsModule, MessagesModule, ToastModule],
  providers: [MessageService],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  
}
