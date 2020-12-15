export interface Documento {
    id: number;
    nombre: string;
    codigo: string;
    descripcion: string;
    numero_paginas: number;
    estado: string;
    tipo_documento_id: number;
    ubicacion_id: number;
    tramite_id: number;
    ingreso: Date;
    created_at: Date;
    tipo_documento: any;
    ubicacion: any;
    tramite: any;
}

export interface ListaDocumento {
  current_page: number;
  data: Documento[];
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
