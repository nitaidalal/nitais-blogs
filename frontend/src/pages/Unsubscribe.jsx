import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { axios } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [unsubscribed, setUnsubscribed] = useState(false);

  const handleUnsubscribe = async () => {
    console.log('Unsubscribe token:', token);
    setLoading(true);
    try {
      const response = await axios.post('/newsletter/unsubscribe', { token });
      
      if (response.data.success) {
        toast.success(response.data.message);
        setUnsubscribed(true);
      }
      console.log('Unsubscribe response:', response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to unsubscribe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Unsubscribe from Newsletter</h1>
        
        {!unsubscribed ? (
          <>
            {/* <p className="text-gray-600 mb-2">Email: <strong>{email}</strong></p> */}
            <p className="text-gray-500 mb-6">
              Are you sure you want to unsubscribe?
            </p>
            <button

              onClick={handleUnsubscribe}
              disabled={loading}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Confirm Unsubscribe'}
            </button>
          </>
        ) : (
          <div>
            <p className="text-green-600 text-lg mb-4">✓ Successfully Unsubscribed!</p>
            <p className="text-gray-600">You will no longer receive our newsletter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Unsubscribe;
