process.loadEnvFile()

export const port = process.env.BACK_PORT ?? 3000
export const jwtTokent = process.env.JWT_SECRET as string

export const azure = {
  AZURE_AD_CLIENT_ID: process.env.AZURE_AD_CLIENT_ID,
  AZURE_AD_CLIENT_SECRET: process.env.AZURE_AD_CLIENT_SECRET,
  AZURE_AD_REDIRECT_URI: process.env.AZURE_AD_REDIRECT_URI
}
