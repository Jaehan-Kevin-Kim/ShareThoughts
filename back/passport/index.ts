import * as passport from "passport";
import { User } from "../models/user";
import local from "./local";


export default () => {
    // export function passportConfig() {
    // const passportConfig = () => {

    // passport.serializeUser((user: User, done) =>
    //     done(null, user.id));

    // passport.serializeUser((user: User, done) => {
    //     return done(null, user.id);
    // });
    // passport.serializeUser((user: User, done) => {
    //     return done(null, user.id);
    // });
    passport.serializeUser((user: User, done) => {
        console.log('user: ', user);

        return done(null, user.id);
    });


    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findOne({
                where: { id }
            });
            return done(null, user);
        }
        catch (error) {
            console.error(error);
            return done(error);

        }
    });

    local();
    // }
};

// export default passportConfig;