export interface Tramite {

    id: number;
    tramite_estado: string;
    referencia: string;
    codigo: string;
    fecha_limite: Date;
    dias_Restante: number;
    tipo_tramite_id: number;
    created_at: Date;
    tipo_tramite: any;
}

export interface ListaTramite {
  current_page: number;
  data: Tramite[];
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
