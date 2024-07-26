import passport from 'passport'
import { Strategy as AzureAdOAuth2Strategy } from 'passport-azure-ad-oauth2'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import { azure, jwtTokent } from '../config/server'
import { findOrCreateUser } from '../services/userService'

interface User {
  id: string
  mail: string
  photo?: string
}

passport.use(new AzureAdOAuth2Strategy({
  clientID: azure.AZURE_AD_CLIENT_ID as string,
  clientSecret: azure.AZURE_AD_CLIENT_SECRET as string,
  callbackURL: azure.AZURE_AD_REDIRECT_URI as string,
  resource: 'https://graph.microsoft.com',
  scope: ['user.read']
}, (accessToken: string, _refreshToken: string, _params: any, _profile: any, done: (error: any, user?: User | false, info?: any) => void) => {
  axios.get('https://graph.microsoft.com/v1.0/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .then(async graphResponse => {
      const user: User = graphResponse.data

      // Obtener la foto de perfil
      const photoResponse = await axios.get('https://graph.microsoft.com/v1.0/me/photo/$value', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        responseType: 'arraybuffer'
      })

      user.photo = `data:image/jpeg;base64,${Buffer.from(photoResponse.data).toString('base64')}`

      if (typeof user.mail === 'string' && user.mail.endsWith('@udla.edu.co')) {
        const savedUser = await findOrCreateUser(user.id, user.mail, user.photo)

        // Firmar un token JWT
        const token = jwt.sign({ id: savedUser.id }, jwtTokent, { expiresIn: '1h' })

        return done(null, { ...savedUser, mail: user.mail }, { token })
      } else {
        return done(null, false, { message: 'Unauthorized domain' })
      }
    })
    .catch(error => {
      return done(error as Error)
    })
}))

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((obj: any, done) => {
  done(null, obj as User)
})
