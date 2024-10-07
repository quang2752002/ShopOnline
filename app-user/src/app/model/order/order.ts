export interface Order {
  id: string;
  fullName:string;
  userId: string;
  orderDate: Date;
  paymentMethod: string;
  isActive: string;
  name: string;
  description: string;
  address: string;
  phoneNumber: string;
  total: number;
}
