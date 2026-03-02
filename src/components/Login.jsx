import { useContext, useState } from 'react';
import Modal from './UI/Modal';
import Input from './UI/Input';
import Button from './UI/Button';
import AuthContext from '../store/AuthContext';
import UserProgressContext from '../store/UserProgressContext';
import { useToast } from '../store/ToastContext';

export default function Login() {
  const authCtx = useContext(AuthContext);
  const userProgressCtx = useContext(UserProgressContext);
  const { showToast } = useToast();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleClose() {
    userProgressCtx.hideLogin();
    setError('');
  }

  function handleShowSignup() {
    console.log('Signup button clicked!');
    userProgressCtx.hideLogin();
    userProgressCtx.showSignup();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    const result = await authCtx.login(email, password);

    setIsLoading(false);

    if (result.success) {
      showToast('Login successful! Welcome back!', 'success');
      handleClose();
    } else {
      setError(result.message);
      showToast(result.message, 'error');
    }
  }

  return (
    <Modal open={userProgressCtx.progress === 'login'} onClose={handleClose}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <Input label="Email" type="email" id="email" name="email" required />
        <Input label="Password" type="password" id="password" name="password" required />
        
        {error && <p className="error">{error}</p>}
        
        <p className="modal-actions">
          <Button type="button" textOnly onClick={handleClose}>
            Cancel
          </Button>
          <Button disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </p>
      </form>
      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        Don't have an account?{' '}
        <button 
          type="button" 
          onClick={handleShowSignup}
          style={{ background: 'none', border: 'none', color: '#ffc404', cursor: 'pointer', textDecoration: 'underline' }}
        >
          Sign up
        </button>
      </p>
    </Modal>
  );
}
