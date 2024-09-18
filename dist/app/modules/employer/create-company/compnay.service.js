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
exports.companyService = void 0;
const company_modal_1 = require("./company.modal");
const createCompany = (Payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield company_modal_1.CompanyModal.findOneAndUpdate({ email: Payload.email }, Object.assign({}, Payload), { new: true, upsert: true, runValidators: true });
    return result;
});
const getMyCompany = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield company_modal_1.CompanyModal.findOne({ email });
    return result;
});
exports.companyService = {
    createCompany,
    getMyCompany
};
