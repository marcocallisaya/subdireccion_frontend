export interface Solicitud {
    id: number;
    created_at: Date;
    tramite_id: number;
    solicitante_id: number;
    centro_formacion_id: number;
    tramite: any;
    solicitante: any;
    centro_formacion: any;

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
