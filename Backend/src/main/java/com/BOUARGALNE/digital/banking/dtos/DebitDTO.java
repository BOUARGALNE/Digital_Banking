package com.BOUARGALNE.digital.banking.dtos;


import lombok.Data;

@Data
public class DebitDTO {

    private String accountId ;
    private double amount ;
    private String description ;

}
