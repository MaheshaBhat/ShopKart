  //Item is used to hold each item details
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
        sb.append("         <div><strike>" + this.displayPrize + "</strike></div>");
        sb.append("         <div>" + this.actualPrize + "</div>");
        sb.append("         <div class='order-btn' id='" + this.id + "'>Add to Cart</div>");
        sb.append("     </div>")
        sb.append("</div>")
        return sb.toString();
    }
}
