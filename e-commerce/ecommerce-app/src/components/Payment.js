import React from "react";

function PaymentPage() {
  const handlePayment = (paymentMethod) => {
    switch (paymentMethod) {
      case "phonepe":
        alert("Redirecting to phonepe");
        break;
      case "googlepay":
        alert("Redirecting to googlepay");
        break;
      case "paytm":
        alert("Redirecting to phonepe");
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1>Select a Payment Option</h1>

      <div>
        <h2>PhonePe</h2>
        <button onClick={() => handlePayment("phonepe")}>
          Pay with PhonePe
        </button>
      </div>

      <div>
        <h2>Google Pay</h2>
        <button onClick={() => handlePayment("googlepay")}>
          Pay with Google Pay
        </button>
      </div>

      <div>
        <h2>Paytm</h2>
        <button onClick={() => handlePayment("paytm")}>Pay with Paytm</button>
      </div>
    </div>
  );
}

export default PaymentPage;
