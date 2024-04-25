import { CartProduct } from "@/interfaces/product.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;
  addProductTocart: (product: CartProduct) => void;
}

export const useCartStore = create<State>()(

  persist(

    (set, get) => ({
      cart: [],

      // Methods
      
      getTotalItems: () => {
        const {cart}= get();
        return cart.reduce( (total, item) => total + item.quantity, 0 )
      },

      addProductTocart: (product: CartProduct) => {
        const { cart } = get();

        // Me aseguro si el producto existe en el carrito con la talla seleccionada
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        // actualiza (agrego) la cantidad de productos por talla en el carrito
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }

          return item;
        });

        set({ cart: updatedCartProducts });
      },
     
    }),
    
    // Le pongo el nombre del store (la key en el localstorage)
    {
      name: 'e-commerce-cart'
    }
  )

);