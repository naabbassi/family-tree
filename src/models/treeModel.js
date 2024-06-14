import { Schema, model, models } from 'mongoose';

const treeSchema = new Schema({
  AID: Number,
  Family: String,
  FatherID: String,
  ID: String,
  MotherID: String,
  Name: String,
  Sex: String,
  serialVersionUID: Number,
  sexId: Number,
});

const Tree = models.Tree || model('tree', treeSchema);

export default Tree;

