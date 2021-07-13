/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};
var previousEntryJSON = localStorage.getItem('data-entries');
if (previousEntryJSON !== null) {
  data.entries = JSON.parse(previousEntryJSON);
}

window.addEventListener('beforeunload', handleUnload);

function handleUnload(event) {
  var entryJSON = JSON.stringify(data.entries);
  localStorage.setItem('data-entries', entryJSON);
}
