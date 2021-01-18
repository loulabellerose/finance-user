const db = require('mongoose');

const statusSchema = new db.Schema ({
    name: {
        type: String
    },
    /*
    updated: {
        type: Date, 
        default: Date.now
    }
    */
});

const Status = db.model('Status', statusSchema);

exports.Status = Status
exports.statusSchema = statusSchema;