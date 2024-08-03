import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CoinState {
    selectedCoin: string
    selectedCoinCode: string
    selectedCoinLogo: string
    dropdownVisible: boolean
}

const initialState: CoinState = {
    selectedCoin: '',
    selectedCoinCode: '',
    selectedCoinLogo: '',
    dropdownVisible: false,
}

const coinSlice = createSlice({
    name: 'coin',
    initialState,
    reducers: {
        selectCoin: (state, action: PayloadAction<{ name: string, code: string, logo: string }>) => {
            state.selectedCoin = action.payload.name
            state.selectedCoinCode = action.payload.code
            state.selectedCoinLogo = action.payload.logo
        },
        setDropdownVisibility: (state, action: PayloadAction<boolean>) => {
            state.dropdownVisible = action.payload
        },
    },
})

export const { selectCoin, setDropdownVisibility } = coinSlice.actions
export default coinSlice.reducer