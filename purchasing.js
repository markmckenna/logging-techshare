function buySomething(customer, product, quantity) {
    console.log(`${customer} purchasing ${quantity} units of ${product}`)
    inventory.reserve(product, quantity)
    customer.shoppingCart.add(product, quantity)
    customer.notifyUpdates()
    console.debug("Purchase complete")
}