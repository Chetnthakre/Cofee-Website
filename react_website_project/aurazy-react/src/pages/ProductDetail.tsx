import React, { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import { fetchProducts } from '../api';
import { useCart } from '../context/CartContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
 
  const { addToCart } = useCart();
 
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('L');
  const [quantity, setQuantity] = useState(1);

  const BASE_URL = 'https://aurazy-backend-2.onrender.com';

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const { data } = await fetchProducts();
        const found = data.find((p: any) => p._id === id);
        setProduct(found);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return <div className="section__container">Loading...</div>;
  }

  if (!product) {
    return <div className="section__container">Product not found.</div>;
  }

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.newPrice,
      size: selectedSize,
      quantity: quantity,
      image: product.image
    });
  };

  const handleBuyNow = () => {
    navigate("/checkout", {
      state: {
        product: {
          id: product._id,
          name: product.name,
          price: product.newPrice,
          size: selectedSize,
          quantity: quantity,
          image: product.image
        }
      }
    });
  };


  return (
    <div className="product-page">
      <div className="section__container product-wrapper">
        <div className="product-images">

<img
  src={
    product.image?.startsWith("http")
      ? product.image
      : `${BASE_URL}${product.image}`
  }
  alt={product.name}
/>


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
              <a href="#" style={{ textDecoration: 'underline', fontSize: '0.9rem' }}>Size Guide</a>
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
            <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Quantity</p>
            <div className="qty-box">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <span>{quantity}</span>
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
