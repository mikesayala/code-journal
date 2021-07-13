/* global data */
/* exported data */
var $img = document.querySelector('img');
var $photoUrl = document.querySelector('.photo-url');
var $entryForm = document.querySelector('.entry-form');
$photoUrl.addEventListener('input', inputURL);
$entryForm.addEventListener('submit', handleSubmitForm);
function inputURL(event) {
  if (event.target.value === '') {
    $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  } else {
    $img.setAttribute('src', event.target.value);
  }
}
function handleSubmitForm(event) {
  event.preventDefault();
  var formObject = {
    title: $entryForm.elements.title.value,
    url: $entryForm.elements.url.value,
    notes: $entryForm.elements.notes.value,
    entryId: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.unshift(formObject);
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();

  objectDOMTree(formObject);
}

function objectDOMTree(formObject) {
  var $ul = document.createElement('ul');
  $ul.setAttribute('class', 'padding-left-0');

  var $widthRow = document.createElement('div');
  $widthRow.setAttribute('class', 'row width-row');

  var $imageRow = document.createElement('div');
  $imageRow.setAttribute('class', 'row image-row');

  var $imgDOM = document.createElement('img');
  $imgDOM.setAttribute('src', $entryForm.elements.url.value);
  $imageRow.appendChild($imgDOM);
  $widthRow.appendChild($imageRow);

  var $columnHalf = document.createElement('div');
  $columnHalf.setAttribute('class', 'column column-half');

  var $h3 = document.createElement('h3');
  $h3.setAttribute('class', 'label margin-left-20');
  $h3.textContent = $entryForm.elements.title.value;
  $columnHalf.appendChild($h3);

  var $notesP = document.createElement('p');
  $notesP.setAttribute('class', 'info photo-url padding-left-20');
  $notesP.textContent = $entryForm.elements.notes.value;
  $columnHalf.appendChild($notesP);

  $widthRow.appendChild($columnHalf);
  $ul.appendChild($imageRow);

  return $ul;
}
