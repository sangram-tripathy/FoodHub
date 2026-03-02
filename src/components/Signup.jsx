import { useContext, useState } from 'react';
import Modal from './UI/Modal';
import Input from './UI/Input';
import Button from './UI/Button';
import AuthContext from '../store/AuthContext';
import UserProgressContext from '../store/UserProgressContext';
import { useToast } from '../store/ToastContext';

export default function Signup() {
  const authCtx = useContext(AuthContext);
  const userProgressCtx = useContext(UserProgressContext);
  const { showToast } = useToast();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  console.log('Signup component rendered, progress:', userProgressCtx.progress);
  console.log('Modal should be open:', userProgressCtx.progress === 'signup');

  function handleClose() {
    userProgressCtx.hideSignup();
    setError('');
  }

  function handleShowLogin() {
    userProgressCtx.hideSignup();
    userProgressCtx.showLogin();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    const result = await authCtx.signup(name, email, password);

    setIsLoading(false);

    if (result.success) {
      showToast('Account created successfully! Welcome to FoodHub!', 'success');
      handleClose();
    } else {
      setError(result.message);
      showToast(result.message, 'error');
    }
  }

  return (
    <Modal open={userProgressCtx.progress === 'signup'} onClose={handleClose}>
      <h2>Sign Up</h2>
      <p style={{ color: '#1d1a16' }}>Create your account</p>
      <form onSubmit={handleSubmit}>
        <Input label="Name" type="text" id="name" name="name" required />
        <Input label="Email" type="email" id="email" name="email" required />
        <Input label="Password" type="password" id="password" name="password" required />
        <Input label="Confirm Password" type="password" id="confirmPassword" name="confirmPassword" required />
        
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        
        <p className="modal-actions">
          <Button type="button" textOnly onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </Button>
        </p>
      </form>
      <p style={{ textAlign: 'center', marginTop: '1rem', color: '#1d1a16' }}>
        Already have an account?{' '}
        <button 
          type="button" 
          onClick={handleShowLogin}
          style={{ background: 'none', border: 'none', color: '#ffc404', cursor: 'pointer', textDecoration: 'underline', fontSize: '1rem' }}
        >
          Login
        </button>
      </p>
    </Modal>
  );
}