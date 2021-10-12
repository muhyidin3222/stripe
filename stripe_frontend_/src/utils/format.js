export const currencyFromat = ({ number, currency }) => {
    console.log(currency, number)
    if (number)
        return new Intl.NumberFormat(currency, { style: 'currency', currency: currency }).format(number)
    return 0
}