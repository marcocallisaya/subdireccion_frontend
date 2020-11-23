import { TipoSolicitante } from './tipo_solicitante.model';

export interface Solicitante {
    id: number;
    nombre: string;
    apellido: string;
    telefono: string;
    ci: string;
    estado: string;
    created_at: Date;
    tipo_solicitante_id: number;
    tipo_solicitante: TipoSolicitante;
}

export interface ListaSolicitante {
  current_page: number;
  data: Solicitante[];
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
