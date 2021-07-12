/* global data */
/* exported data */
var $img = document.querySelector('img');
var $photoUrl = document.querySelector('.photo-url');
// var $entryForm = document.querySelector('#entry-form');
$photoUrl.addEventListener('input', inputURL);

function inputURL(event) {
  if ($img.setAttribute('src', '')) {
    return;
  }
  $img.setAttribute('src', event.target.value);
}
