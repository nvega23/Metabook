import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from '../SignupFormPage ';
import "./style.css"

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  const handleClick = (e) => {
    e.preventDefault()
    setShowModal(true)
  }

  return (
    <>
      <button className='signUp' onClick={handleClick}>Create new account</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupFormPage />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
