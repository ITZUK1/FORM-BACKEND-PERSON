import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';

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
  users: any[] = [];
  selectedUser: any = {};
  userForm: FormGroup; // FormGroup para el formulario

  constructor(private dataService: DataService, private modalService: NgbModal, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      nombre: [''],
      apellido: [''],
      edad: [''],
      correo: ['']
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.dataService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  deleteUser(id: number) {
    this.dataService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
    });
  }

  openEditModal(user: any, content: any) {
    this.selectedUser = { ...user };
    // Popula el formulario con los datos del usuario
    this.userForm.setValue({
      nombre: this.selectedUser.nombre,
      apellido: this.selectedUser.apellido,
      edad: this.selectedUser.edad,
      correo: this.selectedUser.correo
    });
    this.modalService.open(content); // Abre el modal
  }

  onSubmit() {
    this.dataService.updateUser(this.selectedUser.id, this.userForm.value).subscribe(() => {
      // Actualizar el usuario en la lista
      const index = this.users.findIndex(user => user.id === this.selectedUser.id);
      if (index !== -1) {
        this.users[index] = { ...this.selectedUser, ...this.userForm.value }; // Actualiza los datos en la lista
      }
      this.modalService.dismissAll(); // Cerrar el modal
    });
  }
}
