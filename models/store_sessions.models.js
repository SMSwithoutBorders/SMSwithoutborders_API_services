"use strict";

const ERRORS = require("../error.js");
const db = require("../schemas");
let logger = require("../logger");

const config = require('config');
const SERVER_CFG = config.get("SERVER");
let secure = "";
if (SERVER_CFG.api.secure_sessions == undefined) {
    secure = true;
} else {
    secure = SERVER_CFG.api.secure_sessions
}
const maxAge = SERVER_CFG.api.session_maxAge;

var Session = db.sessions;

module.exports = async (userId, user_agent) => {
    const hour = eval(maxAge) || 2 * 60 * 60 * 1000;
    const data = {
        maxAge: hour,
        secure: secure,
        httpOnly: true,
        sameSite: 'lax'
    }

    logger.debug(`Secure Session: ${secure}`);
    logger.debug(`Session maxAge: ${hour}`);
    logger.debug(`Creating session for ${userId} ...`);

    let session = await Session.create({
        userId: userId,
        user_agent: user_agent,
        expires: new Date(Date.now() + hour),
        data: JSON.stringify(data)
    }).catch(error => {
        logger.error("ERROR CREATING SESSION")
        throw new ERRORS.InternalServerError(error);
    });

    logger.info("SUCCESSFULLY CREATED SESSION");

    return {
        sid: session.sid,
        uid: session.userId,
        data: data
    };
}