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
var $newEntryH2 = document.querySelector('.new-entry');
var $editEntryh2 = document.querySelector('.edit-entry');
var $delete = document.querySelector('.delete');
$newButton.addEventListener('click', handleNewEntry);
$photoUrl.addEventListener('input', inputURL);
window.addEventListener('DOMContentLoaded', generateEntryList);
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
  if (data.editing !== null) {
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === data.editing.entryId) {
        data.entries[i] = {
          title: $entryForm.title.value,
          url: $entryForm.url.value,
          notes: $entryForm.notes.value,
          entryId: data.editing.entryId
        };
      }
    }
  } else {
    data.nextEntryId++;
    data.entries.unshift(formObject);
  }
  $newEntriesObject.innerHTML = '';
  generateEntryList();
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
  data.view = 'entries';
  setDataView($view);
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
  $li.setAttribute('class', 'data-id');
  $li.appendChild($widthRow);

  $widthRow.appendChild($columnHalf);
  $ul.appendChild($li);

  return $ul;
}

function generateEntryList(event) {
  for (var i = 0; i < data.entries.length; i++) {
    $newEntriesObject.appendChild(objectDOMTree(data.entries[i]));
  }
}

function handleEntries(event) {
  data.view = 'entries';
  if (data.entries.length === 0) {
    $noEntries.classList.remove('hidden');
  }
  setDataView($view);
  $delete.classList.add('hidden');
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
  data.editing = null;
  if (data.entries.length === 0) {
    $noEntries.classList.toggle('hidden');
  }
  setDataView($view);
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
  $delete.classList.add('hidden');
}

window.addEventListener('DOMContentLoaded', sameOnLoad);

function sameOnLoad(event) {
  setDataView($view);
}

function newToEdit(entry) {
  if (event.target.matches('.fa-pencil-alt')) {
    $newEntryH2.classList.add('hidden');
    $editEntryh2.classList.remove('hidden');
  } else if (event.target.matches('.new-button')) {
    $newEntryH2.classList.remove('hidden');
    $editEntryh2.classList.add('hidden');
  }
}

$entriesView.addEventListener('click', matchingEntry);

var $notesEdit = document.querySelector('.textarea');
var $titleEdit = document.querySelector('.title');
var $imgEdit = document.querySelector('.imageholder');

function matchingEntry(event) {
  if (event.target.matches('.fa-pencil-alt')) {
    var dataId = event.target.closest('li.data-id');
    data.view = 'entry-form';
    setDataView($view);
    var number = dataId.getAttribute('data-entry-id');
    var dataEntryNumber = parseInt(number);
    $delete.classList.remove('hidden');
  }
  newToEdit();
  editObject(dataEntryNumber);
}

function editObject(dataEntryNumber) {
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === dataEntryNumber) {
      data.editing = data.entries[i];
      $imgEdit.setAttribute('src', data.editing.url);
      $titleEdit.value = data.editing.title;
      $photoUrl.value = data.editing.url;
      $notesEdit.value = data.editing.notes;
    }
  }
}
var $test = document.querySelector('.test');
if ($delete.className.includes('hidden')) {
  $test.classList.remove('justify-between');
  $test.classList.add('justify-end');
}

var $deleteEntry = document.querySelector('.delete-entry');

$delete.addEventListener('click', handleDelete);
var $cancel = document.querySelector('.cancel');
$cancel.addEventListener('click', handleCancel);
function handleCancel(event) {
  $deleteEntry.classList.toggle('hidden');
}

function handleDelete(event) {
  $deleteEntry.classList.toggle('hidden');
}
