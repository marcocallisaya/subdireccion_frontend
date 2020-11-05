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
    created_at: Date;
    tipo_documento: any;
    ubicacion: any;
    tramite: any;
}
