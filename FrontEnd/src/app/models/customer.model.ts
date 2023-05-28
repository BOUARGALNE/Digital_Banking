export  interface  Customer{
  id: number;
  name: string;
  email: string ;
}

export interface CustomerDTOS {
  customerDTO: Customer[];
  totalpage: number;
}
