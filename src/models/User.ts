// models/User.ts
import mongoose, { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';


export interface IUser extends Document {
  username: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// Hash the password before saving it to the database
userSchema.pre('save', function (next) {
  const user = this as IUser;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
