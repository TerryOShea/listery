'use strict';

const deleteEntryBtns = document.getElementsByClassName('delete-entry-btn'), 
      addEntryBtn = document.querySelector('.add-entry-btn'), 
      newEntryContent = document.querySelector('.new-entry-content'), 
      listEntryBox = document.querySelector('.list-entry-box'), 
      listTitle = document.querySelector('.list-title'),
      deleteAllEntriesBtn = document.querySelector('.delete-all-entries-btn');

var deleteEntry = function() {
    var deleted = this.parentNode;
    deleted.parentNode.removeChild(deleted);
};

var addEntry = function() {
    let s = newEntryContent.textContent.trim();
    if (s.length > 0) {
        // delete all entries button reappears
        deleteAllEntriesBtn.style.visibility = "visible";
        
        // create new list entry
        var ne = document.createElement('div');
        ne.className = 'entry';
        ne.id = count;
        var neDelBtn = document.createElement('button');
        neDelBtn.type = 'button';
        neDelBtn.className = 'delete-entry-btn';
        neDelBtn.innerHTML = '<i class="fa fa-close"></i>';
        neDelBtn.addEventListener('click', deleteEntry);
        var neContent = document.createElement('div');
        neContent.className = 'entry-content';
        neContent.contentEditable = 'true';
        neContent.innerHTML = s;
    
        // add the new list entry to the HTML
        ne.appendChild(neDelBtn);
        ne.appendChild(neContent);
        listEntryBox.appendChild(ne);
        newEntryContent.innerHTML = "";
        count += 1;
    }
};

// event listeners
addEntryBtn.addEventListener('click', addEntry);

deleteAllEntriesBtn.addEventListener('click', function() {
    listEntryBox.innerHTML = "";
    listTitle.innerHTML = "list #1";
    this.style.visibility = "hidden";
});

newEntryContent.addEventListener('keypress', function(e) {
    let key = e.which || e.keyCode;
    if (key === 13) addEntry();
});

for (let i = 0; i < deleteEntryBtns.length; i++) {
    deleteEntryBtns[i].addEventListener('click', deleteEntry);
}

