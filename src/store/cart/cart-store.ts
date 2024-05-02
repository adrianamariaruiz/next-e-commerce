import { CartProduct } from "@/interfaces/product.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;
  getCartSummary: () => {
    subTotal: number;
    tax: number;
    total: number;
    totalItemsCart: number;
  };

  addProductTocart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void
  removeProduct: (product: CartProduct) => void;
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

      // calcular todo lo que tengo en el summary del cart
      getCartSummary: () => {
        const {cart}= get();
        const subTotal = cart.reduce( (subTotal, item) => (item.quantity + item.price) + subTotal, 0 )
        const tax = subTotal * 0.15
        const total = subTotal + tax
        const totalItemsCart = cart.reduce( (total, item) => total + item.quantity, 0 )

        return {
          subTotal, tax, total, totalItemsCart
        }
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

      // actualiza la cantidad de productos del carrito
      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();

        const updateQuantity = cart.map( (item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: quantity };
          }
          return item;
        } )

        set({cart: updateQuantity})
      },

      // eliminar producto del carrito
      removeProduct: (product: CartProduct) => {
        const { cart } = get();

        const deleteProduct = cart.filter( 
          item => item.id !== product.id || item.size !== product.size
        )

        set({cart: deleteProduct})
        
      }
     
    }),
    
    // Le pongo el nombre del store (la key en el localstorage)
    {
      name: 'e-commerce-cart'
    }
  )

);