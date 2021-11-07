export const listColumn = [
    {
        key: "id",
        value: "id",
        // row: value => value,
        label: "id"
    },
    {
        key: "object",
        value: "object",
        // row: value => value,
        label: "Object"
    },
    {
        key: "address",
        value: "address",
        // row: value => value,
        label: "Address"
    },
    {
        key: "balance",
        value: "balance",
        // row: value => value,
        label: "Balance"
    },
    {
        key: "created",
        value: "created",
        // row: value => value,
        label: "Created"
    },
    {
        key: "currency",
        value: "currency",
        // row: value => value,
        label: "Currency"
    },
    {
        key: "default_source",
        value: "default_source",
        // row: value => value,
        label: "Default Source"
    },
    {
        key: "delinquent",
        value: "delinquent",
        // row: value => value,
        label: "Delinquent"
    },
    {
        key: "description",
        value: "description",
        // row: value => value,
        label: "Description"
    },
    {
        key: "discount",
        value: "discount",
        // row: value => value,
        label: "Discount"
    },
    {
        key: "email",
        value: "email",
        // row: value => value,
        label: "Email"
    },
    {
        key: "invoice_prefix",
        value: "invoice_prefix",
        // row: value => value,
        label: "Invoice Prefix"
    },
    {
        key: "custom_fields",
        // value: "custom_fields",
        row: value => value.invoice_settings.custom_fields,
        label: "Custom Fields"
    },
    {
        key: "default_payment_method",
        // value: "default_payment_method",
        row: value => value.invoice_settings.default_payment_method,
        label: "Default Payment Method",
    },
    {
        key: "footer",
        // value: "footer",
        row: value => value.invoice_settings.footer,
        label: "Footer",
    },
    {
        key: "livemode",
        value: "livemode",
        // row: value => value,
        label: "Livemode",
    },
    {
        key: "metadata",
        value: "metadata",
        // row: value => value,
        label: "Metadata",
    },
    {
        key: "name",
        // row: value => value,
        label: "Name",
    },
    {
        key: "next_invoice_sequence",
        // row: value => value,
        label: "Next Invoice Sequence",
    },
    {
        key: "phone",
        // row: value => value,
        label: "Phone",
    },
    {
        key: "preferred_locales",
        value: "preferred_locales",
        // row: value => value,
        label: "Preferred Locales",
    },
    {
        key: "shipping",
        value: "shipping",
        // row: value => value,
        label: "Shipping",
    },
    {
        key: "tax_exempt",
        value: "tax_exempt",
        // row: value => value,
        label: "Tax Exempt",
    }
]

export const defaultColumn = [
    {
        key: "email",
        value: "email",
        // row: value => value,
        label: "Email"
    },
    {
        key: "description",
        value: "description",
        // row: value => value,
        label: "Description"
    },
    {
        key: "created",
        value: "created",
        // row: value => value,
        label: "Created"
    },
]