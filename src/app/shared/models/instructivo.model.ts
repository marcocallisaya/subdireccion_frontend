import {Funcionario} from './funcionario.model';

export interface Instructivo {
    id: number;
    destinatario: string;
    referencia: string;
    url: string;
    estado: string;
    estado_publicacion: string;
    publicacion: string;
    created_at: Date;
    updated_at: Date;
    funcionario_id: number;
    funcionario: Funcionario;

}

export interface ListaInstructivo {
    current_page: number;
    data: Instructivo[];
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