import { atom } from 'recoil'

export const alertState = atom({
  key: 'alertState',
  default: ''
})

export const emailState = atom({
  key: 'emailState',
  default: ''
})

export const firstnameState = atom({
  key: 'firstnameState',
  default : ''
})

export const lastnameState = atom({
  key: 'lastnameState',
  default: ''
})

export const addressState = atom({
  key: 'addressState',
  default: ''
})

export const cityState = atom({
  key: 'cityState',
  default : ''
})

export const orderIdState = atom({
  key: 'orderIdState',
  default: 0
})
