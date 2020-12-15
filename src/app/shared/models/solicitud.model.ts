import { CentroFormacion } from './centro_formacion.model';
import { Solicitante } from './solicitante.model';
import { Tramite } from './tramite.model';

export interface Solicitud {
    id: number;
    created_at: Date;
    tramite_id: number;
    solicitante_id: number;
    centro_formacion_id: number;
    tramite: Tramite;
    ingreso: Date;
    solicitante: Solicitante;
    centro_formacion: CentroFormacion;

}

export interface ListaSolicitud{
    current_page: number;
    data: Solicitud[];
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
