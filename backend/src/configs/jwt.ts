import jwt from "jsonwebtoken";
import passport, { Passport, PassportStatic } from "passport";
import { Strategy, StrategyOptions, ExtractJwt } from "passport-jwt";
import { User } from "../models";
const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_KEY,
};
export const handlePassportJwt = function (passport: PassportStatic) {
  passport.use(
    new Strategy(options, (payload, done) => {
      User.find({ username: payload.sub })
        .then((user) => {
          if (user) done(null, user);
          else done(null, false);
        })
        .catch((e) => done(e, false));
    })
  );
};

export const generateJwtToken = (payload: any) => {
  return jwt.sign(payload, process.env.JWT_KEY ?? "");
};
