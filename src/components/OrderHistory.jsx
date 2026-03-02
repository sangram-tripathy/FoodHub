import { useContext, useState, useEffect } from 'react';
import Modal from './UI/Modal';
import Button from './UI/Button';
import Loading from './UI/Loading';
import UserProgressContext from '../store/UserProgressContext';
import AuthContext from '../store/AuthContext';
import { currencyFormatter } from '../util/formatting';
import { API_URL } from '../config';

export default function OrderHistory() {
  const userProgressCtx = useContext(UserProgressContext);
  const authCtx = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const isOpen = userProgressCtx.progress === 'orderHistory';

  useEffect(() => {
    if (isOpen && authCtx.token) {
      fetchOrders();
    }
  }, [isOpen, authCtx.token]);

  async function fetchOrders() {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/orders/my-orders`, {
        headers: {
          'Authorization': `Bearer ${authCtx.token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleClose() {
    userProgressCtx.hideOrderHistory();
  }

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <h2>My Orders</h2>
      
      {isLoading && <Loading message="Loading your orders..." />}
      
      {error && <p className="center" style={{ color: 'red' }}>Failed to load orders: {error}</p>}
      
      {!isLoading && !error && orders.length === 0 && (
        <p className="center">You haven't placed any orders yet.</p>
      )}
      
      {!isLoading && !error && orders.length > 0 && (
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {orders.map((order) => (
            <div 
              key={order._id} 
              style={{ 
                border: '1px solid #ccc', 
                borderRadius: '8px', 
                padding: '1rem', 
                marginBottom: '1rem',
                backgroundColor: '#f9f9f9'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <strong style={{ color: '#1d1a16' }}>Order #{order._id.slice(-6)}</strong>
                <span style={{ 
                  padding: '0.25rem 0.5rem', 
                  borderRadius: '4px', 
                  backgroundColor: order.status === 'delivered' ? '#4caf50' : '#ff9800',
                  color: 'white',
                  fontSize: '0.85rem'
                }}>
                  {order.status}
                </span>
              </div>
              
              <p style={{ fontSize: '0.9rem', color: '#666', margin: '0.25rem 0' }}>
                {new Date(order.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
              
              <div style={{ marginTop: '0.75rem' }}>
                <strong style={{ color: '#1d1a16' }}>Items:</strong>
                <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
                  {order.items.map((item, index) => (
                    <li key={index} style={{ fontSize: '0.9rem', color: '#1d1a16' }}>
                      {item.name} x {item.quantity} - {currencyFormatter.format(item.price * item.quantity)}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #ddd' }}>
                <strong style={{ color: '#1d1a16' }}>Delivery Address:</strong>
                <p style={{ fontSize: '0.9rem', margin: '0.25rem 0', color: '#1d1a16' }}>
                  {order.customer.name}<br />
                  {order.customer.street}, {order.customer.city}<br />
                  {order.customer['postal-code']}
                </p>
              </div>
              
              <div style={{ marginTop: '0.75rem', fontSize: '1.1rem', fontWeight: 'bold', textAlign: 'right', color: '#1d1a16' }}>
                Total: {currencyFormatter.format(order.totalAmount || 0)}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <p className="modal-actions">
        <Button onClick={handleClose}>Close</Button>
      </p>
    </Modal>
  );
}
