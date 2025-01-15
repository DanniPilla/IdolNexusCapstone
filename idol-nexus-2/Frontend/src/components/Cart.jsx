import PropTypes from 'prop-types';

import { useContext } from 'react';
import { CartContext } from '../context/CartContext'

export default function Cart({ showModal, toggle }) {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } =
    useContext(CartContext);

  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-2/3 max-w-3xl">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h1 className="text-2xl font-bold">Your Cart</h1>
            <button
              className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              onClick={toggle}
            >
              Close
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  className="flex justify-between items-center border-b pb-4"
                  key={`${item.id}-${item.ticketType}`}
                >
                  <div className="flex gap-4">
                    <div>
                      <h1 className="text-lg font-bold">{item.eventName || 'Event'}</h1>
                      <p className="text-gray-600">Type: {item.ticketType}</p>
                      <p className="text-gray-600">Price: ${item.price}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <button
                      className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                      onClick={() => addToCart(item)}
                    >
                      +
                    </button>
                    <p>{item.quantity}</p>
                    <button
                      className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                      onClick={() => removeFromCart(item)}
                    >
                      -
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <h1 className="text-lg font-bold">Your cart is empty</h1>
            )}
          </div>
          {cartItems.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-bold">Total: ${getCartTotal()}</h2>
              <button
                className="mt-4 px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>
    )
  );
}

Cart.propTypes = {
  showModal: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};