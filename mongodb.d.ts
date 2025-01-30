import { Mongoose } from 'mongoose';

declare global {
  // eslint-disable-next-line vars-on-top, init-declarations, no-var
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}
