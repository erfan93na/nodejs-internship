import jwt from "jsonwebtoken";
import passport, { Passport, PassportStatic } from "passport";
import { Strategy, StrategyOptions, ExtractJwt } from "passport-jwt";
import { User } from "../models";

export const handlePassportJwt = function (
  passport: PassportStatic,
  jwtKey: string
) {
  const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtKey,
  };
  passport.use(
    new Strategy(options, (payload, done) => {
      User.findOne({ username: payload.sub })
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
