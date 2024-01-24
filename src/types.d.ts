export declare type AccountTypes =
  | 'dev'
  | 'admin'
  | 'tenant'
  | 'security'
  | 'contractor'

export declare type Email = `${string}@${string}.${string}`

export declare type Phone = `${number}` | `+${number}`

// export declare type ID = `${string}-${string}-${string}-${string}-${string}`
export declare type ID = number

declare global {
  export namespace NodeJS {
    export interface Global {
      /**
       * MySQL database connection pool.
       */
      db: import('mysql2').Pool
    }
  }
}
