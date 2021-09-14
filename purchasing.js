function buySomething(customer, product, quantity) {
    console.debug('buySomething started', customer, product, quantity)
    inventory.reserve(product, quantity)
    customer.shoppingCart.add(product, quantity)
    customer.notifyUpdates()
    console.debug('buySomething done', customer, product, quantity)
}