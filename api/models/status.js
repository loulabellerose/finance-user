const db = require('mongoose');

const statusSchema = new db.Schema ({
    currentStatus: {
        type: String
    },
    /*
    createdAt: {
        type: Date,
        default: Date.now
    }
    */
   timestamps: true
});

const Status = db.model('Status', statusSchema);

exports.Status = Status
exports.statusSchema = statusSchema;