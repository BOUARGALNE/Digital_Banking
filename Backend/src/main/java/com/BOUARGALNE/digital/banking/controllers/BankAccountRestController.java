package com.BOUARGALNE.digital.banking.controllers;


import com.BOUARGALNE.digital.banking.dtos.*;
import com.BOUARGALNE.digital.banking.exceptions.BalanceNotSufficientException;
import com.BOUARGALNE.digital.banking.exceptions.BankAccountNotFound;
import com.BOUARGALNE.digital.banking.services.BankAccountServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController

@CrossOrigin("*")
public class BankAccountRestController {

    @Autowired
    BankAccountServiceImplementation bankAccountServiceImplementation;

    @PostAuthorize("hasAuthority('ADMIN') or hasAuthority('CUSTOMER')")
    @GetMapping("/accounts/{accountId}")
    public BankAccountDTO getBankAccount(@PathVariable String accountId) throws BankAccountNotFound {
        return bankAccountServiceImplementation.getBankAccount(accountId);
    }

    @PostAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/Account/searchAccount")
    public BankAccountsDTO getBankAccount(@RequestParam(name = "page", defaultValue = "0") int page) throws BankAccountNotFound {
        return bankAccountServiceImplementation.getBankAccountList(page);
    }

    @PostAuthorize("hasAuthority('ADMIN') or hasAuthority('CUSTOMER')")
    @GetMapping("/accounts/{accountId}/pageOperations")
    public AccountHistoryDTO getBankAccountOperations(@PathVariable String accountId, @RequestParam(name = "page", defaultValue = "0") int page,
                                                      @RequestParam(name = "size", defaultValue = "5") int size) throws BankAccountNotFound {
        return bankAccountServiceImplementation.getAccoutHistory(accountId, page, size);
    }

    @PostAuthorize("hasAuthority('ADMIN') or hasAuthority('CUSTOMER')")
    @PostMapping("/operations/Debit")
    public AccountOperationDTO debit(@RequestBody AccountOperationDTO accountOperarionDTO) throws BankAccountNotFound, BalanceNotSufficientException {
        this.bankAccountServiceImplementation.debit(accountOperarionDTO.getAccountId(), accountOperarionDTO.getAmount(), accountOperarionDTO.getDescription());
        return accountOperarionDTO;
    }

    @PostAuthorize("hasAuthority('ADMIN') or hasAuthority('CUSTOMER')")
    @PostMapping("/operations/Credit")
    public AccountOperationDTO credit(@RequestBody AccountOperationDTO accountOperarionDTO) throws BankAccountNotFound, BalanceNotSufficientException {
        this.bankAccountServiceImplementation.credit(accountOperarionDTO.getAccountId(), accountOperarionDTO.getAmount(), accountOperarionDTO.getDescription());
        return accountOperarionDTO;
    }

    @PostAuthorize("hasAuthority('ADMIN') or hasAuthority('CUSTOMER')")
    @PostMapping("/operations/Transfers")
    public void transfers(@RequestParam(name = "idSource") String idSource, @RequestParam(name = "idDestination") String idDestination, @RequestParam(name = "amount") double amount) throws BankAccountNotFound, BalanceNotSufficientException {
        this.bankAccountServiceImplementation.transfer(idSource, idDestination, amount);

    }

    @PostAuthorize("hasAuthority('ADMIN') or hasAuthority('CUSTOMER')")
    @PostMapping("/accounts/debit")
    public DebitDTO debit(@RequestBody DebitDTO debitDTO) throws BankAccountNotFound, BalanceNotSufficientException {
        this.bankAccountServiceImplementation.debit(debitDTO.getAccountId(), debitDTO.getAmount(), debitDTO.getDescription());
        return debitDTO;
    }

    @PostAuthorize("hasAuthority('ADMIN') or hasAuthority('CUSTOMER')")
    @PostMapping("/accounts/credit")
    public CreditDTO credit(@RequestBody CreditDTO creditDTO) throws BankAccountNotFound {
        this.bankAccountServiceImplementation.credit(creditDTO.getAccountId(), creditDTO.getAmount(), creditDTO.getDescription());
        return creditDTO;
    }

    @PostAuthorize("hasAuthority('ADMIN') or hasAuthority('CUSTOMER')")
    @PostMapping("/accounts/transfer")
    public void transfer(@RequestBody TransferRequestDTO transferRequestDTO) throws BankAccountNotFound, BalanceNotSufficientException {
        this.bankAccountServiceImplementation.transfer(transferRequestDTO.getAccountSource(), transferRequestDTO.getAccountDestination(), transferRequestDTO.getAmount());
    }

    @PostAuthorize("hasAuthority('ADMIN') or hasAuthority('CUSTOMER')")
    @PutMapping("/accounts/{accountId}")
    public BankAccountDTO updateAccount(@PathVariable String accountId, @RequestBody BankAccountDTO bankAccountDTO) {
        bankAccountDTO.setId(accountId);
        return bankAccountServiceImplementation.updateBankAccount(bankAccountDTO);
    }
}
