const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MoviesSchema = new Schema({
    director_id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: [true, '`{PATH}` alanı doldurulması zorunludur.'],
        maxLength:[30,'`{PATH}` alanı (`{VALUE}`), `{MAXLENGT}` karakterden küçük olmalıdır .'],
        minLength:[2,'`{PATH}` alanı (`{VALUE}`), `{MINLENGT}` karakterden büyük olmalıdır .'],
    },
    category: String,
    country: {
        type: String,
        maxLength:[30,'`{PATH}` alanı (`{VALUE}`), `{MAXLENGT}` karakterden küçük olmalıdır .'],
        minLength:[2,'`{PATH}` alanı (`{VALUE}`), `{MINLENGT}` karakterden büyük olmalıdır .'],
    },
    year: {
        type: Number,
        maxLength:[2020,'`{PATH}` alanı (`{VALUE}`), `{MAXLENGT}` karakterden küçük olmalıdır .'],
        minLength:[1930,'`{PATH}` alanı (`{VALUE}`), `{MINLENGT}` karakterden büyük olmalıdır .'],
    },
    imdb_score: {
        type: Number,
        maxLength:[10,'`{PATH}` alanı (`{VALUE}`), `{MAXLENGT}` karakterden küçük olmalıdır .'],
        minLength:[0,'`{PATH}` alanı (`{VALUE}`), `{MINLENGT}` karakterden büyük olmalıdır .'],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('movies',MoviesSchema);