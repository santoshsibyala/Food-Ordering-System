var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
    food_item: {
        type: String,
        default: '',
        required:true
    },
    price:{
    	type:String,
    	required:true
    }
});