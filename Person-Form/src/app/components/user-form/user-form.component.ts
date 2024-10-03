import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
 
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
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
  message: string = '';
  isSuccess: boolean = false;
 
  constructor(private dataService: DataService) {}
 
  // Validar solo letras y espacios
  validateName(event: any) {
    const input = event.target.value;
    event.target.value = input.replace(/[^a-zA-ZÀ-ÿ\s]/g, ''); // Eliminar todo lo que no sea letra o espacio
  }
 
  validateLastName(event: any) {
    const input = event.target.value;
    event.target.value = input.replace(/[^a-zA-ZÀ-ÿ\s]/g, ''); // Eliminar todo lo que no sea letra o espacio
  }
 
  // Validar si los campos de nombre y apellido contienen solo letras y espacios
  isValidName(name: string): boolean {
    return /^[a-zA-ZÀ-ÿ\s]+$/.test(name); // Expresión regular para letras y espacios
  }
 
  onSubmit() {
    // Verificamos si los campos contienen solo letras y espacios
    if (!this.isValidName(this.user.nombre)) {
      this.message = 'El nombre contiene caracteres inválidos.';
      this.isSuccess = false;
      return;
    }
 
    if (!this.isValidName(this.user.apellido)) {
      this.message = 'El apellido contiene caracteres inválidos.';
      this.isSuccess = false;
      return;
    }
 
    // Verificamos si todos los campos están completos
    if (this.user.nombre && this.user.apellido && this.user.edad && this.user.correo && this.user.telefono && this.user.direccion) {
      // Todos los datos están completos, enviamos al servidor
      this.dataService.addUser(this.user).subscribe(
        (response: any) => {
          console.log('Usuario creado:', response);
          this.message = 'Los datos se guardaron correctamente.';
          this.isSuccess = true;
          // Aquí puedes reiniciar el formulario o hacer otras acciones
        },
        (error) => {
          console.error('Error al crear el usuario:', error);
          this.message = 'Ha ocurrido un error al guardar los datos.';
          this.isSuccess = false;
        }
      );
    } else {
      // Datos faltantes
      this.message = 'Por favor, complete todos los campos requeridos.';
      this.isSuccess = false;
    }
  }
}