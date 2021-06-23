import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        default: '¹ÌºÐ·ù',
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post',
        },
    ],
});

const Category = mongoose.model('category', CategorySchema);

export default Category;