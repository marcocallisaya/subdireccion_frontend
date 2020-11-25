export interface Carrera {
    id: number;
    nombre: string;
    descripcion: string;
    estado: string;
    created_at: Date;
    pivot: any;
}

export interface ListaCarrera {
  current_page: number;
  data: Carrera[];
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