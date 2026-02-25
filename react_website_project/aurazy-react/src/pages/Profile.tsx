import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  if (!user) return null;

  // Mock data
  const orders = [
    { id: "#ORD-101", date: "20 Feb 2025", status: "Delivered", total: "₹1,499" },
    { id: "#ORD-105", date: "24 Feb 2025", status: "Processing", total: "₹699" },
  ];

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
          <p className="joined">Member since: January 2025</p>
          <button className="btn logout-btn" onClick={handleLogout}>LOGOUT</button>
        </div>

        <div className="orders-section">
          <h3>Recent Orders</h3>
          {orders.length > 0 ? (
            <div className="orders-list">
              {orders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <strong>{order.id}</strong>
                    <span>{order.date}</span>
                  </div>
                  <div className="order-details">
                    <span>Status: <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></span>
                    <strong>{order.total}</strong>
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

        .order-details {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .status.delivered { color: #28a745; }
        .status.processing { color: #ffc107; }

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
