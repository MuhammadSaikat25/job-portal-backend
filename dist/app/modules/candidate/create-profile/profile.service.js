"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.candidateProfileService = void 0;
const profile_model_1 = require("./profile.model");
const createCandidateProfile = (PlayLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield profile_model_1.candidateProfileModel.findOneAndUpdate({ email: PlayLoad.email }, Object.assign({}, PlayLoad), { new: true, upsert: true, runValidators: true });
    return result;
});
const getCandidateProfile = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = profile_model_1.candidateProfileModel.findOne({ email });
    return result;
});
exports.candidateProfileService = {
    createCandidateProfile,
    getCandidateProfile
};
