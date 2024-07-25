import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { jwtTokent } from '../config/server' // Asegúrate de que 'jwtTokent' esté correctamente importado desde tu configuración

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
 */

/**
 * @swagger
 * /auth/login:
 *   get:
 *     summary: Redirect to Azure AD for login
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirect to Azure AD
 */
export const login = (_req: Request, res: Response): void => {
  res.redirect('/auth/azure')
}

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logout and clear session
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 */
export const logout = (req: Request, res: Response, next: NextFunction): void => {
  req.logout((err) => {
    if (err != null) return next(err)
    res.status(200).json({ message: 'Logged out successfully' })
  })
}

/**
 * @swagger
 * /auth/azure/callback:
 *   get:
 *     summary: Azure AD callback URL
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 */
export const callback = (req: Request, res: Response): void => {
  const user = req.user as { [key: string]: any }
  const token = jwt.sign({ user }, jwtTokent, { expiresIn: '1h' })
  res.status(200).json({ message: 'Login successful', token })
}

/**
 * @swagger
 * /auth/dashboard:
 *   get:
 *     summary: Get user dashboard
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User dashboard
 *       401:
 *         description: Unauthorized
 */
export const dashboard = (req: Request, res: Response): void => {
  const token = req.headers.authorization
  if (token == null || token === '') {
    res.status(401).json({ message: 'No token provided' })
    return
  }

  jwt.verify(token, jwtTokent, (err, decoded) => {
    if (err != null) {
      res.status(500).json({ message: 'Failed to authenticate token' })
      return
    }

    res.status(200).json({ message: 'Welcome to your dashboard', user: (decoded as { [key: string]: any }).user })
  })
}
