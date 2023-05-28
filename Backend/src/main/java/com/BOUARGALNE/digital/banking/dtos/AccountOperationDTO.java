package com.BOUARGALNE.digital.banking.dtos;

import com.BOUARGALNE.digital.banking.enums.OperationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@Data

@AllArgsConstructor
@NoArgsConstructor
public class AccountOperationDTO {
    private Long id ;
    private Date operationDate;
    private double amount;
    private OperationType type;
    private String description;
    private String accountId;


}
