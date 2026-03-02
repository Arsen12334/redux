import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// База данных с реальными изображениями BMW для сопоставления по ID
const bmwAssets = {
    1: { title: "BMW i4 eDrive40", img: "https://www.bmw.ru/content/dam/bmw/common/all-models/i-series/i4/2021/navigation/bmw-i4-eDrive40-snapshot-l.png", specs: "Electric / 340 hp" },
    2: { title: "BMW iX xDrive50", img: "https://www.bmw.ru/content/dam/bmw/common/all-models/i-series/ix/2021/navigation/bmw-ix-xDrive50-snapshot-l.png", specs: "Electric / 523 hp" },
    3: { title: "BMW 3 Series Sedan", img: "https://www.bmw.ru/content/dam/bmw/common/all-models/3-series/sedan/2022/navigation/bmw-3-series-sedan-snapshot-l.png", specs: "Petrol / 184 hp" },
    4: { title: "BMW 5 Series Sedan", img: "https://www.bmw.ru/content/dam/bmw/common/all-models/5-series/sedan/2023/navigation/bmw-5-series-sedan-snapshot-l.png", specs: "Petrol / 208 hp" },
    5: { title: "BMW 7 Series Sedan", img: "https://www.bmw.ru/content/dam/bmw/common/all-models/7-series/7-series-protection/navigation/bmw-7-series-sedan-snapshot-l.png", specs: "Petrol / 530 hp" },
    6: { title: "BMW X5 xDrive40i", img: "https://www.bmw.ru/content/dam/bmw/common/all-models/x-series/x5/2023/navigation/bmw-x5-snapshot-l.png", specs: "Petrol / 381 hp" },
    7: { title: "BMW X7 M60i", img: "https://www.bmw.ru/content/dam/bmw/common/all-models/x-series/x7/2022/navigation/bmw-x7-snapshot-l.png", specs: "Petrol / 530 hp" },
    8: { title: "BMW M4 Coupe", img: "https://www.bmw.ru/content/dam/bmw/common/all-models/m-series/m4-coupe/2020/navigation/bmw-m4-coupe-snapshot-l.png", specs: "Petrol / 510 hp" },
};

export const fetchInstruments = createAsyncThunk(
    "instruments/fetchInstruments",
    async () => {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=8");
        const data = await response.json();
        
        await new Promise((resolve) => setTimeout(resolve, 2000));
        
        return data.map(item => {
            // Берем данные из bmwAssets по ID, если их нет — ставим дефолт
            const asset = bmwAssets[item.id] || { 
                title: `BMW Series ${item.id}`, 
                img: "https://www.bmw.ru/content/dam/bmw/common/all-models/i-series/i7/2022/navigation/bmw-i7-sedan-snapshot-l.png",
                specs: "Engine: Electric / Power: 544 hp" 
            };

            return {
                id: item.id,
                title: asset.title,
                img: asset.img, // Новое поле для фото
                body: item.body,
                specs: asset.specs
            };
        });
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
        // CREATE: добавляем фото по умолчанию для новых машин
        addInstrument: (state, action) => {
            const newEntry = {
                ...action.payload,
                img: action.payload.img || "https://www.bmw.ru/content/dam/bmw/marketRU/bmw_ru/all-models/m-series/m760e-xdrive/bmw-m760e-xdrive-snapshot-l.png"
            };
            state.items.unshift(newEntry);
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