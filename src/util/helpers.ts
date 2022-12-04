import crypto from "node:crypto";

export default {
    generateID(): String {
        let rnd = crypto.randomBytes(16);
        rnd[6] = (rnd[6] & 0x0f) | 0x40;
        rnd[8] = (rnd[8] & 0x3f) | 0x80;
        let out = rnd.toString("hex").match(/(.{8})(.{4})(.{4})(.{4})(.{12})/);
        out?.shift();
        return "" + out?.join("-");
    }
}