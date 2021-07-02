import { configs as pro } from './environments/production'
import { configs as dev } from './environments/development'
import { configs as local } from './environments/local'
import { isPro, isDev, isLocal } from './env'
import { ConfigMap } from '../types/config'

export * from './env'
export * from './server'

let configs: ConfigMap

switch (true) {
  case isPro:
    configs = pro
    break
  case isDev:
    configs = dev
    break
  case isLocal:
  default:
    configs = local
}

export { configs }