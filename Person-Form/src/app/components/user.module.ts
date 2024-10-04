// user.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Importar ReactiveFormsModule
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbModule para usar los modales
import { UserListComponent } from './user-list/user-list.component'; // Asegúrate de que la ruta sea correcta

@NgModule({
  declarations: [
    UserListComponent, // Declare UserListComponent
  ],
  imports: [
    CommonModule, // Necesario para directivas comunes
    ReactiveFormsModule, // Asegúrate de incluir esto
    NgbModule, // Para usar NgbModal
  ],
  exports: [
    UserListComponent, // Exporta si lo vas a utilizar en otros módulos
  ]
})
export class UserModule {}
