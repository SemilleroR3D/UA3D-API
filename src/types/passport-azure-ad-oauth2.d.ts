declare module 'passport-azure-ad-oauth2' {
  import { Strategy as PassportStrategy } from 'passport'

  interface StrategyOptions {
    clientID: string
    clientSecret: string
    callbackURL: string
    resource: string
    scope?: string[]
  }

  type VerifyCallback = (err?: Error | null, user?: any, info?: any) => void

    type VerifyFunction = (
      accessToken: string,
      refreshToken: string,
      params: any,
      profile: any,
      done: VerifyCallback
    ) => void

    export class Strategy extends PassportStrategy {
      constructor (options: StrategyOptions, verify: VerifyFunction)
    }
}
