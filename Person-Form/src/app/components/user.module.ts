
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Importar ReactiveFormsModule
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbModule para usar los modales
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  declarations: [
    UserListComponent, 
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    NgbModule, // Para usar NgbModal
  ],
  exports: [
    UserListComponent, 
  ]
})
export class UserModule {}
