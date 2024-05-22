const config = require("./config");
const com = require("./commands")
const valid = require("./validations")

export const commands = com.commands
export const admins = config.admins;
export const threads = config.threads;
export const validations = valid.validations