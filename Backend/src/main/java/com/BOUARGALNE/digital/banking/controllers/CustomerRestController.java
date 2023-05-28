package com.BOUARGALNE.digital.banking.controllers;

import com.BOUARGALNE.digital.banking.dtos.BankAccountDTO;
import com.BOUARGALNE.digital.banking.exceptions.CustomerNotFoundException;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.BOUARGALNE.digital.banking.dtos.CustomerDTO;
import com.BOUARGALNE.digital.banking.dtos.CustomersDTO;
import com.BOUARGALNE.digital.banking.services.BankAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@AllArgsConstructor
@NoArgsConstructor
@Slf4j
@CrossOrigin("*")
public class CustomerRestController {
    @Autowired
    private BankAccountService bankAccountService;

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/customers")
    public List<CustomerDTO> customers(@PathVariable int page) {
        return bankAccountService.listCustomers(page);
    }

    @PostAuthorize("hasAuthority('ADMIN') or hasAuthority('CUSTOMER')")
    @GetMapping("/customers/{id}/accounts")
    public List<BankAccountDTO> accountsListOfCustomer(@PathVariable(name = "id") Long customerId) {
        return bankAccountService.bankAccountListOfCustomer(customerId);
    }

    @PostAuthorize("hasAuthority('ADMIN') or hasAuthority('CUSTOMER')")
    @GetMapping("/customers/{id}")
    public CustomerDTO getCustomer(@PathVariable(name = "id") Long customerId) throws CustomerNotFoundException {
        return bankAccountService.getCustomer(customerId);
    }

    @PostAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/customers/search")
    public CustomersDTO getCustomerByName(@RequestParam(name = "keyword", defaultValue = "") String keyword, @RequestParam(name = "page", defaultValue = "0") int page) throws CustomerNotFoundException {
        CustomersDTO customersDTO = bankAccountService.getCustomerByName("%" + keyword + "%", page);
        return customersDTO;
    }

    @PostAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/customers")
    public CustomerDTO saveCustomer(@RequestBody CustomerDTO customerDTO) {
        return bankAccountService.saveCustomer(customerDTO);
    }

    @PostAuthorize("hasAuthority('ADMIN') or hasAuthority('CUSTOMER')")
    @PutMapping("/customers/{customerId}")
    public CustomerDTO updateCustomer(@PathVariable Long customerId, @RequestBody CustomerDTO customerDTO) {
        customerDTO.setId(customerId);
        return bankAccountService.updateCustomer(customerDTO);
    }

    @PostAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/customers/{customerId}")
    public void deleteCustomer(@PathVariable Long customerId) {
        bankAccountService.deleteCustomer(customerId);
    }

}
