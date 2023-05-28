package com.BOUARGALNE.digital.banking.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Data
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("SA")
@Entity
public class SavingAccount extends BankAccount{
    private double interestRate;
}
