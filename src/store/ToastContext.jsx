import { createContext, useState, useContext } from 'react';

const ToastContext = createContext({
  showToast: () => {},
});

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  function showToast(message, type = 'success') {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999
      }}>
        {toasts.map(toast => (
          <div
            key={toast.id}
            style={{
              padding: '1rem 1.5rem',
              marginBottom: '0.5rem',
              borderRadius: '8px',
              backgroundColor: toast.type === 'success' ? '#4caf50' : toast.type === 'error' ? '#f44336' : '#ff9800',
              color: 'white',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              minWidth: '250px',
              animation: 'slideIn 0.3s ease-out'
            }}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}

export default ToastContext;
