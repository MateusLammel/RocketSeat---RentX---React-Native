export interface CarDTO {
  about: string;
  accessories: {
    id: string;
    type: string;
    name: string;
  }[];
  brand: string;
  fuel_type: string;
  id: string;
  name: string;
  photos: { id: string; photo: string }[];

  period: string;
  price: number;

  thumbnail: string;
}
