import "express";

declare module "express-session" {
    interface SessionData {
        user?: string | ObjectId;
    }
}
