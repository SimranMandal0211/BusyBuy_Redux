// for creating slice and AsycnThunk
import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";

// firebase database
import {db} from "../../firebaseInit";
import { updateDoc, doc, arrayUnion, onSnapshot, arrayRemove } from "firebase/firestore";

// for toast notificatioins
import { toast } from "react-toastify";

// slice to manage operation of products
const productSlice = createSlice({
    name: "product",
    initialState: {
        cart: [],
        itemInCart: 0,
        myorders: [],
        total: 0,
    },

    reducers: {
        setMyOrders: (state, action) => {
            state.myorders = action.payload;
            return;
        },

        // increase quantity of a product in cart
        increaseProductQuantity: (state, action) => {
            const index = action.payload;
            state.cart.at(index).quantity++;
            return;
        },

        // decrease quantity of a product in cart
        decreaseProductQuantity: (state, action) => {
            const index = action.payload;
            state.cart.at(index).quantity--;
            return;
        },

        // initialize the cart array on first render
        setCart: (state, action) => {
            state.cart = action.payload;
            return;
        },

        // to increase the total number of items in cart
        increaseTotalItem: (state, action) => {
            state.itemInCart++;
            return;
        },

        // to increase the total amount of products inside the cart
        increaseTotalAmount: (state,action) => {
            state.total += action.payload;
            return;
        },

        // to decrease the total amount of products inside the cart
        reduceTotalAmount: (state,action) => {
            state.total -= action.payload;
            return;
        }
    },

    extraReducers: (builder) => {
        // update the stat after getting data from database
        builder.addCase(getInitialCartOrdersThunk.fulfilled, (state, action) => {
            const cart = action.payload;
            if(cart){
                let sum = 0, len=0;
                cart.map((item) => {
                    Number(sum += item.price * item.quantity);
                    Number(len += item.quantity);
                });
                state.total = sum;
                state.itemInCart = len;
            }
        })
        // update state after increasing product quantity in cart and database 
        .addCase(increaseQuantThunk.fulfilled, (state, action) => {
            state.itemInCart++;
        })
        
        // Update state after decreasing product quantity in cart and database
        .addCart(decreaseQuantThunk.fulfilled, (state, action) => {
            if(state.itemInCart > 1){
                state.itemInCart--;
            }
        })

        // update state after removing product from cart and database
        .addCase(removeFormCartThunk.fulfilled, (state, action) => {
            const product = action.payload;
            // reduce item count and total amount
            state.total -= product.quantity * product.price;
            state.itemInCart -= product.quantity;
            // notification
            toast.success(" Remove from Cart!!");
        })

        // update state after removing all products from cart
        .addCart(clearCartThunk.fulfilled, (state,action) => {
            state.itemInCart = 0;
            state.total = 0;
            state.cart = [];
        })
    }
});



// exporting the reducer of slice
export const productReducer = productSlice.reducer;

// exporting all the actions of reducer
export const { setMyOrders, 
            increaseProductQuantity, 
            decreaseProductQuantity, 
            setCart, 
            increaseTotalItem,
            increaseTotalAmount, 
            reduceTotalAmount } = productSlice.actions;


// exporting the state of reducer to get data
export const productSelector = (state) => state.productReducer;