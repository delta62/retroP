declare module 'js2coffee' {
  export interface JS2CoffeeResult {
    code: string
    ast: unknown
    map: string
    warnings: string[]
  }

  export function build(source: string): JS2CoffeeResult
}
