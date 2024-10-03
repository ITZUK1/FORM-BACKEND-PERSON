import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Importar ReactiveFormsModule
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule, // Asegúrate de incluir esto aquí también
  ]
})
export class UserModule { }
