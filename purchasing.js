class ProductPurchase extends PurchasingAction {
    constructor(customer, product, quantity) {
        this.customer = customer
        this.product = product
        this.quantity = quantity
    }

    execute() {
        inventory.reserve(this.product, this.quantity)
        this.customer.shoppingCart.add(this.product, this.quantity)
        this.customer.notifyUpdates()
    }
}

function buySomething(customer, product, quantity) {
    engine.execute(new ProductPurchase(customer, product, quantity))
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