package com.BOUARGALNE.digital.banking.dtos;

import lombok.Data;

import java.util.List;

@Data
public class BankAccountsDTO {

    List<BankAccountDTO> bankAccountDTOS;
    int totalPage;
}
