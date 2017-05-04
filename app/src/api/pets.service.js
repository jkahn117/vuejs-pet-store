/**
 *
 */

import axios from 'axios'

import SignedRequest from './util/signed-request'

export default {
  async getPets () {
    let signedRequest = SignedRequest.build('GET', '/Prod/pets', null)
    let response = await axios(signedRequest)

    if (response.data.success) {
      return response.data.results
    } else {
      console.error('pets#list - Bad data')
      // TODO: add real 'throw ERROR'
    }
  },

  async getPetById (id) {
    let signedRequest = SignedRequest.build('GET', `/Prod/pets/${id}`, null)
    let response = await axios(signedRequest)

    if (response.data.success) {
      return response.data.result
    } else {
      console.error('pets#get - Bad data')
      // TODO: add real 'throw ERROR'
    }
  },

  /**
   * Update the pet record on the server.
   *
   * @param  {[JSON} pet form data describing updates to pet
   */
  async updatePet (pet) {
    let signedRequest = SignedRequest.build('PUT', `/Prod/pets/${pet.uuid}`, pet)
    let response = await axios(signedRequest)

    // let response = await http.put(`pets/${pet.uuid}`, pet)
    if (response.status === 200) {
      return Promise.resolve()
    } else {
      console.error('pets#update - Bad data')
      return Promise.reject()
    }
  }
}
