package com.BOUARGALNE.digital.banking.repositories;

import com.BOUARGALNE.digital.banking.entities.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    @Query("select c from Customer c where c.name like :kw")
    Page<Customer> searchByName(@Param("kw") String keyword, Pageable pageable);

    Page<Customer> findAll(Pageable pageable);

}
