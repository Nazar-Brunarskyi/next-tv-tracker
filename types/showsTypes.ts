export interface IShow {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

export interface ICreateShow extends Omit<IShow, 'id'> { }