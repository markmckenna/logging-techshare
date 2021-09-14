function buySomething(customer, product, quantity) {
    inventory.reserve(product, quantity)
    customer.shoppingCart.add(product, quantity)
    customer.notifyUpdates()
    console.log(`${customer} bought ${quantity} units of ${product}`)
}