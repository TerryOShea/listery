var entry = function(item) {
    var entry = {};
    entry.item = item;
    
    entry.edit = function(edited) {
        this.item = edited;
    };
    
    return entry;
};

module.exports = entry;