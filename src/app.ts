import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import swaggerUi from 'swagger-ui-express'
import passport from 'passport'
import { swaggerSpec } from './docs/swagger'
import { port } from './config/server'

const app: Express = express()

// middlewares
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Configuración de Passport
require('./config/passport')
app.use(passport.initialize())

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get('/', (_req: Request, res: Response) => {
  res.send('HELLO FROM EXPRESS + TS!!!!')
})

app.get('/status', (_req: Request, res: Response) => {
  res.send('ok')
})

app.listen(port, () => {
  console.info(`👺👽👌🏽Server running on port ${port}`)
})
