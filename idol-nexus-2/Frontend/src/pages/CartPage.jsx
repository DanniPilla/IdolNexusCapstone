import { Helmet } from "react-helmet-async";
import { useState } from "react";
import Cart from "../components/Cart";
export default function CartPage() {
const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div>
      <button onClick={toggleModal} className="btn-open-cart">
        Open Cart
      </button>
      <Cart showModal={showModal} toggle={toggleModal} />
    </div>
  );
};

