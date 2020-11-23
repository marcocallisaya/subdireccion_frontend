export interface Rol {

    id: number;
    nombre: string;
    descripcion: string;
    estado: string;
    created_at: Date;
}

export interface ListaRol {
    current_page: number;
    data: Rol[];
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
