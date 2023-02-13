const mongoose = require('mongoose')
const url = "mongodb+srv://lakshmi:audilakshmi@cluster0.d5mu7r3.mongodb.net/?retryWrites=true&w=majority"
mongoose.set('strictQuery', false);

module.exports.connect = () => {
    mongoose.connect(url)
        .then((res) => console.log('Mongodb connected'))
        .catch((err) => console.log('Error:', err))
} 