"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MemberSchema = new mongoose_1.Schema({
    user: String,
    guild: String,
    roles: {
        type: Array,
        default: []
    },
    xp: {
        type: Number,
        default: 0
    },
    presence: String
});
const MemberModel = mongoose_1.model('members', MemberSchema);
exports.default = MemberModel;
