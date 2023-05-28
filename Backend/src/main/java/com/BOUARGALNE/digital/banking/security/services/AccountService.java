package com.BOUARGALNE.digital.banking.security.services;

import com.BOUARGALNE.digital.banking.security.entities.AppRole;
import com.BOUARGALNE.digital.banking.security.entities.AppUser;

import java.util.List;

public interface AccountService {
    AppUser addNewUser(AppUser appUser);
    AppRole addNewRole(AppRole appRole);
    void addRoleToUser(String username, String rolename);
    AppUser loadUserByUsername(String username);
    List<AppUser> listUsers();

}
