
export function useFormatNumberToMoney(price) {
    let convertNumberToMoney = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price)
    
    return convertNumberToMoney
}

