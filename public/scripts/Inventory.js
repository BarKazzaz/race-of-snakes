function Inventory(elm_id, max_num_obj) {
    this.items = [];
    this.num_objs = max_num_obj; //the amount of items we can collect
    this.elm = document.getElementById(elm_id);
    this.add = function(item) {
        if (items.length < this.num_objs) {
            items.push(item);
            return true;
        } else return false;
    }
    this.clear = function() {
        this.items = [];
    }
}