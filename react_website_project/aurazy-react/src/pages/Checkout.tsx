import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { createPaymentOrder, verifyPayment } from '../api';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Checkout: React.FC = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const buyNowProduct = location.state?.product;

  const finalItems = buyNowProduct
    ? [{ ...buyNowProduct, quantity: 1 }]
    : cart;

  const finalTotal = buyNowProduct
    ? buyNowProduct.price
    : cartTotal;

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name,
        email: user.email
      }));
    }
  }, [user]);

  const total = finalTotal;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });  
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.city || !formData.pincode) {
      alert("Please fill complete shipping details.");
      return;
    }

    const orderData = {
      shippingAddress: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        pincode: formData.pincode
      },
      items: finalItems.map(item => ({
        productId: String(item.id),
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image
      })),
      totalPrice: total
    };

    try {
      // 1. Create Order on Backend
      const { data } = await createPaymentOrder(orderData);

      if (data.success) {
        const { razorpayOrder } = data;

        const key = import.meta.env.VITE_RAZORPAY_KEY_ID;
        if (!key || key === 'rzp_test_YOUR_KEY_HERE') {
            alert("Razorpay Key ID is missing. Please set VITE_RAZORPAY_KEY_ID in your .env file.");
            return;
        }

        const options = {
          key: key, 
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          name: "Aurazy",
          description: "Purchase from Aurazy",
          order_id: razorpayOrder.id,
          handler: async (response: any) => {
            try {
              const verifyRes = await verifyPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });

if (verifyRes.data && verifyRes.data.success) {



if(!buyNowProduct) {
  clearCart();
}

navigate('/payment-success', {
  state: {
    paymentId: response.razorpay_payment_id,
    orderId: response.razorpay_order_id,
    amount: total
  }
});



              } else {
                alert("Payment verification failed.");
              }
            } catch (err) {
              console.error("Verification error:", err);
              alert("Payment verification failed.");
            }
          },
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone,
          },
          theme: {
            color: "#000000",
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.on('payment.failed', function (response: any) {
          alert("Payment Failed: " + response.error.description);
        });
        rzp.open();
      }
    } catch (error: any) {
      console.error("Order creation failed:", error);
      alert(error.response?.data?.message || "Failed to initiate payment. Please try again.");
    }
  };

  if (finalItems.length === 0) {
    return (
      <div className="section__container">
        Your cart is empty. Please add items before checking out.
      </div>
    );
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
            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="text" 
                id="city" 
                placeholder="City" 
                required 
                value={formData.city}
                onChange={handleInputChange}
              />
              <input 
                type="text" 
                id="pincode" 
                placeholder="Pincode" 
                required 
                value={formData.pincode}
                onChange={handleInputChange}
              />
            </div>
          
            <button type="submit" className="btn">Proceed to Payment</button>
          </form>
        </div>

        <div className="summary-section">
          <h2>Order Summary</h2>
          {finalItems.map((item, index) => (
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
            <span>₹ {finalTotal}</span>
          </div>
          <div className="price-row total">
            <span>Total</span>
            <span>₹ {finalTotal}</span>
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
