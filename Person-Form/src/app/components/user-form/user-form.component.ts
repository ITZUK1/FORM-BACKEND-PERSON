import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
})
export class UserFormComponent {
  user: any = {
    nombre: '',
    apellido: '',
    edad: null,
    correo: '',
    telefono: '',
    direccion: ''
  };

  constructor(private dataService: DataService) {}

  onSubmit() {
    this.dataService.addUser(this.user).subscribe((response: any) => {
      console.log('Usuario creado:', response);
      // Aquí puedes reiniciar el formulario o hacer otras acciones
    });
  }
}
