export function formatCurrency(amount) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(amount)
}

export function getStatusColor() {
    const now = new Date()
    const day = now.getDay() // Sunday = 0, Monday = 1, ... Saturday = 6
    const hours = now.getHours()

    // Check if it's between Monday to Saturday and 9:00 - 18:00
    const isOpen = day >= 1 && day <= 6 && hours >= 9 && hours < 18

    return isOpen ? "text-green-500" : "text-red-500"
}
