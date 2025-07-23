import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../core/services/cliente.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clientes-form',
  standalone: true,
  templateUrl: './clientes-form.html',
  styleUrl: './clientes-form.css',
  imports: [ReactiveFormsModule, RouterModule, CommonModule, FormsModule],
})
export class ClientesForm implements OnInit {
  form: FormGroup;
  isEdit = false;
  clienteId: number | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      direccion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEdit = true;
        this.clienteId = +params['id'];
        this.loadCliente(this.clienteId);
      }
    });
  }

  loadCliente(id: number): void {
    this.loading = true;
    this.clienteService.getClientes().subscribe({
      next: (clientes) => {
        const cliente = clientes.find((c) => c.id === id);
        if (cliente) {
          this.form.patchValue(cliente);
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.loading = true;
      const cliente: Cliente = this.form.value;

      const operation =
        this.isEdit && this.clienteId
          ? this.clienteService.updateCliente({
              ...cliente,
              id: this.clienteId,
            })
          : this.clienteService.createCliente(cliente);

      operation.subscribe({
        next: () => {
          this.router.navigate(['/clientes']);
        },
        error: () => {
          this.loading = false;
        },
      });
    }
  }
  onCancel(): void {
    this.router.navigate(['/clientes']);
  }
}
