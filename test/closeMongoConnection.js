const mongoose = require('mongoose');

module.exports = () => {
  return new Promise((res) => {
    res(mongoose.connection.close());
  });
};