import { orderService } from "@/services/order/order-service";
import { Action, Dispatch, ThunkAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { stat } from "fs";

export interface Order {
    id: number;
    client: string;
    deliveryAddress: string;
    status: string;
}

interface OrderState {
    orders: Order[];
    loading: boolean;
    error: string | null;
}

const initialState: OrderState = {
    orders: [],
    loading: false,
    error: null,
};

export const getOrders = createAsyncThunk('order/getOrders', orderService.getListOrder);

export const newOrder = createAsyncThunk('order/create', async (order: Partial<Order>) => {
    const res = await orderService.create(order)
    return res
})
export const updateOrder = createAsyncThunk('order/update', async (order: Partial<Order>) => {
    const res = await orderService.update(order)
    return res
})

export const removeOrder = createAsyncThunk('order/remove', async (id: any) => {
    const res = await orderService.delete(id)
    return res
})

export const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(
                getOrders.fulfilled,
                (state, { payload }) => {
                    return {
                        ...state,
                        orders: payload,
                        loading: false,
                        error: null,
                    };
                },
            )
            .addCase(
                getOrders.pending,
                (state, { payload }) => {
                    return {
                        ...state,
                        loading: true,
                        error: null, 
                    };
                },
            )
            .addCase(
                getOrders.rejected,
                (state, { payload }: any) => {
                    if (payload && payload.error === 'Unauthorized') {
                        return {
                            ...state,
                            orders: [], 
                            loading: false,
                            error: 'Unauthorized',
                        };
                    }
                    return {
                        ...state,
                        loading: false,
                        error: 'Erro desconhecido',
                    };
                },
            )
            .addCase(
                newOrder.fulfilled,
                (state, { payload }) => {
                    return {
                        ...state,
                        orders: [...state.orders, payload],
                        error: null,
                        loading: false,
                    };
                },
            )
            .addCase(
                newOrder.pending,
                (state, { payload }) => {
                    return {
                        ...state,
                        loading: true,
                        error: null, 
                    };
                },
            )
            .addCase(
                newOrder.rejected,
                (state, { payload }: any) => {
                    if (payload && payload.error === 'Unauthorized') {
                        return {
                            ...state,
                            orders: [], 
                            loading: false,
                            error: 'Unauthorized',
                        };
                    }
                    return {
                        ...state,
                        loading: false,
                        error: 'Erro desconhecido',
                    };
                },
            )
            .addCase(
                updateOrder.fulfilled,
                (state, { payload }) => {
                    return {
                        ...state,
                        orders: state.orders.map(order =>
                            order.id === payload.id ? { ...order, ...payload } : order
                        ),
                        error: null,
                        loading: false,
                    };
                },
            )
            .addCase(
                updateOrder.pending,
                (state, { payload }) => {
                    return {
                        ...state,
                        loading: true,
                        error: null, 
                    };
                },
            )
            .addCase(
                updateOrder.rejected,
                (state, { payload }: any) => {
                    if (payload && payload.error === 'Unauthorized') {
                        return {
                            ...state,
                            orders: [], 
                            loading: false,
                            error: 'Unauthorized',
                        };
                    }
                    return {
                        ...state,
                        loading: false,
                        error: 'Erro desconhecido',
                    };
                },
            )
            .addCase(
                removeOrder.fulfilled,
                (state, { payload }) => {
                    return {
                        ...state,
                        orders: state.orders.filter(order => order.id !== payload.id),
                        loading: false,
                        error: null,
                    };
                },
            )
            .addCase(
                removeOrder.pending,
                (state, { payload }) => {
                    return {
                        ...state,
                        loading: true,
                        error: null, 
                    };
                },
            )
            .addCase(
                removeOrder.rejected,
                (state, { payload }: any) => {
                    if (payload && payload.error === 'Unauthorized') {
                        return {
                            ...state,
                            orders: [], 
                            loading: false,
                            error: 'Unauthorized',
                        };
                    }
                    return {
                        ...state,
                        loading: false,
                        error: 'Erro desconhecido',
                    };
                },
            )
    }
})

export default ordersSlice.reducer;
export const orderSelector = (state: RootState) => state.orderReducer;