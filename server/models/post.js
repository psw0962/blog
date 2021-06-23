import mongoose, { mongo } from 'mongoose';
import moment from 'moment';

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true,
    },
    contents: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
        default: -2, // 작성자의 조회수는 제외하기 위함
    },
    fileUrl: {
        type: String,
        default: 'https://source.unsplash.com/random/301x201',
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
    },
    date: {
        type: String,
        default: moment().format('YYYY-MM-DD hh:mm:ss')
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment',
        }
    ],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }
});

const Post = mongoose.model('post', PostSchema);

export default Post;