import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{textAlign:"center", padding:"80px"}}>
      <h1>🎉 Payment Successful</h1>
      <p>Your order has been placed successfully.</p>

      <button 
        onClick={() => navigate("/")}
        style={{
          padding:"12px 25px",
          background:"#000",
          color:"#fff",
          border:"none",
          borderRadius:"6px",
          cursor:"pointer",
          marginTop:"20px"
        }}
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default PaymentSuccess;

