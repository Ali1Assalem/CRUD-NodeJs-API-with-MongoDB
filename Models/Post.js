const mongoose = require('mongoose')

const postSchema = mongoose.Schema({

        title: { type: String, require: true },
        description: { type: String, require: true },
        date: { type: Date, default: Date.now },
    })
    // const postSchema = mongoose.Schema({

//     title:String,
//     description: String,
//     date: {type: Date , default: Date.now },
// })

module.exports = mongoose.model('Post', postSchema)