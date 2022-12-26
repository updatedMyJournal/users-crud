import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { closestTo, isToday, isFuture } from 'date-fns';

const definition = {
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
};

const options = {
  virtuals: {
    fullName: {
      get() {
        return `${this.firstName} ${this.lastName}`;
      }
    },
    nextEventDate: {
      get() {
        const datesArr = this.events
          ?.map((event) => event.startDate)
          .filter((date) => isToday(date) || isFuture(date));

        const nextEventDate = closestTo(Date.now(), datesArr) ?? 'no future events';
        
        return nextEventDate;
      }
    },
  },
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
};

const userSchema = new Schema(definition, options);

userSchema.virtual('eventsCount', {
  ref: 'UserEvent',
  localField: '_id',
  foreignField: 'user',
  count: true,
  default: 0
});

userSchema.virtual('events', {
  ref: 'UserEvent',
  localField: '_id',
  foreignField: 'user',
});

userSchema.plugin(mongoosePaginate);

const userModel = model('User', userSchema);

export default userModel;
