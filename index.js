
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

    const addedItem = [];
    const itemList = {};
    let StringBuilder = function () { this.value = ""; };
    StringBuilder.prototype.append = function (value) { this.value += value; };
    StringBuilder.prototype.toString = function () { return this.value; };
    StringBuilder.prototype.empty = function () {
        this.value = ""; return this;
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
            let sb = new StringBuilder();
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

            itemList[id] = new Item(id, name, image, actual, display, discount)
            parent.insertAdjacentHTML('beforeend', itemList[id].render());
        });

        const element = document.querySelector(".order-btn");
        element.addEventListener("click", function (e) {
            console.log(this.getAttribute("id"));

        });
    }

    plotOrder = () => {

    }



    _init = function () {
        plotItems();
        plotOrder();
    }

    return _init;
})();