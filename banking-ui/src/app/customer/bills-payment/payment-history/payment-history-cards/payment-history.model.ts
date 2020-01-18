export class PaymentHistory {
    constructor(
        public transId?: string,
        public transDate?: string,
        public transRef?: string,
        public customerName?: string,
        public customerId?: string,
        public formTitle?: string,
        public formId?: string,
        public totalAmount?: string,
        public billDetails?: FieldDetails[],
        public customerLogo?: string,
        public imageType?: string,
        public image?: string,
        public totalCharge?: string,
        public payAgain?: boolean,
    ) { }
}

export class FieldDetails {
    constructor(
        public field_id?: number,
        public form_id?: number,
        public field_name?: string,
        public field_caption?: string,
        public field_type?: number,
        public field_datatype?: number,
        public field_length?: number,
        public field_lov?: boolean,
        public field_date_format?: string,
        public field_mandatory?: string,
        public field_in_remarks?: string,
        public field_sequence?: number,
        public default_value?: string,
        public actual_value?: string,
        public read_only?: boolean,
        public show_on_receipt?: boolean,
        public amt_ref?: boolean,
        public data_retrieve?: boolean,
        public dataSource?: boolean,
        public field_visible?: boolean,
        public show_online?: boolean,
        public show_at_branch?: boolean,
        public show_on_Web?: boolean,
        public tooltip?: string,
        public show_on_ussd?: boolean,
        public show_on_atm?: boolean,
        public depend_lov?: boolean,
    ) { }
}