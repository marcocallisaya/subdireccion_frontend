export interface Devolucion {
    id: number;
    estado_documento: string;
    recomendacion: string;
    created_at: Date;
    ingreso: Date;
    tramite_id: number;
    tramite: any;
}

export interface ListaDevolucion {
    current_page: number;
    data: Devolucion[];
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
