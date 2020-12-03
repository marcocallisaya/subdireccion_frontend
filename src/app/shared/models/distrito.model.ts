export interface Distrito {
    id: number;
    nombre: string;
    direccion: string;
    ciudad: string;
    telefono: string;
    estado: string;
    created_at: Date;
}

export interface ListaDistrito {
  current_page: number;
  data: Distrito[];
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