import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

// Mock Assets
import arrival1 from '../assets/IMG_2689.PNG';
import arrival2 from '../assets/IMG_2690.PNG';
import arrival3 from '../assets/IMG_2692.PNG';

interface Product {
  id: number;
  name: string;
  oldPrice: number;
  newPrice: number;
  image: string;
  stock: 'in' | 'out';
  type: string;
  newness: number;
  bestSelling: number;
}

const PRODUCTS: Product[] = [
  { id: 1, name: "Jodha Peplum Kurti – A Jaipur Dream", oldPrice: 1299, newPrice: 499, image: arrival1, stock: 'in', type: 'hoodies', newness: 1, bestSelling: 20 },
  { id: 2, name: "Cocoa Short V-neck Kurti", oldPrice: 1499, newPrice: 699, image: arrival2, stock: 'in', type: 'coats', newness: 2, bestSelling: 15 },
  { id: 3, name: "Classic Tee", oldPrice: 899, newPrice: 399, image: arrival3, stock: 'in', type: 'tees', newness: 3, bestSelling: 10 },
  { id: 4, name: "Pink Floral Kurti", oldPrice: 1299, newPrice: 499, image: arrival1, stock: 'in', type: 'hoodies', newness: 4, bestSelling: 5 },
  { id: 5, name: "Blue Denim Jacket", oldPrice: 1999, newPrice: 999, image: arrival2, stock: 'in', type: 'coats', newness: 5, bestSelling: 30 },
  { id: 6, name: "White Summer Dress", oldPrice: 1599, newPrice: 799, image: arrival3, stock: 'out', type: 'tees', newness: 6, bestSelling: 2 },
  { id: 7, name: "Embroidered Top", oldPrice: 1299, newPrice: 599, image: arrival1, stock: 'in', type: 'hoodies', newness: 7, bestSelling: 8 },
  { id: 8, name: "Black Parka", oldPrice: 2499, newPrice: 1299, image: arrival2, stock: 'in', type: 'coats', newness: 8, bestSelling: 12 },
  { id: 9, name: "Grey Sweatshirt", oldPrice: 1199, newPrice: 599, image: arrival3, stock: 'in', type: 'tees', newness: 9, bestSelling: 18 },
  { id: 10, name: "Silk Kurta", oldPrice: 2999, newPrice: 1499, image: arrival1, stock: 'out', type: 'hoodies', newness: 10, bestSelling: 25 },
];

const Collection: React.FC = () => {
  const [searchParams] = useSearchParams();
  const typeFilter = searchParams.get('type');
  const searchFilter = searchParams.get('search');

  const [availability, setAvailability] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (typeFilter) {
      result = result.filter(p => p.type === typeFilter);
    }

    if (searchFilter) {
      const query = searchFilter.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.type.toLowerCase().includes(query)
      );
    }

    if (availability !== 'all') {
      result = result.filter(p => p.stock === availability);
    }

    switch (sortBy) {
      case 'low':
        result.sort((a, b) => a.newPrice - b.newPrice);
        break;
      case 'high':
        result.sort((a, b) => b.newPrice - a.newPrice);
        break;
      case 'new':
        result.sort((a, b) => b.newness - a.newness);
        break;
      case 'best':
        result.sort((a, b) => b.bestSelling - a.bestSelling);
        break;
      default:
        break;
    }

    return result;
  }, [availability, sortBy, typeFilter, searchFilter]);

  return (
    <section className="section__container collection__container">
      {searchFilter && (
        <h3 style={{ marginBottom: '2rem', color: '#000' }}>
          Showing results for "{searchFilter}" 
          <span 
            style={{ marginLeft: '10px', fontSize: '0.9rem', color: 'var(--text-light)', cursor: 'pointer' }}
            onClick={() => window.location.href = '/collection'}
          >
            (Clear)
          </span>
        </h3>
      )}
      <div className="collection__top">
        <div className="filters">
          <select 
            id="availability-filter" 
            value={availability} 
            onChange={(e) => setAvailability(e.target.value)}
          >
            <option value="all">Availability</option>
            <option value="in">In stock</option>
            <option value="out">Out of stock</option>
          </select>
        </div>

        <div className="sort">
          <select 
            id="sort-filter" 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Sort by</option>
            <option value="best">Best Selling</option>
            <option value="new">Newest</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="product__grid">
        {filteredProducts.map(product => (
          <div className="product__card" key={product.id}>
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.name} />
            </Link>
            <h4>{product.name}</h4>
            <p><span className="old">Rs. {product.oldPrice}</span> Rs. {product.newPrice}</p>
            <Link to={`/product/${product.id}`} className="btn">Choose Options</Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Collection;
export { PRODUCTS };
