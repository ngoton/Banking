export class Customers {
    id: number;
    code: string;
    first_name: string;
    last_name: string;
    birth_date: string;
    gender: string;
    phone: string;
    address: string;
    users_id: number;
    payments_id: number;

    payment: Payment;
    saving: Savings;
    credit: Credits;
    debit: Debits;
    beneficiarys: Beneficiarys[];
    
    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.code = obj && obj.code || null;
        this.first_name = obj && obj.first_name || null;
        this.last_name = obj && obj.last_name || null;
        this.birth_date = obj && obj.birth_date || null;
        this.gender = obj && obj.gender || null;
        this.phone = obj && obj.phone || null;
        this.address = obj && obj.address || null;
        this.users_id = obj && obj.users_id || null;
        this.payments_id = obj && obj.payments_id || null;

        this.payment = obj && new Payment(obj.payment) || null;
        this.saving = obj && new Savings(obj.savings) || null;
        this.credit = obj && new Credits(obj.credits) || null;
        this.debit = obj && new Debits(obj.debits) || null;
        this.beneficiarys = obj && obj.beneficiarys || null;
    }
}

export class Payment {
    id: number;
    account: string;
    balance: string;

    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.account = obj && obj.account || null;
        this.balance = obj && obj.balance || null;
    }
}

export class PaymentTransactions {
    id: number;
    code: string;
    money: string;
    content: string;
    payments_id: number;
    beneficiarys_id: number;

    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.code = obj && obj.code || null;
        this.money = obj && obj.money.toLocalString() || null;
        this.content = obj && obj.content || null;
        this.payments_id = obj && obj.payments_id || null;
        this.beneficiarys_id = obj && obj.beneficiarys_id || null;
    }
}

export class Savings {
    id: number;
    account: string;
    balance: string;
    customers_id: number;

    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.account = obj && obj.account || null;
        this.balance = obj && obj.balance.toLocalString() || null;
        this.customers_id = obj && obj.customers_id || null;
    }
}

export class SavingTransactions {
    id: number;
    code: string;
    money: string;
    content: string;
    
    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.code = obj && obj.code || null;
        this.money = obj && obj.money.toLocalString() || null;
        this.content = obj && obj.content || null;
    }
}

export class Beneficiarys {
    id: number;
    name: string;
    short_name: string;
    account: string;
    bank_name: string;
    customers_id: number;

    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.name = obj && obj.name || null;
        this.short_name = obj && obj.short_name || null;
        this.account = obj && obj.account || null;
        this.bank_name = obj && obj.bank_name || null;
        this.customers_id = obj && obj.customers_id || null;
    }
}

export class Credits {
    id: number;
    account: string;
    money: string;
    content: string;
    status: number;
    customers_id: number;

    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.account = obj && obj.account || null;
        this.money = obj && obj.money.toLocalString() || null;
        this.content = obj && obj.content || null;
        this.status = obj && obj.status || null;
        this.customers_id = obj && obj.customers_id || null; 
    }
}

export class Debits {
    id: number;
    account: string;
    money: string;
    content: string;
    status: number;
    customers_id: number;

    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.account = obj && obj.account || null;
        this.money = obj && obj.money.toLocalString() || null;
        this.content = obj && obj.content || null;
        this.status = obj && obj.status || null;
        this.customers_id = obj && obj.customers_id || null;
    }
}

export class Partners {
    id: number;
    name: string;
    key: string;

    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.name = obj && obj.name || null;
        this.key = obj && obj.key || null;
    }
}

export class Banks {
    name: string;
    code: string;
    active: number;
    finInstCat: string;
    bankShortName: String;
    catCode: number;
    sortCode: string;
    fileExtension: string;
    bankLogofileBase64: string;

    constructor(obj?: any) {
        this.name   = obj && obj.name  || null;
        this.code   = obj && obj.code  || null;
        this.active   = obj && obj.active  || null;
        this.finInstCat  = obj && obj.finInstCat || null;
        this.bankShortName  = obj && obj.bankShortName || null;
        this.catCode  = obj && obj.catCode  || null;
        this.sortCode  = obj && obj.sortCode  || null;
        this.fileExtension  = obj && obj.fileExtension  || null;
        this.bankLogofileBase64  = obj && obj.bankLogofileBase64  || null;
    }
}

export class Country {
    code: number;
    name: string;

    constructor(obj?: any) {
        this.code   = obj && obj.code  || null;
        this.name   = obj && obj.name  || null;
    }
}

export class Notifications {
    notificationType: number;
    description: string;
    message: string;
    notificationDate: number;
    customerSegment: string;
    nextAction: string;
    gif_url: string;

    constructor(obj?: any) {
        this.notificationType   = obj && obj.notificationType   || null;
        this.description   = obj && obj.description  || null;
        this.message   = obj && obj.message  || null;
        this.notificationDate   = obj && obj.notificationDate  || null;
        this.customerSegment  = obj && obj.customerSegment || null;
        this.nextAction  = obj && obj.nextAction || null;
        this.gif_url  = obj && obj.gif_url || null;
    }
}
