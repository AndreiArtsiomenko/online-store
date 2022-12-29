import { createContext, Dispatch, FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { Product } from '../models/product.model';

export interface CartProduct {
  productInfo: Product;
  count: number;
}

interface InitialCartState {
  promo: string[];
  products: CartProduct[];
}

type CartContextType = {
  state: InitialCartState;
  dispatch: Dispatch<ActionType>;
};

const getInitialCartState = (): InitialCartState => {
  const cartData: null | string = localStorage.getItem('cart');
  if (cartData) {
    const initialState = JSON.parse(cartData) as InitialCartState;
    return initialState;
  }
  return {
    promo: [],
    products: [],
  };
};

const initialCartState = getInitialCartState();

type ActionType =
  | { type: 'addProduct'; payload: CartProduct }
  | { type: 'deleteProduct'; payload: CartProduct }
  | { type: 'incCount'; payload: CartProduct }
  | { type: 'decCount'; payload: CartProduct }
  | {
      type: 'setState';
      payload: InitialCartState;
    };

export const CartContext = createContext<CartContextType>({
  state: initialCartState,
  dispatch: () => {
    console.log('CartContext');
  },
});

const cartReducer = (state: InitialCartState, action: ActionType): InitialCartState => {
  switch (action.type) {
    case 'addProduct': {
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    }
    case 'deleteProduct': {
      return {
        ...state,
        products: state.products.filter((product) => product.productInfo.id !== action.payload.productInfo.id),
      };
    }
    case 'incCount': {
      return {
        ...state,
        products: state.products.map((product) => {
          if (product.productInfo.id === action.payload.productInfo.id) {
            return {
              ...product,
              count: product.count + 1,
            };
          }
          return product;
        }),
      };
    }
    case 'decCount': {
      return {
        ...state,
        products: state.products.map((product) => {
          if (product.productInfo.id === action.payload.productInfo.id) {
            return {
              ...product,
              count: product.count - 1,
            };
          }
          return product;
        }),
      };
    }
    default:
      return state;
  }
};

const CartContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  const value = { state, dispatch };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
