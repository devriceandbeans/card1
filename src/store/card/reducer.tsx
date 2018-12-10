import { Reducer } from 'redux'
import { CardsState, CardsActionTypes } from './types'

const initialState: CardsState = {
  data: [],
  errors: undefined,
  loading: false
}

const reducer: Reducer<CardsState> = (state = initialState, action) => {
  switch (action.type) {
    case CardsActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true }
    }
    case CardsActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload }
    }
    case CardsActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload }
    }
    default: {
      return state
    }
  }
}

export { reducer as cardsReducer }