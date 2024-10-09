
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Importar ReactiveFormsModule
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbModule para usar los modales
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  declarations: [
    UserListComponent, // Declare UserListComponent
  ],
  imports: [
    CommonModule, // Necesario para directivas comunes
    ReactiveFormsModule, 
    NgbModule, // Para usar NgbModal
  ],
  exports: [
    UserListComponent, 
  ]
})
export class UserModule {}
