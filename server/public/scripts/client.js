console.log('js');

$(onReady);

function onReady() {
  console.log('JQ');
  setupClickListeners();
  // load existing koalas on page load
  getKoalas();

}; // end doc ready

function setupClickListeners() {
  $('#addButton').on('click', addKoala);
  $('#viewKoalas').on('click', '.delete-btn', deleteKoala);
  $('#viewKoalas').on('click', '.ready-btn', readyKoala);
  $('#viewKoalas').on('click', '.edit-btn', editKoala);


}

function getKoalas() {
  console.log('in getKoalas');
  // ajax call to server to get koalas
  $.ajax({
    type: 'GET',
    url: `/koalas`
  }).then(function (response) {
    renderDisplay(response);
  }).catch(function (error) {
    console.log('could not get koalas ', error)
  })
} // end getKoalas

function addKoala() {
  console.log('in addKoala', newKoala);
  // ajax call to server to post koalas
  const newKoala = {
    name: $('#nameIn').val(),
    age: $('#ageIn').val(),
    gender: $('#genderIn').val(),
    ready_to_transfer: $('#readyForTransferIn').val(),
    notes: $('#notesIn').val()
  }
  // create new koala

  // empty inputs
  $('#nameIn').val('');
  $('#ageIn').val('');
  $('#genderIn').val('');
  $('#readyForTransferIn').val('');
  $('#notesIn').val('');
  // ajax POST
  $.ajax({
    type: 'POST',
    url: '/koalas',
    data: newKoala
  }).then((res) => {
    console.log('new koala added!')
    getKoalas();
  }).catch((err) => {
    console.log('could not add: ', err)
  });
}

// ready koalas
function readyKoala() {
  const id = $(this).data('id')
  $.ajax({
    type: 'PUT',
    url: `/koalas/${id}`,
    data: { status: true }
  }).then((res) => {
    console.log('successful update');
    getKoalas();
  }).catch((err) => {
    console.log('could not update ', err)
  })
}

// delete koalas
function deleteKoala() {
  Swal.fire({
    title: 'Are you sure you want to delete this koala?',
    showCancelButton: true,
    confirmButtonText: 'Delete',
  }).then((result) => {
    if (result.isConfirmed) {
      const id = $(this).data('id');
      $.ajax({
        type: 'DELETE',
        url: `/koalas/${id}`
      }).then(() => {
        console.log('successful delete');
        getKoalas();
      }).catch((err) => {
        console.log('could not delete', err);
      });
      Swal.fire('The koala was deleted.', '', 'success');
    } else if (result.isDenied) {
      console.log('delete canceled');
    }
  });
}


function renderDisplay(array) {
  $('#viewKoalas').empty();
  console.log('all koalas: ', array)
  for (let koala of array) {
    $('#viewKoalas').append(`
      <tr>
        <td class='koala-attribute' data-id='${koala.id}'>${koala.name}</td>
        <td class='koala-attribute' data-id='${koala.id}'>${koala.age}</td>
        <td class='koala-attribute' data-id='${koala.id}'>${koala.gender}</td>
        <td class='koala-attribute' data-id='${koala.id}'>${koala.ready_to_transfer}</td>
        <td class='koala-attribute' data-id='${koala.id}'>${koala.notes}</td>
        <td><button class= "edit-btn" data-id='${koala.id}'>edit</button></td>
        <td><button class= "delete-btn" data-id='${koala.id}'>x</button></td>
        <td><button class= "ready-btn" data-id='${koala.id}'>${koala.ready_to_transfer ? 'mark unready' : 'mark ready'}</button></td>
      </tr>
    `)
  }
}




// this is non-functional and unfinished
// edit Koala should select all corresponding attribute boxes and toggle click listeners
// change to input changes the box into an input
// submit edit sends data to server in PUT

function editKoala() {
  // use THIS to get id
  const id = $(this).data('id')
  // change text of edit button to submit
  $(this).html('submit changes')
  // toggle click listeners on button
  const rowBoxes = $(this).parent().parent().children()
  console.log(rowBoxes, typeof rowBoxes)
  for (let box of rowBoxes) {
    console.log(box);
    if (box.contains('koala-attribute')) {
      box.on('click', changeToInput(box))
      box.off('click', editKoala)
    }
  }

  // previous boxes get a click listener that changes them into a text input with placeholder of what they were

}

function changeToInput(element) {
  const prevText = $(element).text();
  $(this).html(`<input type="text" class = "edit-input" placeholder = ${prevText}`);
  submitEdits()
}

function submitEdits() {
  // PUT request
}