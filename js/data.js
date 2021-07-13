/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};
var previousEntryJSON = localStorage.getItem('data-storage');
if (previousEntryJSON !== null) {
  data = JSON.parse(previousEntryJSON);
}

window.addEventListener('beforeunload', handleUnload);

function handleUnload(event) {
  var entryJSON = JSON.stringify(data);
  localStorage.setItem('data-storage', entryJSON);
}
