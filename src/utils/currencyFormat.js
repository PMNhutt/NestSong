export const currencyFormat = (value) => {
    return new Intl.NumberFormat('vi-VN').format(value) + 'đ'
}