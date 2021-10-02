// schema object...
const mongoose = require('mongoose');

const TablesSchema = new mongoose.Schema ({
     bookedName:   { type: String   , required: true } ,
     tableParty:   { type: String   , required: true } ,
     tableTime:    { type: Date     , required: true }
});

module.exports.tables_db = TablesSchema;
