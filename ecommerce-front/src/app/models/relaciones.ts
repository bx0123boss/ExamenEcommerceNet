export interface ArticuloTienda {
  id?: number;
  articuloId: number;
  tiendaId: number;
  fecha: Date;
}

export interface ClienteArticulo {
  id?: number;
  clienteId: number;
  articuloId: number;
  fecha: Date;
}