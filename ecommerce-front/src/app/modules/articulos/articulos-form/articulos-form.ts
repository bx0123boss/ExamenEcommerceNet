import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Articulo } from '../../../models/articulo';
import { ArticuloService } from '../../../core/services/articulo.service';
import { CommonModule } from '@angular/common';
import { TiendaService } from '../../../core/services/tiendas.service';
import { Tienda } from '../../../models/tienda';

@Component({
  selector: 'app-articulos-form',
  standalone: true,
  templateUrl: './articulos-form.html',
  styleUrl: './articulos-form.css',
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
})
export class ArticulosForm implements OnInit {
  form: FormGroup;
  isEdit = false;
  articuloId: number | null = null;
  loading = false;
  tiendas = signal<Tienda[]>([]);
  selectedTiendaId = signal<number | null>(null);
  constructor(
    private fb: FormBuilder,
    private articuloService: ArticuloService,
    private tiendasService: TiendaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      codigo: ['', [Validators.required, Validators.maxLength(20)]],
      descripcion: ['', [Validators.required, Validators.maxLength(200)]],
      precio: [0, [Validators.required, Validators.min(0.01)]],
      imagen: ['', [Validators.required, Validators.pattern('https?://.+')]],
      stock: [0, [Validators.required, Validators.min(0)]],
      tiendaId: [null, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.loadTiendas();
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEdit = true;
        this.articuloId = +params['id'];
        this.loadArticle(this.articuloId);
      }
    });
  }
  loadTiendas() {
    this.tiendasService.getTiendas().subscribe({
      next: (data) => {
        this.tiendas.set(data);
      },
      error: (err) => {},
    });
  }
  onTiendaChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedTiendaId.set(value ? Number(value) : null);
  }
  loadArticle(id: number): void {
    this.loading = true;
    this.articuloService.getArticulos().subscribe({
      next: (articulos) => {
        const articulo = articulos.find((c) => c.id === id);
        if (articulo) {
          this.form.patchValue(articulo);
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
      if (!this.selectedTiendaId()) {
        alert('Selecciona una tienda');
        return;
      }
      this.loading = true;
      const articulo: Articulo = this.form.value;
      console.log(articulo);
      const operation =
        this.isEdit && this.articuloId
          ? this.articuloService.updateArticulo({
              ...articulo,
              id: this.articuloId,
            })
          : this.articuloService.createArticulo(articulo);

      operation.subscribe({
        next: () => {
          this.router.navigate(['/articulos']);
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
    this.router.navigate(['/articulos']);
  }

  private markAllAsTouched(): void {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}
