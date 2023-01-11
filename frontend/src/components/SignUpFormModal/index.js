import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from '../SignupFormPage ';
import LoginForm from '../LoginForm/LoginForm';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='login' onClick={() => setShowModal(true)}>Sign Up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {/* <LoginForm /> */}
          <SignupFormPage />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
