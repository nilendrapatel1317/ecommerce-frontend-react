import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../services/UserService';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('All fields are required!');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match.');
      toast.error('New password and confirm password do not match.');
      return;
    }
    try {
      await changePassword({ currentPassword, newPassword });
      setShowModal(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change password');
      toast.error(err.response?.data?.message || 'Failed to change password');
    }
  };

  const handleModalOk = () => {
    setShowModal(false);
    navigate('/profile');
  };

  return (
    <>
      <div className="container max-w-md mx-auto mt-8 bg-white p-8 rounded shadow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Change Password</h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <form onSubmit={handleChangePassword}>
            <input
              className="w-full mb-4 px-3 py-2 border rounded"
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              required
            />
            <input
              className="w-full mb-4 px-3 py-2 border rounded"
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
            />
            <input
              className="w-full mb-6 px-3 py-2 border rounded"
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
            >
              Change Password
            </button>
          </form>
        </motion.div>
      </div>
      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-8 rounded shadow-lg max-w-sm w-full text-center">
            <h3 className="text-xl font-bold mb-4">Password Changed Successfully</h3>
            <button
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition"
              onClick={handleModalOk}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
} 