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
exports.resumeService = void 0;
const resume_model_1 = require("./resume.model");
const createResume = (playLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield resume_model_1.ResumeModel.findOneAndUpdate({ email: playLoad.email }, Object.assign({}, playLoad), { new: true, upsert: true, runValidators: true });
    return result;
});
const getMyResume = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield resume_model_1.ResumeModel.findOne({ email }).populate('candidateProfile');
    return result;
});
exports.resumeService = {
    createResume,
    getMyResume
};
