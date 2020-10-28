
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

const init = (function () {

    let data = { "items": [] };
    //list of Items
    const itemList = {};
    const cart = {};
    //plot each item from the data
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

        const cart = new Cart(itemList);

        //event listener for add to cart button
        document.querySelectorAll('.order-btn').forEach(item => {
            item.addEventListener('click', event => {
                const id = event.target.getAttribute("id");
                event.target.textContent = "Added";
                event.target.classList.add('disabled');
                cart.addItem(id)
                plotOrder(itemList[id]);
            })
        });

        // event listener for + button
        on(".added-item", "click", ".add", event => {
            const parent = event.target.closest('.added-item-container');
            const id = parent.getAttribute('id');
            cart.incrementQuantity(id);
            const qty = parent.querySelector('.qty');
            qty.innerText = cart.getQty(id);
            const dp = parent.querySelector('.displayPrize');
            dp.innerText = cart.getQty(id) * cart.selectedItems[id]['item'].displayPrize;
        });

        // event listener for - button
        on(".added-item", "click", ".sub", event => {
            const parent = event.target.closest('.added-item-container');
            const id = parent.getAttribute('id');
            if (cart.getQty(id) - 1 == 0) {
                event.target.closest('.added-item-container').remove();
                //delete cart.selectedItems[id];
                cart.removeItem(id);
                const item = document.querySelector('.order-btn[id="' + id + '"]');
                item.classList.remove('disabled');
                item.innerText = 'Add to Cart';
                return;
            }
            cart.decrementQuantity(id);
            const qty = parent.querySelector('.qty');
            qty.innerText = cart.getQty(id);
            const dp = parent.querySelector('.displayPrize');
            dp.innerText = cart.getQty(id) * cart.selectedItems[id]['item'].displayPrize;
        });
    }

    //plot the cart detail
    plotOrder = (item) => {
        const parent = document.querySelector(".added-item");
        sb.empty();
        sb.append("<div class='added-item-container' id='" + item.id + "'>");
        sb.append("     <div class='icon-container'>")
        sb.append("         <img class='added-img' src='./Images/" + item.image + "' />");
        sb.append("         <div class='title'>" + item.brandName + "</div>");
        sb.append("     </div>");
        sb.append("     <div class='btn-container'>");
        sb.append("     <span class='add btn'>+</span>");
        sb.append("         <div class='qty'>1</div>");
        sb.append("     <span class='sub btn'>-</span>");
        sb.append("     </div>");
        sb.append("     <div class='displayPrize'>" + item.displayPrize + "</div>");
        sb.append("</div>");
        parent.insertAdjacentHTML('beforeend', sb.toString());
    }

    getData = async function () {
        const rawData = await fetch('http://localhost:3000/api/home');
        data = await rawData.json();
    }

    //public function
    _init = async function () {
        await getData();
        plotItems();
    }

    return _init;
})();