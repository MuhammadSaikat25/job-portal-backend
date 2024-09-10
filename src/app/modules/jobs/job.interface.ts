import { Types } from "mongoose";


export interface TAppliedJOb {
  user: Types.ObjectId;
  resume: Types.ObjectId;
  job: Types.ObjectId;
}
