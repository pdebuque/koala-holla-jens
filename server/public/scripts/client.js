console.log('in client.js');

$(onReady);

function onReady() {
  console.log('in onReady function');
  // set up click listeners
  setupClickListeners();

  // load existing koalas on page load
  getKoalas();

}; // end doc ready

function setupClickListeners() {
  // add click listeners to add, delete, ready to transfer, edit buttons
  $('#addButton').on('click', addKoala);
  $('#viewKoalas').on('click', '.delete-btn', deleteKoala);
  $('#viewKoalas').on('click', '.ready-btn', readyKoala);
  $('#viewKoalas').on('click', '.edit-btn', editKoala);
  $('#live-search').on('keyup', filterResults)
}

function getKoalas() {
  console.log('in getKoalas');

  // ajax call to server to get koalas
  $.ajax({
    type: 'GET',
    url: `/koalas`
  }).then(function (response) {
    // on successful get, render table
    renderDisplay(response);
  }).catch(function (error) {
    console.log('could not get koalas ', error);
  });
}

function addKoala() {
  console.log('in addKoala');

  // create new koala objct
  const newKoala = {
    name: $('#nameIn').val(),
    age: $('#ageIn').val(),
    gender: $('#genderIn').val(),
    ready_to_transfer: $('#readyForTransferIn').val(),
    notes: $('#notesIn').val()
  }

  // empty inputs
  $('#nameIn').val('');
  $('#ageIn').val('');
  $('#genderIn').val('');
  $('#readyForTransferIn').val('');
  $('#notesIn').val('');

  // ajax call to server to post koalas
  $.ajax({
    type: 'POST',
    url: '/koalas',
    data: newKoala
  }).then((res) => {
    console.log('new koala added!');
    getKoalas();
  }).catch((err) => {
    console.log('could not add: ', err);
  });
}

function readyKoala() {
  // updates the 'ready to transfer' attribute

  const id = $(this).data('id');
  $.ajax({
    type: 'PUT',
    url: `/koalas/${id}`,
    data: { status: true }
  }).then((res) => {
    console.log('successful update');

    // update the koala table
    getKoalas();
  }).catch((err) => {
    console.log('could not update ', err);
  });
}

function deleteKoala() {
  // sweetalert2 confirmation notification 
  Swal.fire({
    title: 'Are you sure you want to delete this koala?',
    showCancelButton: true,
    confirmButtonText: 'Delete',
  }).then((result) => {
    if (result.isConfirmed) {
      // if delete selected, then proceed with ajax delete call
      const id = $(this).data('id');
      $.ajax({
        type: 'DELETE',
        url: `/koalas/${id}`
      }).then(() => {
        console.log('successful delete');

        // get the updated koala table
        getKoalas();
      }).catch((err) => {
        console.log('could not delete', err);
      });
      // notify the user that the koala was successfully deleted
      Swal.fire('The koala was deleted.', '', 'success');
    } else if (result.isDenied) {
      console.log('delete canceled');
      // exit the notification if cancel is selected.
    }
  });
}

function filterResults() {
  const searchTerm = $('#live-search').val().toLowerCase();
  // get all results, then filter by search term

  $.ajax({
    type: 'GET',
    url: `/koalas/${searchTerm}`
  }).then((res) => {
    renderDisplay(res);
  }).catch((err) => {
    console.log('could not filter')
  })
}

function renderDisplay(array) {
  // empty the koala table
  $('#viewKoalas').empty();
  console.log('all koalas: ', array);

  // update koala table
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
        `);
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
  const rowBoxes = $(this).parent().parent().find('.koala-attribute');
  console.log(rowBoxes);
  rowBoxes

    ;
}

function changeToInput(element) {
  const prevText = $(element).text();
  $(this).html(`<input type="text" class = "edit-input" placeholder = ${prevText}`);
  submitEdits()
}

function submitEdits() {
  // PUT request
}