import swaggerJSDoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Api Documentacion UA3D',
      version: '1.0.0',
      description: 'Api Documentacion UA3D de la Universidad de la Amazonia'
    }
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts']
}

export const swaggerSpec = swaggerJSDoc(options)
