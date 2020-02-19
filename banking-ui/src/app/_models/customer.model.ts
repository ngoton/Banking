export class Customers {
    customerId: number;
    code: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    gender: string;
    phone: string;
    address: string;
    usersId: number;
    paymentsId: number;

    payment: Payment;
    saving: Savings;
    credit: Credits;
    debit: Debits;
    beneficiarys: Beneficiarys[];
    
    constructor(obj?: any) {
        this.customerId = obj && obj.customerId || null;
        this.code = obj && obj.code || null;
        this.firstName = obj && obj.firstName || null;
        this.lastName = obj && obj.lastName || null;
        this.birthDate = obj && obj.birthDate || null;
        this.gender = obj && obj.gender || null;
        this.phone = obj && obj.phone || null;
        this.address = obj && obj.address || null;
        this.usersId = obj && obj.usersId || null;
        this.paymentsId = obj && obj.paymentsId || null;

        this.payment = obj && new Payment(obj.payment) || null;
        this.saving = obj && new Savings(obj.saving) || null;
        this.credit = obj && new Credits(obj.credits) || null;
        this.debit = obj && new Debits(obj.debits) || null;
        this.beneficiarys = obj && obj.beneficiarys || null;
    }
}

export class Payment {
    paymentId: number;
    account: string;
    balance: string;

    constructor(obj?: any) {
        debugger;
        this.paymentId = obj && obj.paymentId || null;
        this.account = obj && obj.account || "";
        this.balance = obj && obj.balance || "";
    }
}

export class PaymentTransactions {
    id: number;
    code: string;
    money: string;
    content: string;
    paymentsId: number;
    beneficiaryAccount: string;
    beneficiarysId: number;
    fee: boolean;

    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.code = obj && obj.code || null;
        this.money = obj && obj.money || null;
        this.content = obj && obj.content || null;
        this.paymentsId = obj && obj.paymentsId || null;
        this.beneficiaryAccount = obj && obj.beneficiaryAccount || null;
        this.beneficiarysId = obj && obj.beneficiarysId || null;
        this.fee = obj && obj.fee || true;
    }
}

export class Savings {
    id: number;
    account: string;
    balance: string;
    customersId: number;

    constructor(obj?: any) {
        debugger;
        this.id = obj && obj.id || null;
        this.account = obj && obj.account || "";
        this.balance = obj && obj.balance || "";
        this.customersId = obj && obj.customersId || null;
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
        this.money = obj && obj.money || null;
        this.content = obj && obj.content || null;
    }
}

export class Beneficiarys {
    id: number;
    name: string;
    shortName: string;
    account: string;
    bankName: string;
    customersId: number;

    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.name = obj && obj.name || null;
        this.shortName = obj && obj.shortName || null;
        this.account = obj && obj.account || null;
        this.bankName = obj && obj.bankName || null;
        this.customersId = obj && obj.customersId || null;
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
        this.money = obj && obj.money || null;
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
        this.money = obj && obj.money || null;
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
