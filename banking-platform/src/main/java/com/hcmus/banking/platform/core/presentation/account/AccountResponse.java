package com.hcmus.banking.platform.core.presentation.account;

import com.hcmus.banking.platform.domain.customer.Customer;

public class AccountResponse {
    private static String EMPTY_STRING = "";
    public String name;
    public String account;
    public String bankName;

    public AccountResponse(String name, String account, String bankName){
        this.name = name;
        this.account = account;
        this.bankName = bankName;
    }

    public AccountResponse(Customer customer, String account, String bankName) {
        this.name = String.format("%s %s", customer.getInfo().getFirstName(), customer.getInfo().getLastName());
        this.account = account;
        this.bankName = bankName;
    }

    public static AccountResponse ofEmpty(){
        return new AccountResponse(EMPTY_STRING, EMPTY_STRING, EMPTY_STRING);
    }
}
