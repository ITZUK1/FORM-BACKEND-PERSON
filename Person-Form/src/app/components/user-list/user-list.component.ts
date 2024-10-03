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
  users: any[] = [];
  selectedUser: any = {};
  userForm: FormGroup;

  constructor(private dataService: DataService, private modalService: NgbModal, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(1)]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{7,10}$/)]], // Asegurando que el teléfono tenga entre 7 y 10 dígitos
      direccion: ['', Validators.required]
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
    this.userForm.setValue({
      nombre: this.selectedUser.nombre,
      apellido: this.selectedUser.apellido,
      edad: this.selectedUser.edad,
      correo: this.selectedUser.correo,
      telefono: this.selectedUser.telefono,
      direccion: this.selectedUser.direccion
    });
    this.modalService.open(content);
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.dataService.updateUser(this.selectedUser.id, this.userForm.value).subscribe(() => {
        const index = this.users.findIndex(user => user.id === this.selectedUser.id);
        if (index !== -1) {
          this.users[index] = { ...this.selectedUser, ...this.userForm.value };
        }
        this.modalService.dismissAll();
      });
    }
  }
}
