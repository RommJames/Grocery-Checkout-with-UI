export function promotion(product, quantity = 1, price = 1){
    let $promotion
    let $promoPrice
    let $promoQuantity
    switch(product){
        case "Milk": 
            $promotion = "Buy 1 Take 1"
            $promoPrice = price * quantity;
            $promoQuantity = (1 + 1) * quantity;
            break
        case "Soda": 
            $promotion = "Buy 2 Take 1";
            $promoPrice = price * quantity;
            $promoQuantity = +quantity + Math.floor(quantity/2);
        break
        default:
            $promotion = "No Sales Promotion"            
            $promoQuantity = quantity
            $promoPrice = price * quantity
            break;
    }

    return {$promotion, $promoPrice, $promoQuantity}
}
