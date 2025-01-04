export function accumulatedCart(cart){
    const accCart = cart.reduce((acc, { productName, quantity, price, unit }) => {
        // If productName already exists in accumulator, sum quantity and price
        if (acc[productName]) {
            acc[productName].quantity += Number(quantity);
            acc[productName].price += +price;
            acc[productName].unit = unit;
            console.log(typeof quantity)
            console.log(quantity)
        } else {
            // Otherwise, add it to accumulator with initial values
            acc[productName] = {
                productName,
                quantity,
                price: price,
                unit
            };
        }
        return acc;
    }, {});

   // Convert accCart object back to an array
    const result = Object.values(accCart);
    console.log(result)
    return result;
}