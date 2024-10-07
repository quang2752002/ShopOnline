export interface Product {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  author: string;
  quantity: number ;
  isActive: boolean ;
  img: string;

  // constructor(
  //   id: string,
  //   categoryId: string,
  //   name: string,
  //   description: string,
  //   price: number,
  //   author: string,
  //   quantity: number = 0,
  //   isActive: boolean = true,
  //   img: string
  // ) {
  //   this.id = id;
  //   this.categoryId = categoryId;
  //   this.name = name;
  //   this.description = description;
  //   this.price = price;
  //   this.author = author;
  //   this.quantity = quantity;
  //   this.isActive = isActive;
  //   this.img = img;
  // }
}
