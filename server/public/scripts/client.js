console.log('js');

$(onReady)

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
    renderDisplay(array);
  }).catch(function (error) {
    console.log('could not get koalas ', error)
  })
} // end getKoalas

function addKoala() {
  console.log('in addKoala', newKoala);
  // ajax call to server to post koalas



}

function renderDisplay(array) {

}
