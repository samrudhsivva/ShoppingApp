import React from "react";
import "../App.css";

const ProductList = ({ products, addToCart }) => {
  return (
    <div className="flex-container">
      <h2>Product Listings</h2>
      <div>
        {products.map((product) => (
          <div className="flex-item" key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="price">Price: ${product.price}</p>
            <button
              data-testid={`Add to Cart product ${product.id}`}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}

        <marquee className="offer">
          <span className="independence">INDEPENDENCE DAY</span> OFFER FLAT 25%
          OFF ON ALL PRODUCTS
        </marquee>
      </div>
    </div>
  );
};

export default ProductList;
