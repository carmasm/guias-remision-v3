export interface Remitentes {
    idRemitente: number;
    nombre: string;
    rtn: string;
  }

export interface Destinatarios {
    idDestinatario: number;
    nombre: string;
    rtn: string;
  }

  export interface CentrosdeRecoleccion {
    idCentroRecoleccion: number;
    descripcion: string;
    nombre: string;
    rtn: string;
    ubicacion: string;
  }

  export interface Configuraciones {
    idConfiguracion: number;
    idUsuario: string;
    atributo: string;
    valor: string;
    fechaTransaccion: Date;
  }

  export interface Productos {
    idProducto: number;
    descripcion: string;
    activo: boolean;
  }

  export interface Transportistas {
    idTransportista: number;
    nombre: string;
    rtn: string;
    direccion: string;
    telefono: string;
  }