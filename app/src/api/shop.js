/**
 * Mock client-server processing for the time being
 */
const _pets = [
  {'id': 1, 'name': 'Cammy', 'age': 0, 'available': false, 'gender': 'Female', 'category': 'Dog', 'breed': null, 'description': 'Integer pede justo,  lacinia eget,  tincidunt eget,  tempus vel,  pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.'},
  {'id': 2, 'name': 'Wenda', 'age': 0, 'available': true, 'gender': 'Female', 'category': 'Dog', 'breed': null, 'description': 'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero,  rutrum ac,  lobortis vel,  dapibus at,  diam. Nam tristique tortor eu pede.'},
  {'id': 3, 'name': 'Geoffrey', 'age': 9, 'available': true, 'gender': 'Male', 'category': 'Dog', 'breed': null, 'description': 'Proin eu mi.'},
  {'id': 4, 'name': 'Isaac', 'age': 0, 'available': false, 'gender': 'Male', 'category': 'Dog', 'breed': null, 'description': 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo,  sollicitudin ut,  suscipit a,  feugiat et,  eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue,  diam id ornare imperdiet,  sapien urna pretium nisl,  ut volutpat sapien arcu sed augue. Aliquam erat volutpat.'},
  {'id': 5, 'name': 'Melita', 'age': 9, 'available': false, 'gender': 'Female', 'category': 'Cat', 'breed': null, 'description': 'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo,  sollicitudin ut,  suscipit a,  feugiat et,  eros.'},
  {'id': 6, 'name': 'Marney', 'age': 1, 'available': false, 'gender': 'Female', 'category': 'Cat', 'breed': null, 'description': 'Donec semper sapien a libero.'},
  {'id': 7, 'name': 'Charity', 'age': 6, 'available': true, 'gender': 'Female', 'category': 'Fish', 'breed': null, 'description': 'In congue. Etiam justo.'},
  {'id': 8, 'name': 'Delmore', 'age': 9, 'available': true, 'gender': 'Male', 'category': 'Fish', 'breed': null, 'description': 'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim.'},
  {'id': 9, 'name': 'Joye', 'age': 1, 'available': true, 'gender': 'Female', 'category': 'Fish', 'breed': null, 'description': 'Morbi ut odio. Cras mi pede,  malesuada in,  imperdiet et,  commodo vulputate,  justo. In blandit ultrices enim. Lorem ipsum dolor sit amet,  consectetuer adipiscing elit.'},
  {'id': 10, 'name': 'Bonni', 'age': 7, 'available': true, 'gender': 'Female', 'category': 'Dog', 'breed': null, 'description': 'Morbi vestibulum,  velit id pretium iaculis,  diam erat fermentum justo,  nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque.'},
  {'id': 11, 'name': 'Symon', 'age': 2, 'available': false, 'gender': 'Male', 'category': 'Bird', 'breed': null, 'description': 'Morbi non quam nec dui luctus rutrum.'},
  {'id': 12, 'name': 'Loy', 'age': 6, 'available': true, 'gender': 'Male', 'category': 'Bird', 'breed': null, 'description': 'Donec dapibus. Duis at velit eu est congue elementum.'},
  {'id': 13, 'name': 'Hamid', 'age': 5, 'available': false, 'gender': 'Male', 'category': 'Bird', 'breed': null, 'description': 'In hac habitasse platea dictumst. Aliquam augue quam,  sollicitudin vitae,  consectetuer eget,  rutrum at,  lorem. Integer tincidunt ante vel ipsum.'},
  {'id': 14, 'name': 'Colman', 'age': 4, 'available': false, 'gender': 'Male', 'category': 'Dog', 'breed': null, 'description': 'Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede,  venenatis non,  sodales sed,  tincidunt eu,  felis. Fusce posuere felis sed lacus.'},
  {'id': 15, 'name': 'Winifred', 'age': 10, 'available': false, 'gender': 'Female', 'category': 'Reptile', 'breed': null, 'description': 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam,  sollicitudin vitae,  consectetuer eget,  rutrum at,  lorem.'},
  {'id': 16, 'name': 'Gasparo', 'age': 4, 'available': true, 'gender': 'Male', 'category': 'Reptile', 'breed': null, 'description': 'Integer aliquet,  massa id lobortis convallis,  tortor risus dapibus augue,  vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.'},
  {'id': 17, 'name': 'Ambrosi', 'age': 10, 'available': false, 'gender': 'Male', 'category': 'Dog', 'breed': null, 'description': 'Nulla ac enim. In tempor,  turpis nec euismod scelerisque,  quam turpis adipiscing lorem,  vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.'},
  {'id': 18, 'name': 'Dugald', 'age': 10, 'available': true, 'gender': 'Male', 'category': 'Other', 'breed': null, 'description': 'Aliquam erat volutpat. In congue. Etiam justo.'},
  {'id': 19, 'name': 'Vic', 'age': 1, 'available': true, 'gender': 'Male', 'category': 'Other', 'breed': null, 'description': 'Nunc purus. Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio,  porttitor id,  consequat in,  consequat ut,  nulla.'},
  {'id': 20, 'name': 'Sawyere', 'age': 4, 'available': false, 'gender': 'Male', 'category': 'Other', 'breed': null, 'description': 'Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede,  venenatis non,  sodales sed,  tincidunt eu,  felis. Fusce posuere felis sed lacus. Morbi sem mauris,  laoreet ut,  rhoncus aliquet,  pulvinar sed,  nisl. Nunc rhoncus dui vel sem.'}
]

export default {
  async getPets () {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(_pets), 100)
    })
  },

  getPetById (id) {
    let petId = (typeof id === Number) ? id : Number(id)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(_pets.find(pet => pet.id === petId))
      }, 100)
    })
  },

  buyPet (pet, cb, errorCb) {
    setTimeout(() => {
      // simulate random checkout failure
      (Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1)
        ? cb()
        : errorCb()
    }, 100)
  }
}
