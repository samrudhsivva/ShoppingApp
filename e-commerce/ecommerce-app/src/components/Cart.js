import React, {  useState } from "react";
import { Outlet, Link } from "react-router-dom";

const Cart = ({ cartItems, removeFromCart, cartPrice }) => {
  const [couponCode, setCouponCode] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(cartPrice);
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  const applyCoupon = () => {
    if (couponCode === "IND25") {
      const discount = 0.25 * cartPrice;
      setIsCouponApplied(true);
      setDiscountedPrice(cartPrice - discount);
      
    }
  };

  const removeCoupon = () => {
    setDiscountedPrice(cartPrice);
    setIsCouponApplied(false);
  };

  return (
    <div className="flex-container">
      <h2>Cart</h2>
      <div>
        {cartItems.map((item) => (
          <div
            className="flex-item"
            key={item.id}
            data-testid={`cart-item-${item.name}`}
          >
            <h3>{item.name}</h3>
            <p>Quantity: {item.quantity}</p>
            <p className="price" data-testid={`cart-price ${item.id}`}>
              Price: ${item.price * item.quantity}
            </p>
            <button
              data-testid={`remove-button-Product ${item.id}`}
              onClick={() => removeFromCart(item)}
            >
              Remove
            </button>
          </div>
        ))}
        <div>
          {isCouponApplied ? (
            <div>
              <p>Coupon applied: {couponCode}</p>
              <button data-testId="remove-coupon" onClick={removeCoupon}>
                Remove Coupon
              </button>
            </div>
          ) : (
            <div>
              <input
                data-testId="coupon-code"
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button data-testId="apply-coupon" onClick={applyCoupon}>
                Apply Coupon
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="payment-button">
        <h2 data-testId="cart-price">
          {isCouponApplied ? (
            <span>Total Cost in Cart: {discountedPrice}</span>
          ) : (
            <span>Total Cost in Cart: {cartPrice}</span>
          )}
        </h2>
        <button>
          <Link to="/payment">Proceed to Payment</Link>
        </button>
        <Outlet/>
      </div>
    </div>
  );
};

export default Cart;
