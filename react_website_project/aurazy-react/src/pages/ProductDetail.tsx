import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { PRODUCTS } from './Collection';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();
  
  const product = PRODUCTS.find(p => p.id === Number(id));

  const [selectedSize, setSelectedSize] = useState('L');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return <div className="section__container">Product not found.</div>;
  }

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: location } });
      return;
    }
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.newPrice,
      size: selectedSize,
      quantity: quantity,
      image: product.image
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    window.location.href = "#"; 
  };

  return (
    <div className="product-page">
      <div className="product-wrapper">
        <div className="product-images">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <div className="price-box">
            <span className="old-price">Rs. {product.oldPrice}</span>
            <span className="new-price">Rs. {product.newPrice}</span>
            <span className="sale-tag">Sale</span>
          </div>
          <p className="tax">Tax included.</p>

          <div className="option-block">
            <div className="option-header">
              <span>Size: <strong>{selectedSize}</strong></span>
              <a href="#">Size Guide</a>
            </div>
            <div className="size-options">
              {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                <button 
                  key={size}
                  className={selectedSize === size ? 'active' : ''}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="option-block">
            <p>Quantity</p>
            <div className="qty-box">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <span id="qty-value">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
          </div>

          <button className="add-cart" onClick={handleAddToCart}>ADD TO CART</button>
          <button className="buy-now" onClick={handleBuyNow}>BUY IT NOW</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
