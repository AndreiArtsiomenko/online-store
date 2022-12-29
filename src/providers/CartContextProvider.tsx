import { createContext, Dispatch, FC, PropsWithChildren, useReducer } from 'react';
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

const initialCartState: InitialCartState = {
  promo: [],
  products: [],
};

type ActionType =
  | { type: 'addProduct'; payload: CartProduct }
  | { type: 'deleteProduct'; payload: CartProduct }
  | { type: 'incCount'; payload: CartProduct }
  | { type: 'decCount'; payload: CartProduct };

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

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
