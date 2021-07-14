/* global data */
/* exported data */
var $img = document.querySelector('img');
var $photoUrl = document.querySelector('.photo-url');
var $entryForm = document.querySelector('.form');
var $entriesView = document.querySelector('.entries');
var $entries = document.querySelector('.nav-entries');
var $newButton = document.querySelector('.new-button');
var $view = document.querySelectorAll('.view');
var $noEntries = document.querySelector('.noEntries');
var $newEntriesObject = document.querySelector('.new-entries-object');
$newButton.addEventListener('click', handleNewEntry);
$photoUrl.addEventListener('input', inputURL);
window.addEventListener('DOMContentLoaded', DOMObjectLoaded);
$entries.addEventListener('click', handleEntries);

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
    title: $entryForm.title.value,
    url: $entryForm.url.value,
    notes: $entryForm.notes.value,
    entryId: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.unshift(formObject);
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
  data.view = 'entries';
  setDataView($view);
  $newEntriesObject.prepend(objectDOMTree(formObject));
}

$entryForm.addEventListener('submit', handleSubmitForm);

function objectDOMTree(formObject) {
  var $ul = document.createElement('ul');
  $ul.setAttribute('class', 'padding-left-0');

  var $widthRow = document.createElement('div');
  $widthRow.setAttribute('class', 'row width-row');

  var $imageRow = document.createElement('div');
  $imageRow.setAttribute('class', 'row image-row');

  var $imgDOM = document.createElement('img');
  $imgDOM.setAttribute('src', formObject.url);
  $imgDOM.setAttribute('class', 'imageholder');
  $imageRow.appendChild($imgDOM);
  $widthRow.appendChild($imageRow);

  var $columnHalf = document.createElement('div');
  $columnHalf.setAttribute('class', 'column column-half');

  var $pencilRow = document.createElement('div');
  $pencilRow.setAttribute('class', 'row justify-between');
  $columnHalf.appendChild($pencilRow);

  var $h3 = document.createElement('h3');
  $h3.setAttribute('class', 'label margin-left-20');
  $h3.textContent = formObject.title;
  $pencilRow.appendChild($h3);

  var $pencilIcon = document.createElement('i');
  $pencilIcon.setAttribute('class', 'fas fa-pencil-alt');
  $pencilRow.appendChild($pencilIcon);

  var $notesP = document.createElement('p');
  $notesP.setAttribute('class', 'info photo-url padding-left-20');
  $notesP.textContent = formObject.notes;
  $columnHalf.appendChild($notesP);

  var $li = document.createElement('li');
  $li.setAttribute('data-entry-id', formObject.entryId);
  $li.appendChild($widthRow);

  $widthRow.appendChild($columnHalf);
  $ul.appendChild($li);

  return $ul;
}

function DOMObjectLoaded(event) {
  for (var i = 0; i < data.entries.length; i++) {
    $entriesView.appendChild(objectDOMTree(data.entries[i]));

  }
}

function handleEntries(event) {
  data.view = 'entries';
  if (data.entries.length === 0) {
    $noEntries.classList.remove('hidden');
  }
  setDataView($view);
}

function setDataView($view) {
  for (var i = 0; i < $view.length; i++) {
    var setView = $view[i].getAttribute('data-view');
    if (setView !== data.view) {
      $view[i].classList.add('hidden');
    } else {
      $view[i].classList.remove('hidden');
    }
  }
}

function handleNewEntry(event) {
  data.view = 'entry-form';
  if (data.entries.length === 0) {
    $noEntries.classList.toggle('hidden');
  }
  setDataView($view);
}

window.addEventListener('DOMContentLoaded', sameOnLoad);

function sameOnLoad(event) {
  setDataView($view);
}

// $entriesView.addEventListener('click', function () {
//   console.log('hi');
// });
$entriesView.addEventListener('click', function () {
  for (var i = 0; i < $view.length; i++) {
    if (event.target && event.target.matches('.fa-pencil-alt')) {
      data.view = 'entry-form';
      setDataView($view);
    }
  }
});
