import { useContext } from 'react';
import { formatPrice } from '../util/formatting';
import Button from './UI/Button';
import CartContext from '../store/CartContext';
import useHttp from '../hooks/useHttp';
import Error from './Error';

const requestConfig = {};

export default function Meals({}) {
  const { addItem } = useContext(CartContext);
  const {
    data: meals,
    isLoading,
    error,
  } = useHttp('http://localhost:3000/meals', requestConfig, []);

  if (isLoading) {
    return <div className="center">Loading...</div>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  function handleAddMealToCart(meal) {
    addItem(meal);
  }

  return (
    <ul id="meals">
      {meals.length > 0 ? (
        meals.map((meal) => (
          <li key={meal.id} className="meal-item">
            <article>
              <img src={`http://localhost:3000/${meal.image}`} />
              <div>
                <h3>{meal.name}</h3>
                <p className="meal-item-price">{formatPrice(meal.price)}</p>
                <p className="meal-item-description">{meal.description} </p>
                <p className="meal-item-actions">
                  <Button
                    onClick={() => handleAddMealToCart(meal)}
                    className="button"
                  >
                    Add to Cart
                  </Button>
                </p>
              </div>
            </article>
          </li>
        ))
      ) : (
        <div>no meals</div>
      )}
    </ul>
  );
}
