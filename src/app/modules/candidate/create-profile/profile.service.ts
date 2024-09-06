import { TCandidateProfile } from "./profile.interface";
import { candidateProfileModel } from "./profile.model";

const createCandidateProfile=async(PlayLoad:TCandidateProfile)=>{
    const result=await candidateProfileModel.findOneAndUpdate(
        { email: PlayLoad.email },
        {
          ...PlayLoad,
        },
        { new: true, upsert: true, runValidators: true }
      );
    return result
}

export const candidateProfileService={
    createCandidateProfile
}