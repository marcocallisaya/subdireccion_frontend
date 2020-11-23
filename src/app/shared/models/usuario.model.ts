export interface Usuario {
    id: number;
    usuario: string;
    contrasena: string;
    estado: string;
    created_at: Date;
    rol_id: number;
    funcionario_id: number;
    rol: any;
    funcionario: any;
}

export interface ListaUsuario {
  current_page: number;
  data: Usuario[];
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
