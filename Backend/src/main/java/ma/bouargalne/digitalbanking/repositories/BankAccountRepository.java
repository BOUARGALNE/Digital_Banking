package ma.bouargalne.digitalbanking.repositories;

import ma.bouargalne.digitalbanking.entities.BankAccount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BankAccountRepository extends JpaRepository<BankAccount,String> {
}
