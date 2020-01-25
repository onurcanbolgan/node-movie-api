const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, '`{PATH}` alanı doldurulması zorunludur.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, '`{PATH}` alanı doldurulması zorunludur.'],
        minLength:[6,'`{PATH}` alanı (`{VALUE}`), `{MINLENGT}` karakterden büyük olmalıdır .'],
    },
});


module.exports = mongoose.model('users',UserSchema);