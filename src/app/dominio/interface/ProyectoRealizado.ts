export interface ProyectoRealizado {
  id: number;
  tipo: 'video' | 'imagen';
  archivo: string;
  poster?: string;
  categoriaKey: string;
  tituloKey: string;
  descKey: string;
}