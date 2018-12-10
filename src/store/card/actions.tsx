import { action } from 'typesafe-actions'
import { CardsActionTypes, Card } from './types'

export const fetchRequest = () => action(CardsActionTypes.FETCH_REQUEST)
export const fetchSuccess = (data: Card[]) => action(CardsActionTypes.FETCH_SUCCESS, data)
export const fetchError = (message: string) => action(CardsActionTypes.FETCH_ERROR, message)