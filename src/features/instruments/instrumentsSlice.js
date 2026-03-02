import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchInstruments = createAsyncThunk(
    "instruments/fetchInstruments",
    async () => {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=8");
        const data = await response.json();
        
        // Имитируем задержку 2 секунды по ТЗ
        await new Promise((resolve) => setTimeout(resolve, 2000));
        
        return data.map(item => ({
            id: item.id,
            title: `BMW Series ${item.id} Concept`,
            body: item.body,
            specs: "Engine: Electric / Power: 544 hp"
        }));
    }
);

const instrumentsSlice = createSlice({
    name: "instruments",
    initialState: { 
        items: [], 
        status: "idle", 
        selectedItem: null 
    },
    reducers: {
        setItemDetail: (state, action) => { 
            state.selectedItem = action.payload; 
        },
        clearDetail: (state) => { 
            state.selectedItem = null; 
        },
        // CREATE
        addInstrument: (state, action) => {
            state.items.unshift(action.payload);
        },
        // DELETE
        deleteInstrument: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            if (state.selectedItem?.id === action.payload) state.selectedItem = null;
        },
        // UPDATE
        updateInstrument: (state, action) => {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.items[index].title = action.payload.title;
                if (state.selectedItem?.id === action.payload.id) {
                    state.selectedItem.title = action.payload.title;
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInstruments.pending, (state) => { 
                state.status = "loading"; 
            })
            .addCase(fetchInstruments.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            });
    }
});

export const { 
    setItemDetail, 
    clearDetail, 
    addInstrument, 
    deleteInstrument, 
    updateInstrument 
} = instrumentsSlice.actions;

export default instrumentsSlice.reducer;