import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  it("renders product list and cart components", () => {
    const { getByText } = render(<App />);

    expect(getByText("Product 1")).toBeInTheDocument();
    expect(getByText("Product 2")).toBeInTheDocument();
    expect(getByText("Cart")).toBeInTheDocument();
  });

  it('adds item to cart when "Add to Cart" button is clicked', () => {
    const {  getByTestId } = render(<App />);

    fireEvent.click(getByTestId("Add to Cart product 1"));

    expect(getByTestId("cart-item-Product 1")).toBeInTheDocument();
  });

  it('removes item from cart when "Remove" button is clicked', () => {
    const { getByText, getByTestId, queryByTestId } = render(<App />);

    fireEvent.click(getByTestId("Add to Cart product 1")); 
    fireEvent.click(getByText("Remove")); 

    expect(queryByTestId("cart-item-Product 1")).toBeNull();
  });

  it("updates cart price when items are added or removed", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId("Add to Cart product 1")); 
    fireEvent.click(getByTestId("Add to Cart product 1")); 

    expect(getByTestId("cart-price 1")).toHaveTextContent("Price: $20");

     fireEvent.click(getByTestId("remove-button-Product 1")); 

    expect(getByTestId("cart-price")).toHaveTextContent("Total Cost in Cart: 0");
  });

  it("checking the Apply Coupon Button",()=>{
    const {getByTestId}=render(<App />);
    fireEvent.click(getByTestId("Add to Cart product 1")); 
    const couponElement=getByTestId('coupon-code');
    fireEvent.change(couponElement,{target:{value: "IND25"}});
    fireEvent.click(getByTestId("apply-coupon"));
    const discountedPrice=getByTestId("cart-price");
    expect(discountedPrice).toHaveTextContent(
      "Total Cost in Cart: 7.5"
    )
  }),
  
  it("checking the Remove Coupon Button",()=>{
    const {getByTestId}=render(<App />);
    fireEvent.click(getByTestId("Add to Cart product 1")); 
    const couponElement=getByTestId('coupon-code');
    fireEvent.change(couponElement,{target:{value: "IND25"}});
    fireEvent.click(getByTestId("apply-coupon"));
    const discountedPrice=getByTestId("cart-price");

    expect(discountedPrice).toHaveTextContent(
      "Total Cost in Cart: 7.5"
    );

    fireEvent.click(getByTestId("remove-coupon"));

    expect(discountedPrice).toHaveTextContent(
      "Total Cost in Cart: 10"
    );
  }
  )
});
