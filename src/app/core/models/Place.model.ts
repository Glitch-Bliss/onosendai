export interface Place {
  id: string;
  userId: string;
  name: string;
  description?: string;
  imageUrl?: URL;
  events: Event[];
}