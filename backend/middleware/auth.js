import { getUser } from "../services/auth.js";

async function restrictologinuser(req,res,next) {
    let id = req.cookies?.uid;
    if (!id) return next()
    let user = getUser(id);
    if (!user) return next()
    req.user = user;
    next();
}

export {restrictologinuser}