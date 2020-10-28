let StringBuilder = function () { this.value = ""; };
StringBuilder.prototype.append = function (value) { this.value += value; };
StringBuilder.prototype.toString = function () { return this.value; };
StringBuilder.prototype.empty = function () {
    this.value = ""; return this;
}
let sb = new StringBuilder();

 //selector click will matches the childSelector if its present then it triggers event handler
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