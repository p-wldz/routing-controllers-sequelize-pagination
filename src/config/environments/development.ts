import { ConfigMap } from '../../types/config'

export const configs: ConfigMap = {
  mysql: {
    host: ['127.0.0.1'],
    user: 'root',
    password: '',
    database: 'sequelize-sample',
    key: 'mysql',
    logging: true
  },
}