function buySomething(customer, product, quantity) {
    inventory.reserve(product, quantity)
    customer.shoppingCart.add(product, quantity)
    customer.notifyUpdates()
}