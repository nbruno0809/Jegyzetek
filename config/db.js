const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/irwsnt', { useNewUrlParser: true });

module.exports = mongoose;
