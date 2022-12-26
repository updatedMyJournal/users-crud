import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const definition = {
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
};

const userEventSchema = new Schema(definition);

userEventSchema.plugin(mongoosePaginate);

const userEventModel = model('UserEvent', userEventSchema);

export default userEventModel;
