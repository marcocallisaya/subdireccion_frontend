export interface Evaluacion {
    id: number;
    estado_evaluacion: string;
    descripcion: string;
    created_at: Date;
    tramite_id: number;
    tramite: any;

}

export interface ListaEvaluacion {
    current_page: number;
    data: Evaluacion[];
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
