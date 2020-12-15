export interface Derivacion {
    id: number;
    created_at: Date;
    tramite_id: number;
    funcionario_id: number;
    tramite: any;
    ingreso: Date;
    funcionario: any;

}

export interface ListaDerivacion{
    current_page: number;
    data: Derivacion[];
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
