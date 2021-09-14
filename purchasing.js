function buySomething(customer, product, quantity) {
    let log = log.start(`${customer} purchasing ${quantity} units of ${product}`)

    try {
        inventory.reserve(product, quantity)
        customer.shoppingCart.add(product, quantity)
        customer.notifyUpdates()
    } catch (err) {
        log.failWith(err)
    }

    log.complete()
}