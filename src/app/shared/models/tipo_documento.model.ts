export interface TipoDocumento {

    id: number;
    nombre: string;
    descripcion: string;
    codigo: string;
    estado: string;

}

export interface ListaTipoDocumento {
    current_page: number;
    data: TipoDocumento[];
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

