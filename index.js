import { products } from "./src/products.js";
import { getCurrentDateTime } from "./src/getCurrentDateTime.js";
import { promotion } from "./src/promotion.js";
import { accumulatedCart } from "./src/accumulatedCart.js";

// Variables
let cart = []
let $checkoutId = 1
let $totalPrice = 0;

// checkoutProduct
class checkoutProduct {
    constructor(productName, quantity, price, unit) {
        this.checkoutId = $checkoutId++;
        this.productName = productName;
        this.quantity = quantity;
        this.price = price;
        this.unit = unit;
    }
}


// Retrieve Products and set functions to scan / add to cart the item
function getAllProducts(){
    let itemsDOM = document.getElementById("items");

    products.forEach(product => {
        let item = document.createElement("div")
        item.classList = "item";

        let barcode = new Image;
        barcode.src = "media/barcode.png"
        barcode.alt = "barcode"        

        let itemName = document.createElement("div");
        let labelItemName = document.createElement("b");
        labelItemName.textContent = "Item Name: ";
        itemName.appendChild(labelItemName);
        let valueItemName = document.createElement("i");
        valueItemName.textContent = product.name;
        itemName.appendChild(valueItemName);

        let itemPrice = document.createElement("div");
        let labelItemPrice = document.createElement("b");
        labelItemPrice.textContent = "Item Price: ";
        itemPrice.appendChild(labelItemPrice);
        let valueItemPrice = document.createElement("i");
        valueItemPrice.textContent = `₱${product.price} per ${product.unit}`;
        itemPrice.appendChild(valueItemPrice);

        let salesPromotion = document.createElement("div");
        let labelSalesPromotion = document.createElement("b");
        labelSalesPromotion.textContent = "Sales Promotion: ";
        salesPromotion.appendChild(labelSalesPromotion);
        let valueSalesPromotion = document.createElement("i");
        valueSalesPromotion.classList = product.salesPromotion ? "active-promotion" : "non-promotion";
        valueSalesPromotion.textContent = product.salesPromotion ? "Active"  : "None";
        salesPromotion.appendChild(valueSalesPromotion);

        item.append(barcode,itemName, itemPrice, salesPromotion)
        itemsDOM.appendChild(item);

        // Add to Cart
        item.addEventListener("click", function(){
            let totalItemQty = promotion(product.name, product.quantity, product.price).$promoQuantity;
            let totalItemPrice = promotion(product.name, product.quantity, product.price).$promoPrice;

            let checkoutContainer = document.createElement("div");            
            checkoutContainer.id = "checkout-container"

            let checkoutModal = document.createElement("div");
            checkoutModal.id = "checkout-modal"

            let checkoutName = document.createElement("h1");
            checkoutName.textContent = product.name;

            let checkPromo = document.createElement("div");
            checkPromo.textContent = promotion(product.name).$promotion;

            let hr = document.createElement("hr");

            let quantityh2 = document.createElement("h2");
            quantityh2.textContent = "Input Quantity"

            let modalQuantity = document.createElement("div");
            modalQuantity.classList = "modal-quantity";
            let inputQuantity = document.createElement("input");
            inputQuantity.type = "number"
            inputQuantity.value = totalItemQty;
            let unitItem = document.createElement("b");
            unitItem.textContent = ` ${product.unit}`;
            modalQuantity.append(inputQuantity,unitItem);

            let itemTotalQtyValue = document.createElement("i")
            itemTotalQtyValue.textContent = totalItemQty
            let itemTotalPriceValue = document.createElement("i")
            itemTotalPriceValue.textContent = `₱${totalItemPrice}`

            // input quantity
            inputQuantity.addEventListener("input",  function(e){
                totalItemPrice = promotion(product.name, +e.target.value, product.price).$promoPrice

                totalItemQty = promotion(product.name, e.target.value, product.price).$promoQuantity

                itemTotalPriceValue.textContent = `₱${totalItemPrice}`;

                itemTotalQtyValue.textContent = `${totalItemQty}`;
            })
            
            let totalItemDetails = document.createElement("div");
            totalItemDetails.classList = "total-items-details"
            let itemTotalQtyContainer = document.createElement("div");
            let itemTotalQtyLabel = document.createElement("b");
            itemTotalQtyLabel.textContent = "Total Quantity: ";       
            itemTotalQtyContainer.append(itemTotalQtyLabel, itemTotalQtyValue);

            let itemTotalPriceContainer = document.createElement("div");
            let itemTotalPriceLabel = document.createElement("b");
            itemTotalPriceLabel.textContent = "Total Price: ";       
            itemTotalPriceContainer.append(itemTotalPriceLabel, itemTotalPriceValue);

            totalItemDetails.append(itemTotalQtyContainer,itemTotalPriceContainer);

            let checkoutItemBtn = document.createElement("button");
            checkoutItemBtn.textContent = "Checkout (add to cart)"
            checkoutItemBtn.id = "checkout-item";

            // Add to Cart / Scan Item
            checkoutItemBtn.addEventListener("click", function(){
                checkoutContainer.remove()

                if(totalItemQty <= 0 || totalItemPrice <= 0){
                    alert("invalid value for quantity or price")
                }else{
                    cart.push(new checkoutProduct(product.name, totalItemQty, totalItemPrice, product.unit))

                    $totalPrice += totalItemPrice;
                }

                updateReceipt();
                updateMonitor();
            })


            checkoutModal.append(checkoutName, checkPromo, hr, quantityh2, modalQuantity, totalItemDetails,checkoutItemBtn);

            checkoutContainer.appendChild(checkoutModal);
            document.body.append(checkoutContainer);
        })
    });
    
}
getAllProducts()

// Official Receipt Details
let receiptDetailsDOM = document.getElementById("receipt-details");

function updateReceipt(){
    receiptDetailsDOM.innerHTML = "";

    let thead = document.createElement("thead");
    thead.innerHTML = 
    `
        <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
        </tr>
    `
    let tbody = document.createElement("tbody");      

    accumulatedCart(cart).forEach(product => {
        let tr = document.createElement("tr");
        let productName = document.createElement("td");
        productName.textContent = product.productName;
        let productQuantity = document.createElement("td");
        productQuantity.textContent = `${product.quantity} ${product.unit}`;
        let productPrice = document.createElement("td");
        productPrice.textContent = `₱${product.price}`;

        tr.append(productName, productQuantity, productPrice);
        tbody.append(tr);   
    });

    let tfoot = document.createElement('tfoot');
    let totalPriceContainer = document.createElement('tr');
    let totalPriceLabel = document.createElement("td");
    totalPriceLabel.colSpan = 2;
    totalPriceLabel.classList = "total";
    totalPriceLabel.textContent = "Total Price: ";
    let totalPriceValue = document.createElement("td");
    totalPriceValue.classList = "total";
    totalPriceValue.textContent = `₱${$totalPrice}`
    
    totalPriceContainer.append(totalPriceLabel, totalPriceValue)
    tfoot.append(totalPriceContainer)
    
    receiptDetailsDOM.append(thead, tbody, tfoot)
}

// Update the date and time in the receipt
let dateValueDOM = document.getElementById("date-value");
let timeValueDOM = document.getElementById("time-value");
setInterval(() => {
    dateValueDOM.textContent = getCurrentDateTime()[0];
    timeValueDOM.textContent = getCurrentDateTime()[1];
}, 500);

// Monitor / Scanned Items / Added Items
let monitorDetailsDOM = document.getElementById("monitor-details");

function updateMonitor(){
    monitorDetailsDOM.innerHTML = "";

    let thead = document.createElement("thead");
    thead.innerHTML = 
    `
        <tr>
            <th>Action</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
        </tr>
    `
    let tbody = document.createElement("tbody");    

    cart.forEach(product => {        
        let tr = document.createElement("tr");
        let actionButtonTD = document.createElement("td");                
        let actionButton = document.createElement("button");
        actionButton.classList = "delete-btn";
        actionButton.textContent = "Delete";

        actionButtonTD.appendChild(actionButton)
        let productName = document.createElement("td");
        productName.textContent = product.productName;
        let productQuantity = document.createElement("td");
        productQuantity.textContent = `${product.quantity} ${product.unit}`;
        let productPrice = document.createElement("td");
        productPrice.textContent = `₱${product.price}`;

        tr.append(actionButtonTD,productName, productQuantity, productPrice);
        tbody.append(tr);   

        // Delete Specific Item
        actionButton.addEventListener("click", function(){
            deleteItem(product.checkoutId, tr, product.price, productPrice);
            updateReceipt();
        })
    });

    let tfoot = document.createElement('tfoot');
    let totalPriceContainer = document.createElement('tr');
    let totalPriceLabel = document.createElement("td");
    totalPriceLabel.colSpan = 3;
    totalPriceLabel.classList = "total";
    totalPriceLabel.textContent = "Total Price: ";
    let totalPriceValue = document.createElement("td");
    totalPriceValue.classList = "total";
    totalPriceValue.textContent = `₱${$totalPrice}`
    
    totalPriceContainer.append(totalPriceLabel, totalPriceValue)
    tfoot.append(totalPriceContainer)
    
    monitorDetailsDOM.append(thead, tbody, tfoot)
}

// Delete Specific Item
function deleteItem(id, itemRow, price){
    // get index of the specific item
    const index = cart.findIndex(itemId => itemId.checkoutId === id);
    // remove the item in Array
    cart.splice(index,1);  

    //remove in HTML
    itemRow.remove();

    // update total price
    $totalPrice -= price

    // Update Total Price in MonitorHTML
    updateMonitor()
}

// Remove All Item
let resetBtn = document.getElementById("reset");

resetBtn.addEventListener("click", function(){

    monitorDetailsDOM.innerHTML = "";
    
    let thead = document.createElement("thead");
    thead.innerHTML = 
    `
        <tr>
            <th>Action</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
        </tr>
    `

    monitorDetailsDOM.append(thead)

    cart.length = 0;
    $totalPrice = 0;
    updateReceipt();

})


// Print Receipt Button
let officialReceiptDOM = document.getElementById("official-receipt");
let printReceiptBtn = document.getElementById("print-receipt");

printReceiptBtn.addEventListener("click", function(){

    html2canvas(officialReceiptDOM).then(canvas => {
        const link = document.createElement('a');
        link.download = 'officialReceipt.pdf';
        link.href = canvas.toDataURL();
        link.click();
    });

})
