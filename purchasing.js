function buySomething(customer, product, quantity) {
    log.inContext('ProductPurchase', { customer, product, quantity }, () => {
        inventory.reserve(product, quantity)
        customer.shoppingCart.add(product, quantity)
        customer.notifyUpdates()
    })
}

/* Possible output:
 * [
 *   { 
 *      id: 12345
 *      timestamp: 12973667, 
 *      type: "start-transaction"
 *      event: "Sales.Purchasing.ProductPurchase", 
 *      data: { 
 *          customer: {
 *              name: "Acme", 
 *              // ...
 *          },
 *          product: {
 *              id: 147
 *              manufacturerId: "johnson-johnson", 
 *              name: "Red shoes (TM)",
 *              msrp: 17999.99
 *          },
 *          quantity: 17
 *      }
 *   },
 *   {
 *      id: 12346
 *      timestamp: 12973715
 *      type: "complete-transaction"
 *      startId: 12345
 *   }
 * ]
 * 
 * Other possible output:
 * 
 * 12973667  Sales.Purchasing.ProductPurchase  START { customer: "Acme", product: "id#147", quantity: 17 }
 * 12973715  Sales.Purchasing.ProductPurchase  DONE  { customer: "Acme", product: "id#147", quantity: 17 }
 */