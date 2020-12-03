import {Funcionario} from './funcionario.model';

export interface Circular {
    id: number;
    codigo: string;
    referencia: string;
    url: string;
    estado: string;
    estado_publicacion: string;
    created_at: Date;
    updated_at: Date;
    funcionario_id: number;
    funcionario: Funcionario;

}

export interface ListaCircular {
    current_page: number;
    data: Circular[];
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