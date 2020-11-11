export interface CentroFormacion {
    id: number;
    nombre: string;
    sie: string;
    turno: string;
    latitud: string;
    longitud: string;
    direccion: string;
    telefono: string;
    estado: string;
    created_at: Date;
    distrito_id: number;
    distrito: any;
}

export interface ListaCentroFormacion {
  current_page: number;
  data: CentroFormacion[];
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