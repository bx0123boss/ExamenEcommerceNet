export interface Articulo {
  id?: number;
  codigo: string;
  descripcion: string;
  precio: number;
  imagen: string;
  stock: number;
  tiendaId: number;
}
