import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './docs/swagger'
import { port } from './config/server'

const app: Express = express()

// middlewares
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get('/', (_req: Request, res: Response) => {
  res.send('HELLO FROM EXPRESS + TS!!!!')
})

app.get('/hi', (_req: Request, res: Response) => {
  res.send('BYEEE!!')
})

app.listen(port, () => {
  console.info(`👺👽👌🏽Server running on port ${port}`)
})
