import {Funcionario} from './funcionario.model';

export interface Convocatoria {
    id: number;
    fecha_limite: Date;
    referencia: string;
    url: string;
    estado: string;
    estado_publicacion: string;
    created_at: Date;
    updated_at: Date;
    funcionario_id: number;
    funcionario: Funcionario;

}

export interface ListaConvocatoria {
    current_page: number;
    data: Convocatoria[];
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