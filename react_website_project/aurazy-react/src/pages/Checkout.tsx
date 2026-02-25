import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const Checkout: React.FC = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const shipping = 49;
  const total = cartTotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const razorpayLink = "https://rzp.io/l/YOUR_PAYMENT_LINK";
    
    // Example logic from the original HTML
    const finalLink = `${razorpayLink}?amount=${total * 100}&prefill[name]=${encodeURIComponent(formData.name)}&prefill[email]=${encodeURIComponent(formData.email)}&prefill[contact]=${encodeURIComponent(formData.phone)}&notes[address]=${encodeURIComponent(formData.address)}`;
    
    window.location.href = finalLink;
  };

  if (cart.length === 0) {
    return <div className="section__container">Your cart is empty. Please add items before checking out.</div>;
  }

  return (
    <div className="section__container">
      <div className="checkout-container">
        <div className="form-section">
          <h2>Shipping Details</h2>
          <form id="checkoutForm" onSubmit={handleSubmit}>
            <input 
              type="text" 
              id="name" 
              placeholder="Full Name" 
              required 
              value={formData.name}
              onChange={handleInputChange}
            />
            <input 
              type="email" 
              id="email" 
              placeholder="Email Address" 
              required 
              value={formData.email}
              onChange={handleInputChange}
            />
            <input 
              type="tel" 
              id="phone" 
              placeholder="Phone Number" 
              required 
              value={formData.phone}
              onChange={handleInputChange}
            />
            <input 
              type="text" 
              id="address" 
              placeholder="Full Address" 
              required 
              value={formData.address}
              onChange={handleInputChange}
            />
            <button type="submit" className="btn">Proceed to Payment</button>
          </form>
        </div>

        <div className="summary-section">
          <h2>Order Summary</h2>
          {cart.map((item, index) => (
            <div className="product-box" key={`${item.name}-${index}`}>
              {item.image && <img src={item.image} alt={item.name} />}
              <div>
                <p><strong>{item.name}</strong></p>
                <p>Size: {item.size} x {item.quantity}</p>
                <p>₹ {item.price * item.quantity}</p>
              </div>
            </div>
          ))}

          <div className="price-row">
            <span>Subtotal</span>
            <span>₹ {cartTotal}</span>
          </div>
          <div className="price-row">
            <span>Shipping</span>
            <span>₹ {shipping}</span>
          </div>
          <div className="price-row total">
            <span>Total</span>
            <span>₹ {total}</span>
          </div>
        </div>
      </div>

      <style>{`
        .checkout-container {
          display: flex;
          max-width: 1100px;
          margin: 40px auto;
          background: #fff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 5px 20px rgba(0,0,0,0.08);
          color: #000;
        }
        .form-section {
          flex: 1;
          padding: 40px;
        }
        .summary-section {
          width: 380px;
          background: #fafafa;
          padding: 40px;
          border-left: 1px solid #eee;
        }
        .checkout-container h2 {
          margin-bottom: 20px;
          color: #000;
        }
        .checkout-container input {
          width: 100%;
          padding: 12px;
          margin-bottom: 15px;
          border-radius: 6px;
          border: 1px solid #ddd;
          font-size: 14px;
        }
        .product-box {
          display: flex;
          gap: 15px;
          margin-bottom: 20px;
        }
        .product-box img {
          width: 70px;
          height: auto;
          border-radius: 8px;
        }
        .price-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .price-row.total {
          font-size: 18px;
          font-weight: bold;
          border-top: 1px solid #ddd;
          padding-top: 10px;
        }
        @media (max-width: 900px) {
          .checkout-container {
            flex-direction: column;
          }
          .summary-section {
            width: 100%;
            border-left: none;
            border-top: 1px solid #eee;
          }
        }
      `}</style>
    </div>
  );
};

export default Checkout;
