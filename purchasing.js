function buySomething(customer, product, quantity) {
    log.inContext(`${customer} purchasing ${quantity} units of ${product}`, () => {
        inventory.reserve(product, quantity)
        customer.shoppingCart.add(product, quantity)
        customer.notifyUpdates()
    })
}