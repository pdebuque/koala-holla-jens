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
  $('#viewKoalas').on('click', '.ready-btn', toggleReady);
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
  //console.log('in addKoala');
  if ($('#nameIn').val() === '' || isNaN($('#ageIn').val()) || ($('#genderIn').val() !== 'M' && $('#genderIn').val() !== 'F') || ($('#readyForTransferIn').val() !== 'true' && $('#readyForTransferIn').val() !== 'false')){
    // alert the user that the form wasn't filled out correctly
    Swal.fire('Please fill out all forms correctly.');
  } else {
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
}

function toggleReady() {
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
  let name = $(this).data('name');
  Swal.fire({
    title: `Are you sure you want to delete ${name}?`,
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
      Swal.fire(`${name} was deleted.`, '', 'success');
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
                <td><button class= "edit-btn" data-id='${koala.id}' data-name='${koala.name}' data-age='${koala.age}' data-gender='${koala.gender}' data-transfer='${koala.ready_to_transfer}' data-notes='${koala.notes}'>edit</button></td>
                <td><button class= "delete-btn" data-name='${koala.name}' data-id='${koala.id}'>x</button></td>
                <td><button class= "ready-btn" data-id='${koala.id}'>${koala.ready_to_transfer ? 'mark unready' : 'mark ready'}</button></td>
            </tr>
        `);
  }
}


function editKoala() {
  const thisKoala = $(this).data();
  Swal.fire({
    title: `Edit ${thisKoala.name}`,
    html: `<input type="text" id="name-edit" class="swal2-input" placeholder="Name">
    <input type="text" id="gender-edit" class="swal2-input" placeholder="Gender">
    <input type="number" id="age-edit" class="swal2-input" placeholder="Age">
    <input type="text" id="transfer-edit" class="swal2-input" placeholder="Ready to Transfer? (y/n)">
    <input type="text" id="notes-edit" class="swal2-input" placeholder="Notes">
    `,
    confirmButtonText: 'Confirm Edits',
    focusConfirm: false,
    preConfirm: () => { // need to add ability to default to previous value
      const newName = Swal.getPopup().querySelector('#name-edit').value || thisKoala.name;
      const newGender = Swal.getPopup().querySelector('#gender-edit').value || thisKoala.gender;
      const newAge = Swal.getPopup().querySelector('#age-edit').value || thisKoala.age;
      const newTransfer = Swal.getPopup().querySelector('#transfer-edit').value || thisKoala.transfer;
      const newNotes = Swal.getPopup().querySelector('#notes-edit').value || thisKoala.notes;
      return {
        id: thisKoala.id,
        name: newName,
        gender: newGender,
        age: newAge,
        ready_to_transfer: newTransfer,
        notes: newNotes
      }
    }
  }).then((result) => {
    console.log(result)
    putEdits(result.value)
  })
}

function putEdits(object) {
  $.ajax({
    type: 'PUT',
    url: `/koalas/edit/${object.id}`,
    data: object
  }).then(() => {
    getKoalas();
  }).catch((err) => {
    console.log('could not edit ', err)
  })
}