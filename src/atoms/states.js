import {atom} from 'recoil'

export const priceState = atom({
  key: 'priceState',
  default: ''
})

export const colorState = atom({
  key: 'colorState',
  default: null
})

export const qtyState = atom({
  key: 'qtyState',
  default : 0
})
