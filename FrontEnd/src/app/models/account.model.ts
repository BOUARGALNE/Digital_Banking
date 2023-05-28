import {Customer} from "./customer.model";
import { accountOperationDTOList } from "./operation.model";
export { accountOperationDTOList } from "./operation.model";

export interface AccountDetails {
  accountId:               string;
  balance:                 number;
  currentPage:             number;
  totalPages:              number;
  pageSize:                number;
  accountOperationDTOList: accountOperationDTOList[];
}

export interface BankAccountDTO {
  id: string;
  balance: number;
  createdAt?: any;
  status?: any;
  customerDTO: Customer;
  overDraft: number;
  type: string;
  interestRate: number;
}

export interface BankAccountDTOS {
  bankAccountDTOS: BankAccountDTO[];
  totalPage: number;
}


