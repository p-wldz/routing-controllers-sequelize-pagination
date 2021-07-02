import app from './app'
import { port } from './config'

export default app.listen(port, () => console.log(`API server run as http://127.0.0.1:${port}`))

process.on('uncaughtException', console.error)