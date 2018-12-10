export interface Card extends ApiResponse {
  id: number,
  image: string,
  label: string,
  title: string,
  description: string,
  url: string
}

export type ApiResponse = Record<string, any>

export const enum CardsActionTypes {
  FETCH_REQUEST = '@@cards/FETCH_REQUEST',
  FETCH_SUCCESS = '@@cards/FETCH_SUCCESS',
  FETCH_ERROR = '@@cards/FETCH_ERROR',
  SELECTED = '@@cards/SELECTED'
}

export interface CardsState {
  readonly loading: boolean
  readonly data: Card[]
  readonly errors?: string
}