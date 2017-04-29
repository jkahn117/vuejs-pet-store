import * as types from './mutation-types'

export const sellPet = ({ commit }, pet) => {
  if (pet.available) {
    commit(types.PET_SOLD, {
      id: pet.id
    })
  }
}
