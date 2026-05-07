import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchMyOrders } from '../api';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, authLoading, navigate]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const { data } = await fetchMyOrders();
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      getOrders();
    }
  }, [isLoggedIn]);

  if (authLoading) return <div className="section__container">Loading...</div>;
  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="section__container profile-page">
      <h2 className="section__header">MY PROFILE</h2>
      
      <div className="profile-grid">
        <div className="profile-info-card">
          <div className="profile-avatar">
            <i className="ri-user-3-fill"></i>
          </div>
          <h3>{user.name}</h3>
          <p className="email">{user.email}</p>
          <p className="joined">Member of Aurazy</p>
          <button className="btn logout-btn" onClick={handleLogout}>LOGOUT</button>
        </div>

        <div className="orders-section">
          <h3>Recent Orders</h3>
          {loading ? (
            <p>Loading orders...</p>
          ) : orders.length > 0 ? (
            <div className="orders-list">
              {orders.map(order => (
                <div key={order._id} className="order-card">
                  <div className="order-header">
                    <strong>Order #{order._id.slice(-6).toUpperCase()}</strong>
                    <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="order-items">
                     {order.items.map((item: any, idx: number) => (
                       <div key={idx} className="order-item-mini">
                          {item.name} (x{item.quantity})
                       </div>
                     ))}
                  </div>
                  <div className="order-details">
                    <span>Status: <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></span>
                    <strong>₹ {order.totalPrice}</strong>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>You haven't placed any orders yet.</p>
          )}
        </div>
      </div>

      <style>{`
        .profile-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 3rem;
          margin-top: 2rem;
          color: #000;
        }

        .profile-info-card {
          background: #f9f9f9;
          padding: 2rem;
          border-radius: 12px;
          text-align: center;
          height: fit-content;
        }

        .profile-avatar {
          width: 80px;
          height: 80px;
          background: var(--primary-color);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          font-size: 2.5rem;
          color: #fff;
        }

        .profile-info-card h3 {
          margin-bottom: 0.5rem;
        }

        .profile-info-card .email {
          color: #737373;
          margin-bottom: 0.5rem;
        }

        .profile-info-card .joined {
          font-size: 0.9rem;
          color: #999;
          margin-bottom: 1.5rem;
        }

        .logout-btn {
          width: 100%;
          background: #ff4d4d;
          color: white;
          border: none;
          padding: 10px;
          border-radius: 5px;
          cursor: pointer;
          font-weight: 600;
        }

        .logout-btn:hover {
          background: #cc0000;
        }

        .orders-section h3 {
          margin-bottom: 1.5rem;
          border-bottom: 2px solid var(--primary-color);
          display: inline-block;
          padding-bottom: 0.5rem;
        }

        .order-card {
          background: #fff;
          border: 1px solid #eee;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          transition: 0.3s;
        }

        .order-card:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .order-items {
          font-size: 0.9rem;
          color: #555;
          margin-bottom: 0.5rem;
        }

        .order-details {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .status.paid { color: #28a745; }
        .status.pending { color: #ffc107; }
        .status.failed { color: #dc3545; }

        @media (max-width: 768px) {
          .profile-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Profile;
