import { Component } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-password',
  imports: [InputGroupModule, InputGroupAddonModule, ButtonModule, RouterModule],
  templateUrl: './edit-password.component.html',
  styleUrl: './edit-password.component.scss'
})
export class EditPasswordComponent {

}
