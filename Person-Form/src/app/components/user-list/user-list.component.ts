import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styles: [`
    .button-container {
      display: flex;
      justify-content: space-between;
    }
  `]
})

export class UserListComponent implements OnInit {
  users: any[] = [];  // Lista de usuarios
  selectedUser: any = {}; // Usuario seleccionado para editar
  userForm: FormGroup;  // Formulario para los usuarios

  constructor(
    private dataService: DataService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    // Inicializar el formulario reactivo
    this.userForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(1)]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{7,10}$/)]], // Teléfono entre 7 y 10 dígitos
      direccion: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadUsers(); // Carga los usuarios al iniciar el componente
  }

  loadUsers() {
    // Obtiene los usuarios a través del servicio
    this.dataService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  deleteUser(id: number) {
    // Eliminar usuario
    this.dataService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
    });
  }

  openEditModal(user: any, content: any) {
    // Abre el modal para editar usuario
    this.selectedUser = { ...user };
    this.userForm.setValue({
      nombre: this.selectedUser.nombre,
      apellido: this.selectedUser.apellido,
      edad: this.selectedUser.edad,
      correo: this.selectedUser.correo,
      telefono: this.selectedUser.telefono,
      direccion: this.selectedUser.direccion
    });
    this.modalService.open(content); // Abre el contenido del modal
  }

  onSubmit() {
    // Maneja el envío del formulario
    if (this.userForm.valid) {
      this.dataService.updateUser(this.selectedUser.id, this.userForm.value).subscribe(() => {
        const index = this.users.findIndex(user => user.id === this.selectedUser.id);
        if (index !== -1) {
          this.users[index] = { ...this.selectedUser, ...this.userForm.value };
        }
        this.modalService.dismissAll(); // Cierra el modal al finalizar
      });
    }
  }
}
