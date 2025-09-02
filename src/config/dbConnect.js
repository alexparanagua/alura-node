import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://alexparanagua:zBHGE82AFCJe6UO1@cluster0.d73o8jj.mongodb.net/alura-node");

let db = mongoose.connection;

export default db;