export interface Funcionario {
    id: number;
    nombre: string;
    apellido: string;
    cargo: string;
    fecha_nacimiento: Date;
    genero: string;
    telefono: string;
    estado: string;
    created_at: Date;

}

export interface ListaFuncionario {
    current_page: number;
    data: Funcionario[];
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
