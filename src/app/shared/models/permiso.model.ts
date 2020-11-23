export interface Permiso {
    id: number;
    nombre: string;
    descripcion: string;
    tipo: string;
    alias: string;
    created_at: Date;
}

export interface ListaPermiso {
  current_page: number;
  data: Permiso[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}