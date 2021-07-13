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
}
