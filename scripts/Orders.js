import { getProducts, getEmployees, getOrders } from "./database.js"

// Get copy of state for use in this module
const products = getProducts()
const employees = getEmployees()
const orders = getOrders()


// Function whose responsibility is to find the product for an order
const findProduct = (order, allProducts) => {
    let orderProduct = []

    for (const product of products) {
        if (product.id === order.productId) {
            orderProduct = product
        }
    }

    return orderProduct
}

// Function whose responsibility is to find the employee for an order
const findEmployee = (order, allEmployees) => {
    let orderEmployee = []

    for (const employee of allEmployees) {
        if (employee.id === order.employeeId) {
            orderEmployee = employee
        }
    }

    return orderEmployee
}

export const Orders = () => {
    let html = ""
    html = "<ul>"

    for (const order of orders) {
        const employee = findEmployee(order, employees)
        const product = findProduct(order)

        html += `<li>${product.name} was sold by ${employee.name} on ${new Date(order.timestamp).toLocaleDateString()}</li>`
    }

    html += "</ul>"

    return html
}


// create a function to track how many orders each emplyee sold
// orders array contains employee ids and product ids
// funtion should track how many times an employee appeared in orders array


const findTotalEmplyeeSales = (employee) => {
    let totalSales = 0
    for (const order of orders) {
       if (order.employeeId === employee) {
        totalSales++
       }
    }
    return totalSales
}


document.addEventListener("click", (clickEvent) => {
    const itemClicked = clickEvent.target
    if (itemClicked.id.startsWith("employee")) {
        const [,employeeId] = itemClicked.id.split("--")
        for (const order of orders) {
            if (order.employeeId === parseInt(employeeId)) {
                const sales = findTotalEmplyeeSales(order);
                window.alert(`${employee.name} sold ${sales} products`)
            }
        }
    }
})