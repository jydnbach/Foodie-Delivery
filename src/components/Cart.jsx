import { useContext } from 'react';

import Modal from './UI/Modal';
import CartContext from '../store/CartContext';
import Button from './UI/Button';
import { formatPrice } from '../util/formatting';
import UserProgressContext from '../store/UserProgressContext';

export default function Cart({}) {
  const { items, addItem, removeItem } = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  // total price calculation
  let totalPrice = 0;
  for (let item of items) {
    totalPrice += Number(item.price * item.quantity);
  }

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  function handleGoToCheckout() {
    userProgressCtx.showCheckout();
  }

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === 'cart'}
      onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="cart-item">
            <p>
              {item.name} - {item.quantity} x {formatPrice(item.price)}
            </p>
            <p className="cart-item-actions">
              <button onClick={() => removeItem(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => addItem(item)}>+</button>
            </p>
          </li>
        ))}
      </ul>
      <p className="cart-total">{formatPrice(totalPrice)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {items.length > 0 && (
          <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
