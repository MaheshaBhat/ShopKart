//cart is used to hold the item order details
class Cart {
    #selectedItems = {};
    #itemQuantityMap = {};

    constructor(itemList) {
        this.total = 0;
        this.discount = 0;
        this.itemQuantityMap = {};
        this.basicTotal = 0;
        this.selectedItems = {};
        this.itemList = itemList;
        // this.selectedItems = new Proxy(this.#selectedItems, {
        //     set: (selectedItems, prop, value) => {
        //         //this.total += value.item.displayPrize * this.#itemQuantityMap[prop];
        //         //this.discount += value.item.discount * this.#itemQuantityMap[prop];
        //         selectedItems[prop] = value;
        //         //this.updateTotals();
        //         return true;
        //     }
        // });

    }

    updateTotals() {
        document.querySelector('#totals').innerText = this.total;
        document.querySelector('#items').innerText = this.basicTotal;
        document.querySelector('#discount').innerText = this.discount;
        document.querySelector('#noOfItems').innerText = "Items (" + Object.keys(this.selectedItems).length + "): ";
    }

    getQty = function (id) {
        return this.#itemQuantityMap[id];
    }

    addItem = function (id) {
        this.selectedItems[id] = { 'item': this.itemList[id] };
        this.incrementQuantity(id);
    }

    removeItem = function (id) {
        delete this.selectedItems[id];
        this.decrementQuantity(id);

    }

    incrementQuantity = function (id) {
        this.#itemQuantityMap[id] = (this.#itemQuantityMap[id] || 0) + 1;
        const item = this.itemList[id];
        this.total += item.displayPrize;
        this.basicTotal += item.actualPrize;
        this.discount += item.discount;
        this.updateTotals();
    }

    decrementQuantity = function (id) {
        this.#itemQuantityMap[id] -= 1;
        const item = this.itemList[id];
        this.total -= item.displayPrize;
        this.basicTotal -= item.actualPrize;
        this.discount -= item.discount;
        this.updateTotals();
    }

}