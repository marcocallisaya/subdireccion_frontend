export interface Bitacora {
    id: number;
    actividad: string;
    usuario_id: number;
    created_at: Date;
    usuario: any;
}

export interface ListaBitacora {
  current_page: number;
  data: Bitacora[];
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