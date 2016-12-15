var Entry = require('./entry.js');

var list = function(title, entries) {
    var list = {};
    list.title = title;
    list.entries = entries || [];
    
    list.editTitle = function(newTitle) {
        this.title = newTitle;
    };
    
    list.add = function(added) {
        this.entries.push(Entry(added));
    };
    
    list.delete = function(deleted_index) {
        console.log(deleted_index);
        //this.entries.splice(deleted_index, 1);
    };
    
    list.move = function(old_index, new_index) {
        this.entries.splice(new_index, 0, this.entries.splice(old_index, 1)[0]);
    };
    
    return list;
};

module.exports = list;