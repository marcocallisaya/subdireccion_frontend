export interface Estante {
    id: number;
    codigo: string;
    material: string;
    created_at: Date;
    estado: string;
    altura: string;
    ancho: string;
    color: string;
}

export interface ListaEstante {
    current_page: number;
    data: Estante[];
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
