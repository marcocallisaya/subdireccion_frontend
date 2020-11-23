import { Estante } from './estante.model';

export interface Ubicacion {

    id: number;
    codigo: string;
    disponibilidad: string;
    color: string;
    estado: string;
    created_at: Date;
    estante_id: number;
    estante: Estante;
}

export interface ListaUbicacion {
    current_page: number;
    data: Ubicacion[];
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