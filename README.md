# 🛒 Grocery Checkout with UI

A browser-based grocery checkout system that simulates a point-of-sale (POS) experience. Users can browse available products, scan items into a cart, apply sales promotions, manage the checkout monitor, and generate a printable official receipt — all within a clean and interactive UI.

## 📋 Features

- **Product Listing** — Browse all available grocery items with their name, price per unit, and sales promotion status.
- **Item Scanning** — Click on any product to open a checkout modal where you can input the desired quantity.
- **Sales Promotions** — Automatically applies active promotions to the item price and quantity.
- **Checkout Monitor** — Tracks all scanned items with the ability to delete individual entries or clear the entire cart.
- **Official Receipt** — Displays a live receipt with product details, quantities, prices, and a running total — updated in real time.
- **Print Receipt** — Exports the official receipt as an image using `html2canvas`.
- **Live Date & Time** — The receipt displays the current date and time, updated every 500ms.

## 🗂️ Project Structure

```
Grocery-Checkout-with-UI/
├── index.html              # Main HTML layout
├── index.js                # Core application logic (ES Module)
├── style.css               # Styling for the UI
├── favicon.ico             # App icon
├── media/                  # Static assets (e.g., barcode image)
└── src/
    ├── products.js         # Product data
    ├── promotion.js        # Sales promotion logic
    ├── accumulatedCart.js  # Cart aggregation logic
    ├── getCurrentDateTime.js # Date & time utility
    └── html2canvas.min.js  # Library for receipt image export
```

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| **HTML5** | Page structure and layout |
| **CSS3** | Styling and responsive design |
| **JavaScript (ES6+)** | Application logic, DOM manipulation, ES Modules |
| **html2canvas** | Captures the receipt DOM element and exports it as a downloadable image |

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/RommJames/Grocery-Checkout-with-UI.git
   ```
2. Open `index.html` in your browser.

> ⚠️ Because the project uses ES Modules (`type="module"`), it must be served via a local server (e.g., [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code) rather than opened directly as a file.

## 📄 License

This project is open source and available for personal and educational use.