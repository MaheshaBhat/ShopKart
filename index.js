
let data = {
    "items": [
        {
            "name": "Samsung Series 4",
            "id": 0,
            "image": "recipeThumb-08.svg",
            "price": {
                "actual": 13999,
                "display": 22500
            },
            "discount": 37
        },
        {
            "name": "Samsung Super 6",
            "id": 1,
            "image": "recipeThumb-08.svg",
            "price": {
                "actual": 35999,
                "display": 66900
            },
            "discount": 46
        },
        {
            "name": "Samsung The Frame",
            "id": 2,
            "image": "recipeThumb-08.svg",
            "price": {
                "actual": 84999,
                "display": 133900
            },
            "discount": 36
        },
        {
            "name": "Thomson B9 Pro",
            "id": 3,
            "image": "recipeThumb-08.svg",
            "price": {
                "actual": 9999,
                "display": 16999
            },
            "discount": 41
        },
        {
            "name": "LG Ultra HD",
            "id": 4,
            "image": "recipeThumb-08.svg",
            "price": {
                "actual": 39990,
                "display": 79990
            },
            "discount": 50
        },
        {
            "name": "Vu Ready LED TV",
            "id": 5,
            "image": "recipeThumb-08.svg",
            "price": {
                "actual": 7999,
                "display": 17000
            },
            "discount": 52
        },
        {
            "name": "Koryo Android TV",
            "id": 6,
            "image": "recipeThumb-08.svg",
            "price": {
                "actual": 55999,
                "display": 199990
            },
            "discount": 71
        },
        {
            "name": "Micromax LED Smart",
            "id": 7,
            "image": "recipeThumb-08.svg",
            "price": {
                "actual": 9999,
                "display": 27990
            },
            "discount": 64
        }
    ]
}

const obj = (function () {

    const addedItem = {};
    const itemList = {};
    let StringBuilder = function () { this.value = ""; };
    StringBuilder.prototype.append = function (value) { this.value += value; };
    StringBuilder.prototype.toString = function () { return this.value; };
    StringBuilder.prototype.empty = function () {
        this.value = ""; return this;
    }
    let sb = new StringBuilder();

    const on = (selector, eventType, childSelector, eventHandler) => {
        const elements = document.querySelectorAll(selector)
        for (element of elements) {
            element.addEventListener(eventType, eventOnElement => {
                if (eventOnElement.target.matches(childSelector)) {
                    eventHandler(eventOnElement)
                }
            })
        }
    }

    class Item {
        constructor(id, name, image, actual, display, discount) {
            this.id = id;
            this.actualPrize = actual;
            this.displayPrize = display;
            this.brandName = name;
            this.image = image;
            this.discount = discount;

        }


        render = function () {
            sb.empty();
            sb.append("<div class='itemStyle'>");
            sb.append("     <img class='img' src='./Images/" + this.image + "' />");
            sb.append("     <div class='title'>" + this.brandName + "</div>");
            sb.append("     <div class='prize-container'>");
            sb.append("         <div>" + this.actualPrize + "</div>");
            sb.append("         <div>" + this.displayPrize + "</div>");
            sb.append("         <div class='order-btn' id='" + this.id + "'>Add to Cart</div>");
            sb.append("     </div>")
            sb.append("</div>")
            return sb.toString();
        }
    }

    plotItems = () => {
        const parent = document.querySelector(".leftPanel");
        data.items.map((ele, i) => {
            const { name,
                id,
                image,
                price,
                discount } = ele;
            const { actual, display } = price;
            itemList[id] = new Item(id, name, image, actual, display, discount);
            parent.insertAdjacentHTML('beforeend', itemList[id].render());
        });

        document.querySelectorAll('.order-btn').forEach(item => {
            item.addEventListener('click', event => {
                const id = event.target.getAttribute("id");
                event.target.textContent = "Added";
                event.target.classList.add('disabled');
                addedItem[id] = { item: null, qty: 1 };
                addedItem[id]['item'] = itemList[id];
                plotOrder(itemList[id]);
            })
        });

        on(".added-item", "click", ".add", event => {
            const parent = event.target.closest('.added-item-container');
            const id = parent.getAttribute('id');
            addedItem[id].qty += 1;
            const qty = document.querySelector('.qty');
            qty.innerText = addedItem[id].qty;
            const dp = document.querySelector('.displayPrize');
            dp.innerText = addedItem[id].qty * addedItem[id]['item'].displayPrize;
        });

        on(".added-item", "click", ".sub", event => {
            const parent = event.target.closest('.added-item-container');
            const id = parent.getAttribute('id');
            if (addedItem[id].qty - 1 == 0) {
                event.target.closest('.added-item-container').remove();
                delete addedItem[id];
                const item = document.querySelector('.order-btn[id="' + id + '"]');
                item.classList.remove('disabled');
                item.innerText = 'Add to Cart';
            }
            addedItem[id].qty -= 1;
            const qty = document.querySelector('.qty');
            qty.innerText = addedItem[id].qty;
            const dp = document.querySelector('.displayPrize');
            dp.innerText = addedItem[id].qty * addedItem[id]['item'].displayPrize;
        });
    }

    plotOrder = (item) => {
        const parent = document.querySelector(".added-item");
        sb.empty();
        sb.append("<div class='added-item-container' id='" + item.id + "'>");
        sb.append("     <img class='added-img' src='./Images/" + item.image + "' />");
        sb.append("     <div class='title'>" + item.brandName + "</div>");
        sb.append("     <span class='add'>+</span>")
        sb.append("         <div class='qty'>1</div>");
        sb.append("     <span class='sub'>-</span>")
        sb.append("     <div class='displayPrize'>" + item.displayPrize + "</div>");
        sb.append("</div>");
        parent.insertAdjacentHTML('beforeend', sb.toString());
    }



    _init = function () {
        plotItems();
        plotOrder();
    }

    return _init;
})();