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
    ready_for_transfer: $('#readyForTransferIn').val(),
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

function renderDisplay(array) {
  $('#viewKoalas').empty();
  for (let koala of array) {
    $('#viewKoalas').append(`
      <tr>
        <td>${koala.name}</td>
        <td>${koala.age}</td>
        <td>${koala.gender}</td>
        <td>${koala.ready_for_transfer}</td>
        <td>${koala.notes}</td>
        <td><button class= "delete-btn" data-id='${koala.id}'>x</button></td>
      </tr>
    `)
  }
}
