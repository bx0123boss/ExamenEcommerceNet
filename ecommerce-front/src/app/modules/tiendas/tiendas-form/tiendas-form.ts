import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Tienda } from '../../../models/tienda';
import { TiendaService } from '../../../core/services/tiendas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tiendas-form',
  standalone: true,
  templateUrl: './tiendas-form.html',
  styleUrls: ['./tiendas-form.css'],
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
})
export class TiendasForm implements OnInit {
  form: FormGroup;
  isEdit = false;
  tiendaId: number | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private tiendaService: TiendaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      sucursal: ['', [Validators.required, Validators.maxLength(100)]],
      direccion: ['', [Validators.required, Validators.maxLength(200)]],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEdit = true;
        this.tiendaId = +params['id'];
        this.loadTienda(this.tiendaId);
      }
    });
  }

  loadTienda(id: number): void {
    this.loading = true;
    this.tiendaService.getTiendas().subscribe({
      next: (tienda) => {
        this.form.patchValue(tienda);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.router.navigate(['/tiendas']);
      },
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.loading = true;
      const tienda: Tienda = this.form.value;

      const operation =
        this.isEdit && this.tiendaId
          ? this.tiendaService.updateTienda({ ...tienda, id: this.tiendaId })
          : this.tiendaService.createTienda(tienda);

      operation.subscribe({
        next: () => {
          this.router.navigate(['/tiendas']);
        },
        error: (err) => {
          console.error('Error:', err);
          this.loading = false;
        },
      });
    } else {
      this.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.router.navigate(['/tiendas']);
  }

  private markAllAsTouched(): void {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}
