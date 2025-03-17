import { Component } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  imports: [ InputGroupAddonModule, InputGroupModule, ButtonModule, RouterModule, FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {
  username: string='';
  email: string='';
  lastname: string='';
  firstname: string='';
  middlename: string='';
onSaveChanges() {

}

}
