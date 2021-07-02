export type MysqlConfig = {
    key: string
    host: Array<string>
    user: string
    password: string
    database: string
    logging: boolean
  }
  
  export type ConfigItem = MysqlConfig | string | Array<string>
  
  export type ConfigMap = {
    [key: string]: ConfigItem
  }