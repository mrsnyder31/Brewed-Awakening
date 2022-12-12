import { getEmployees, getOrders } from "./database.js"

const employees = getEmployees()
const orders = getOrders();

export const Employees = () => {
    let html = "<ul>"

    for (const employee of employees) {
        html += `<li id="employee--${employee.id}">${employee.name}</li>`
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
       if (order.employeeId === employee.id) {
        totalSales++
       }
    }
    return totalSales
}

// for (const product of products) {
//     if (product.id === parseInt(productId)) {
//         window.alert(`${product.name} costs $${product.price}`)
//     }

document.addEventListener("click", (clickEvent) => {
    const itemClicked = clickEvent.target
    if (itemClicked.id.startsWith("employee")) {
        const [,employeeId] = itemClicked.id.split("--")


        for (const employee of employees) {
           
                if (employee.id === parseInt(employeeId)) {

                    const sales = findTotalEmplyeeSales(employee);

                    window.alert(`${employee.name} sold ${sales} products`)
                }
           
        }
    }
})