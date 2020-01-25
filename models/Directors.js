const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectorsSchema = new Schema({
   name: {
       type: String,
       required: [true, '`{PATH}` alanı doldurulması zorunludur.'],
       maxLength:[30,'`{PATH}` alanı (`{VALUE}`), `{MAXLENGT}` karakterden küçük olmalıdır .'],
       minLength:[2,'`{PATH}` alanı (`{VALUE}`), `{MINLENGT}` karakterden büyük olmalıdır .'],
   },
   surname: {
       type: String,
       required: [true, '`{PATH}` alanı doldurulması zorunludur.'],
       maxLength:[30,'`{PATH}` alanı (`{VALUE}`), `{MAXLENGT}` karakterden küçük olmalıdır .'],
       minLength:[2,'`{PATH}` alanı (`{VALUE}`), `{MINLENGT}` karakterden büyük olmalıdır .'],
   },
   bio: {
       type: String,
       maxLength:[250,'`{PATH}` alanı (`{VALUE}`), `{MAXLENGT}` karakterden küçük olmalıdır .']
   },
   createdAt: {
       type: Date,
       default: Date.now
   }
});


module.exports = mongoose.model('directors',DirectorsSchema);