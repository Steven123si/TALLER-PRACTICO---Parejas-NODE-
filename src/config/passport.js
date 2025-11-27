import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../prisma/client.js";


const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const user = await prisma.user.findUnique({
        where: { id: jwt_payload.userId },
      });

      if (!user) return done(null, false);

      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;
