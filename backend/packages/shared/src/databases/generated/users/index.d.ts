
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model address
 * 
 */
export type address = {
  addressId: string
  userId: number
  name: string
  phoneNumber: string
  email: string
  streetAddress: string
  city: string
  state: string
  zip: string
}

/**
 * Model user
 * 
 */
export type user = {
  userId: number
  name: string
  email: string
  password: string
  phoneNumber: string | null
  flags: bigint
  createdAt: Date
}

/**
 * Model session
 * 
 */
export type session = {
  sessionId: string
  userId: number
  createdAt: Date
  lastUsedAt: Date
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Addresses
 * const addresses = await prisma.address.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Addresses
   * const addresses = await prisma.address.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P]): Promise<UnwrapTuple<P>>;

      /**
   * `prisma.address`: Exposes CRUD operations for the **address** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Addresses
    * const addresses = await prisma.address.findMany()
    * ```
    */
  get address(): Prisma.addressDelegate<GlobalReject>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **user** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.userDelegate<GlobalReject>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.sessionDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  /**
   * Prisma Client JS version: 3.12.0
   * Query Engine version: 22b822189f46ef0dc5c5b503368d1bee01213980
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: 'DbNull'

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: 'JsonNull'

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: 'AnyNull'

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Buffer
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    address: 'address',
    user: 'user',
    session: 'session'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     *  * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your prisma.schema file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'

  /**
   * These options are being passed in to the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined; 
  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */


  export type UserCountOutputType = {
    addresses: number
    sessions: number
  }

  export type UserCountOutputTypeSelect = {
    addresses?: boolean
    sessions?: boolean
  }

  export type UserCountOutputTypeGetPayload<
    S extends boolean | null | undefined | UserCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? UserCountOutputType
    : S extends undefined
    ? never
    : S extends UserCountOutputTypeArgs
    ?'include' extends U
    ? UserCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof UserCountOutputType ? UserCountOutputType[P] : never
  } 
    : UserCountOutputType
  : UserCountOutputType




  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     * 
    **/
    select?: UserCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model address
   */


  export type AggregateAddress = {
    _count: AddressCountAggregateOutputType | null
    _avg: AddressAvgAggregateOutputType | null
    _sum: AddressSumAggregateOutputType | null
    _min: AddressMinAggregateOutputType | null
    _max: AddressMaxAggregateOutputType | null
  }

  export type AddressAvgAggregateOutputType = {
    userId: number | null
  }

  export type AddressSumAggregateOutputType = {
    userId: number | null
  }

  export type AddressMinAggregateOutputType = {
    addressId: string | null
    userId: number | null
    name: string | null
    phoneNumber: string | null
    email: string | null
    streetAddress: string | null
    city: string | null
    state: string | null
    zip: string | null
  }

  export type AddressMaxAggregateOutputType = {
    addressId: string | null
    userId: number | null
    name: string | null
    phoneNumber: string | null
    email: string | null
    streetAddress: string | null
    city: string | null
    state: string | null
    zip: string | null
  }

  export type AddressCountAggregateOutputType = {
    addressId: number
    userId: number
    name: number
    phoneNumber: number
    email: number
    streetAddress: number
    city: number
    state: number
    zip: number
    _all: number
  }


  export type AddressAvgAggregateInputType = {
    userId?: true
  }

  export type AddressSumAggregateInputType = {
    userId?: true
  }

  export type AddressMinAggregateInputType = {
    addressId?: true
    userId?: true
    name?: true
    phoneNumber?: true
    email?: true
    streetAddress?: true
    city?: true
    state?: true
    zip?: true
  }

  export type AddressMaxAggregateInputType = {
    addressId?: true
    userId?: true
    name?: true
    phoneNumber?: true
    email?: true
    streetAddress?: true
    city?: true
    state?: true
    zip?: true
  }

  export type AddressCountAggregateInputType = {
    addressId?: true
    userId?: true
    name?: true
    phoneNumber?: true
    email?: true
    streetAddress?: true
    city?: true
    state?: true
    zip?: true
    _all?: true
  }

  export type AddressAggregateArgs = {
    /**
     * Filter which address to aggregate.
     * 
    **/
    where?: addressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of addresses to fetch.
     * 
    **/
    orderBy?: Enumerable<addressOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: addressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` addresses from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` addresses.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned addresses
    **/
    _count?: true | AddressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AddressAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AddressSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AddressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AddressMaxAggregateInputType
  }

  export type GetAddressAggregateType<T extends AddressAggregateArgs> = {
        [P in keyof T & keyof AggregateAddress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAddress[P]>
      : GetScalarType<T[P], AggregateAddress[P]>
  }




  export type AddressGroupByArgs = {
    where?: addressWhereInput
    orderBy?: Enumerable<addressOrderByWithAggregationInput>
    by: Array<AddressScalarFieldEnum>
    having?: addressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AddressCountAggregateInputType | true
    _avg?: AddressAvgAggregateInputType
    _sum?: AddressSumAggregateInputType
    _min?: AddressMinAggregateInputType
    _max?: AddressMaxAggregateInputType
  }


  export type AddressGroupByOutputType = {
    addressId: string
    userId: number
    name: string
    phoneNumber: string
    email: string
    streetAddress: string
    city: string
    state: string
    zip: string
    _count: AddressCountAggregateOutputType | null
    _avg: AddressAvgAggregateOutputType | null
    _sum: AddressSumAggregateOutputType | null
    _min: AddressMinAggregateOutputType | null
    _max: AddressMaxAggregateOutputType | null
  }

  type GetAddressGroupByPayload<T extends AddressGroupByArgs> = PrismaPromise<
    Array<
      PickArray<AddressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AddressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AddressGroupByOutputType[P]>
            : GetScalarType<T[P], AddressGroupByOutputType[P]>
        }
      >
    >


  export type addressSelect = {
    addressId?: boolean
    userId?: boolean
    name?: boolean
    phoneNumber?: boolean
    email?: boolean
    streetAddress?: boolean
    city?: boolean
    state?: boolean
    zip?: boolean
    user?: boolean | userArgs
  }

  export type addressInclude = {
    user?: boolean | userArgs
  }

  export type addressGetPayload<
    S extends boolean | null | undefined | addressArgs,
    U = keyof S
      > = S extends true
        ? address
    : S extends undefined
    ? never
    : S extends addressArgs | addressFindManyArgs
    ?'include' extends U
    ? address  & {
    [P in TrueKeys<S['include']>]:
        P extends 'user' ? userGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'user' ? userGetPayload<S['select'][P]> :  P extends keyof address ? address[P] : never
  } 
    : address
  : address


  type addressCountArgs = Merge<
    Omit<addressFindManyArgs, 'select' | 'include'> & {
      select?: AddressCountAggregateInputType | true
    }
  >

  export interface addressDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Address that matches the filter.
     * @param {addressFindUniqueArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends addressFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, addressFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'address'> extends True ? CheckSelect<T, Prisma__addressClient<address>, Prisma__addressClient<addressGetPayload<T>>> : CheckSelect<T, Prisma__addressClient<address | null >, Prisma__addressClient<addressGetPayload<T> | null >>

    /**
     * Find the first Address that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {addressFindFirstArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends addressFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, addressFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'address'> extends True ? CheckSelect<T, Prisma__addressClient<address>, Prisma__addressClient<addressGetPayload<T>>> : CheckSelect<T, Prisma__addressClient<address | null >, Prisma__addressClient<addressGetPayload<T> | null >>

    /**
     * Find zero or more Addresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {addressFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Addresses
     * const addresses = await prisma.address.findMany()
     * 
     * // Get first 10 Addresses
     * const addresses = await prisma.address.findMany({ take: 10 })
     * 
     * // Only select the `addressId`
     * const addressWithAddressIdOnly = await prisma.address.findMany({ select: { addressId: true } })
     * 
    **/
    findMany<T extends addressFindManyArgs>(
      args?: SelectSubset<T, addressFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<address>>, PrismaPromise<Array<addressGetPayload<T>>>>

    /**
     * Create a Address.
     * @param {addressCreateArgs} args - Arguments to create a Address.
     * @example
     * // Create one Address
     * const Address = await prisma.address.create({
     *   data: {
     *     // ... data to create a Address
     *   }
     * })
     * 
    **/
    create<T extends addressCreateArgs>(
      args: SelectSubset<T, addressCreateArgs>
    ): CheckSelect<T, Prisma__addressClient<address>, Prisma__addressClient<addressGetPayload<T>>>

    /**
     * Create many Addresses.
     *     @param {addressCreateManyArgs} args - Arguments to create many Addresses.
     *     @example
     *     // Create many Addresses
     *     const address = await prisma.address.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends addressCreateManyArgs>(
      args?: SelectSubset<T, addressCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Address.
     * @param {addressDeleteArgs} args - Arguments to delete one Address.
     * @example
     * // Delete one Address
     * const Address = await prisma.address.delete({
     *   where: {
     *     // ... filter to delete one Address
     *   }
     * })
     * 
    **/
    delete<T extends addressDeleteArgs>(
      args: SelectSubset<T, addressDeleteArgs>
    ): CheckSelect<T, Prisma__addressClient<address>, Prisma__addressClient<addressGetPayload<T>>>

    /**
     * Update one Address.
     * @param {addressUpdateArgs} args - Arguments to update one Address.
     * @example
     * // Update one Address
     * const address = await prisma.address.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends addressUpdateArgs>(
      args: SelectSubset<T, addressUpdateArgs>
    ): CheckSelect<T, Prisma__addressClient<address>, Prisma__addressClient<addressGetPayload<T>>>

    /**
     * Delete zero or more Addresses.
     * @param {addressDeleteManyArgs} args - Arguments to filter Addresses to delete.
     * @example
     * // Delete a few Addresses
     * const { count } = await prisma.address.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends addressDeleteManyArgs>(
      args?: SelectSubset<T, addressDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Addresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {addressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Addresses
     * const address = await prisma.address.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends addressUpdateManyArgs>(
      args: SelectSubset<T, addressUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Address.
     * @param {addressUpsertArgs} args - Arguments to update or create a Address.
     * @example
     * // Update or create a Address
     * const address = await prisma.address.upsert({
     *   create: {
     *     // ... data to create a Address
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Address we want to update
     *   }
     * })
    **/
    upsert<T extends addressUpsertArgs>(
      args: SelectSubset<T, addressUpsertArgs>
    ): CheckSelect<T, Prisma__addressClient<address>, Prisma__addressClient<addressGetPayload<T>>>

    /**
     * Count the number of Addresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {addressCountArgs} args - Arguments to filter Addresses to count.
     * @example
     * // Count the number of Addresses
     * const count = await prisma.address.count({
     *   where: {
     *     // ... the filter for the Addresses we want to count
     *   }
     * })
    **/
    count<T extends addressCountArgs>(
      args?: Subset<T, addressCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AddressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Address.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AddressAggregateArgs>(args: Subset<T, AddressAggregateArgs>): PrismaPromise<GetAddressAggregateType<T>>

    /**
     * Group by Address.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AddressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AddressGroupByArgs['orderBy'] }
        : { orderBy?: AddressGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AddressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAddressGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for address.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__addressClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends userArgs = {}>(args?: Subset<T, userArgs>): CheckSelect<T, Prisma__userClient<user | null >, Prisma__userClient<userGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * address findUnique
   */
  export type addressFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the address
     * 
    **/
    select?: addressSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: addressInclude | null
    /**
     * Throw an Error if a address can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which address to fetch.
     * 
    **/
    where: addressWhereUniqueInput
  }


  /**
   * address findFirst
   */
  export type addressFindFirstArgs = {
    /**
     * Select specific fields to fetch from the address
     * 
    **/
    select?: addressSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: addressInclude | null
    /**
     * Throw an Error if a address can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which address to fetch.
     * 
    **/
    where?: addressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of addresses to fetch.
     * 
    **/
    orderBy?: Enumerable<addressOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for addresses.
     * 
    **/
    cursor?: addressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` addresses from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` addresses.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of addresses.
     * 
    **/
    distinct?: Enumerable<AddressScalarFieldEnum>
  }


  /**
   * address findMany
   */
  export type addressFindManyArgs = {
    /**
     * Select specific fields to fetch from the address
     * 
    **/
    select?: addressSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: addressInclude | null
    /**
     * Filter, which addresses to fetch.
     * 
    **/
    where?: addressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of addresses to fetch.
     * 
    **/
    orderBy?: Enumerable<addressOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing addresses.
     * 
    **/
    cursor?: addressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` addresses from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` addresses.
     * 
    **/
    skip?: number
    distinct?: Enumerable<AddressScalarFieldEnum>
  }


  /**
   * address create
   */
  export type addressCreateArgs = {
    /**
     * Select specific fields to fetch from the address
     * 
    **/
    select?: addressSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: addressInclude | null
    /**
     * The data needed to create a address.
     * 
    **/
    data: XOR<addressCreateInput, addressUncheckedCreateInput>
  }


  /**
   * address createMany
   */
  export type addressCreateManyArgs = {
    /**
     * The data used to create many addresses.
     * 
    **/
    data: Enumerable<addressCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * address update
   */
  export type addressUpdateArgs = {
    /**
     * Select specific fields to fetch from the address
     * 
    **/
    select?: addressSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: addressInclude | null
    /**
     * The data needed to update a address.
     * 
    **/
    data: XOR<addressUpdateInput, addressUncheckedUpdateInput>
    /**
     * Choose, which address to update.
     * 
    **/
    where: addressWhereUniqueInput
  }


  /**
   * address updateMany
   */
  export type addressUpdateManyArgs = {
    /**
     * The data used to update addresses.
     * 
    **/
    data: XOR<addressUpdateManyMutationInput, addressUncheckedUpdateManyInput>
    /**
     * Filter which addresses to update
     * 
    **/
    where?: addressWhereInput
  }


  /**
   * address upsert
   */
  export type addressUpsertArgs = {
    /**
     * Select specific fields to fetch from the address
     * 
    **/
    select?: addressSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: addressInclude | null
    /**
     * The filter to search for the address to update in case it exists.
     * 
    **/
    where: addressWhereUniqueInput
    /**
     * In case the address found by the `where` argument doesn't exist, create a new address with this data.
     * 
    **/
    create: XOR<addressCreateInput, addressUncheckedCreateInput>
    /**
     * In case the address was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<addressUpdateInput, addressUncheckedUpdateInput>
  }


  /**
   * address delete
   */
  export type addressDeleteArgs = {
    /**
     * Select specific fields to fetch from the address
     * 
    **/
    select?: addressSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: addressInclude | null
    /**
     * Filter which address to delete.
     * 
    **/
    where: addressWhereUniqueInput
  }


  /**
   * address deleteMany
   */
  export type addressDeleteManyArgs = {
    /**
     * Filter which addresses to delete
     * 
    **/
    where?: addressWhereInput
  }


  /**
   * address without action
   */
  export type addressArgs = {
    /**
     * Select specific fields to fetch from the address
     * 
    **/
    select?: addressSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: addressInclude | null
  }



  /**
   * Model user
   */


  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    userId: number | null
    flags: number | null
  }

  export type UserSumAggregateOutputType = {
    userId: number | null
    flags: bigint | null
  }

  export type UserMinAggregateOutputType = {
    userId: number | null
    name: string | null
    email: string | null
    password: string | null
    phoneNumber: string | null
    flags: bigint | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    userId: number | null
    name: string | null
    email: string | null
    password: string | null
    phoneNumber: string | null
    flags: bigint | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    userId: number
    name: number
    email: number
    password: number
    phoneNumber: number
    flags: number
    createdAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    userId?: true
    flags?: true
  }

  export type UserSumAggregateInputType = {
    userId?: true
    flags?: true
  }

  export type UserMinAggregateInputType = {
    userId?: true
    name?: true
    email?: true
    password?: true
    phoneNumber?: true
    flags?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    userId?: true
    name?: true
    email?: true
    password?: true
    phoneNumber?: true
    flags?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    userId?: true
    name?: true
    email?: true
    password?: true
    phoneNumber?: true
    flags?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs = {
    /**
     * Filter which user to aggregate.
     * 
    **/
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     * 
    **/
    orderBy?: Enumerable<userOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs = {
    where?: userWhereInput
    orderBy?: Enumerable<userOrderByWithAggregationInput>
    by: Array<UserScalarFieldEnum>
    having?: userScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }


  export type UserGroupByOutputType = {
    userId: number
    name: string
    email: string
    password: string
    phoneNumber: string | null
    flags: bigint
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = PrismaPromise<
    Array<
      PickArray<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type userSelect = {
    userId?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    phoneNumber?: boolean
    flags?: boolean
    createdAt?: boolean
    addresses?: boolean | addressFindManyArgs
    sessions?: boolean | sessionFindManyArgs
    _count?: boolean | UserCountOutputTypeArgs
  }

  export type userInclude = {
    addresses?: boolean | addressFindManyArgs
    sessions?: boolean | sessionFindManyArgs
    _count?: boolean | UserCountOutputTypeArgs
  }

  export type userGetPayload<
    S extends boolean | null | undefined | userArgs,
    U = keyof S
      > = S extends true
        ? user
    : S extends undefined
    ? never
    : S extends userArgs | userFindManyArgs
    ?'include' extends U
    ? user  & {
    [P in TrueKeys<S['include']>]:
        P extends 'addresses' ? Array < addressGetPayload<S['include'][P]>>  :
        P extends 'sessions' ? Array < sessionGetPayload<S['include'][P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'addresses' ? Array < addressGetPayload<S['select'][P]>>  :
        P extends 'sessions' ? Array < sessionGetPayload<S['select'][P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof user ? user[P] : never
  } 
    : user
  : user


  type userCountArgs = Merge<
    Omit<userFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }
  >

  export interface userDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one User that matches the filter.
     * @param {userFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends userFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, userFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'user'> extends True ? CheckSelect<T, Prisma__userClient<user>, Prisma__userClient<userGetPayload<T>>> : CheckSelect<T, Prisma__userClient<user | null >, Prisma__userClient<userGetPayload<T> | null >>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends userFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, userFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'user'> extends True ? CheckSelect<T, Prisma__userClient<user>, Prisma__userClient<userGetPayload<T>>> : CheckSelect<T, Prisma__userClient<user | null >, Prisma__userClient<userGetPayload<T> | null >>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const userWithUserIdOnly = await prisma.user.findMany({ select: { userId: true } })
     * 
    **/
    findMany<T extends userFindManyArgs>(
      args?: SelectSubset<T, userFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<user>>, PrismaPromise<Array<userGetPayload<T>>>>

    /**
     * Create a User.
     * @param {userCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends userCreateArgs>(
      args: SelectSubset<T, userCreateArgs>
    ): CheckSelect<T, Prisma__userClient<user>, Prisma__userClient<userGetPayload<T>>>

    /**
     * Create many Users.
     *     @param {userCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends userCreateManyArgs>(
      args?: SelectSubset<T, userCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {userDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends userDeleteArgs>(
      args: SelectSubset<T, userDeleteArgs>
    ): CheckSelect<T, Prisma__userClient<user>, Prisma__userClient<userGetPayload<T>>>

    /**
     * Update one User.
     * @param {userUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends userUpdateArgs>(
      args: SelectSubset<T, userUpdateArgs>
    ): CheckSelect<T, Prisma__userClient<user>, Prisma__userClient<userGetPayload<T>>>

    /**
     * Delete zero or more Users.
     * @param {userDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends userDeleteManyArgs>(
      args?: SelectSubset<T, userDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends userUpdateManyArgs>(
      args: SelectSubset<T, userUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {userUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends userUpsertArgs>(
      args: SelectSubset<T, userUpsertArgs>
    ): CheckSelect<T, Prisma__userClient<user>, Prisma__userClient<userGetPayload<T>>>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends userCountArgs>(
      args?: Subset<T, userCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for user.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__userClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    addresses<T extends addressFindManyArgs = {}>(args?: Subset<T, addressFindManyArgs>): CheckSelect<T, PrismaPromise<Array<address>>, PrismaPromise<Array<addressGetPayload<T>>>>;

    sessions<T extends sessionFindManyArgs = {}>(args?: Subset<T, sessionFindManyArgs>): CheckSelect<T, PrismaPromise<Array<session>>, PrismaPromise<Array<sessionGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * user findUnique
   */
  export type userFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the user
     * 
    **/
    select?: userSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: userInclude | null
    /**
     * Throw an Error if a user can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which user to fetch.
     * 
    **/
    where: userWhereUniqueInput
  }


  /**
   * user findFirst
   */
  export type userFindFirstArgs = {
    /**
     * Select specific fields to fetch from the user
     * 
    **/
    select?: userSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: userInclude | null
    /**
     * Throw an Error if a user can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which user to fetch.
     * 
    **/
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     * 
    **/
    orderBy?: Enumerable<userOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     * 
    **/
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     * 
    **/
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * user findMany
   */
  export type userFindManyArgs = {
    /**
     * Select specific fields to fetch from the user
     * 
    **/
    select?: userSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: userInclude | null
    /**
     * Filter, which users to fetch.
     * 
    **/
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     * 
    **/
    orderBy?: Enumerable<userOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     * 
    **/
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     * 
    **/
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * user create
   */
  export type userCreateArgs = {
    /**
     * Select specific fields to fetch from the user
     * 
    **/
    select?: userSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: userInclude | null
    /**
     * The data needed to create a user.
     * 
    **/
    data: XOR<userCreateInput, userUncheckedCreateInput>
  }


  /**
   * user createMany
   */
  export type userCreateManyArgs = {
    /**
     * The data used to create many users.
     * 
    **/
    data: Enumerable<userCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * user update
   */
  export type userUpdateArgs = {
    /**
     * Select specific fields to fetch from the user
     * 
    **/
    select?: userSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: userInclude | null
    /**
     * The data needed to update a user.
     * 
    **/
    data: XOR<userUpdateInput, userUncheckedUpdateInput>
    /**
     * Choose, which user to update.
     * 
    **/
    where: userWhereUniqueInput
  }


  /**
   * user updateMany
   */
  export type userUpdateManyArgs = {
    /**
     * The data used to update users.
     * 
    **/
    data: XOR<userUpdateManyMutationInput, userUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     * 
    **/
    where?: userWhereInput
  }


  /**
   * user upsert
   */
  export type userUpsertArgs = {
    /**
     * Select specific fields to fetch from the user
     * 
    **/
    select?: userSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: userInclude | null
    /**
     * The filter to search for the user to update in case it exists.
     * 
    **/
    where: userWhereUniqueInput
    /**
     * In case the user found by the `where` argument doesn't exist, create a new user with this data.
     * 
    **/
    create: XOR<userCreateInput, userUncheckedCreateInput>
    /**
     * In case the user was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<userUpdateInput, userUncheckedUpdateInput>
  }


  /**
   * user delete
   */
  export type userDeleteArgs = {
    /**
     * Select specific fields to fetch from the user
     * 
    **/
    select?: userSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: userInclude | null
    /**
     * Filter which user to delete.
     * 
    **/
    where: userWhereUniqueInput
  }


  /**
   * user deleteMany
   */
  export type userDeleteManyArgs = {
    /**
     * Filter which users to delete
     * 
    **/
    where?: userWhereInput
  }


  /**
   * user without action
   */
  export type userArgs = {
    /**
     * Select specific fields to fetch from the user
     * 
    **/
    select?: userSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: userInclude | null
  }



  /**
   * Model session
   */


  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _avg: SessionAvgAggregateOutputType | null
    _sum: SessionSumAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionAvgAggregateOutputType = {
    userId: number | null
  }

  export type SessionSumAggregateOutputType = {
    userId: number | null
  }

  export type SessionMinAggregateOutputType = {
    sessionId: string | null
    userId: number | null
    createdAt: Date | null
    lastUsedAt: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    sessionId: string | null
    userId: number | null
    createdAt: Date | null
    lastUsedAt: Date | null
  }

  export type SessionCountAggregateOutputType = {
    sessionId: number
    userId: number
    createdAt: number
    lastUsedAt: number
    _all: number
  }


  export type SessionAvgAggregateInputType = {
    userId?: true
  }

  export type SessionSumAggregateInputType = {
    userId?: true
  }

  export type SessionMinAggregateInputType = {
    sessionId?: true
    userId?: true
    createdAt?: true
    lastUsedAt?: true
  }

  export type SessionMaxAggregateInputType = {
    sessionId?: true
    userId?: true
    createdAt?: true
    lastUsedAt?: true
  }

  export type SessionCountAggregateInputType = {
    sessionId?: true
    userId?: true
    createdAt?: true
    lastUsedAt?: true
    _all?: true
  }

  export type SessionAggregateArgs = {
    /**
     * Filter which session to aggregate.
     * 
    **/
    where?: sessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sessions to fetch.
     * 
    **/
    orderBy?: Enumerable<sessionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: sessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sessions from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sessions.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs = {
    where?: sessionWhereInput
    orderBy?: Enumerable<sessionOrderByWithAggregationInput>
    by: Array<SessionScalarFieldEnum>
    having?: sessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _avg?: SessionAvgAggregateInputType
    _sum?: SessionSumAggregateInputType
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }


  export type SessionGroupByOutputType = {
    sessionId: string
    userId: number
    createdAt: Date
    lastUsedAt: Date
    _count: SessionCountAggregateOutputType | null
    _avg: SessionAvgAggregateOutputType | null
    _sum: SessionSumAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = PrismaPromise<
    Array<
      PickArray<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type sessionSelect = {
    sessionId?: boolean
    userId?: boolean
    createdAt?: boolean
    lastUsedAt?: boolean
    user?: boolean | userArgs
  }

  export type sessionInclude = {
    user?: boolean | userArgs
  }

  export type sessionGetPayload<
    S extends boolean | null | undefined | sessionArgs,
    U = keyof S
      > = S extends true
        ? session
    : S extends undefined
    ? never
    : S extends sessionArgs | sessionFindManyArgs
    ?'include' extends U
    ? session  & {
    [P in TrueKeys<S['include']>]:
        P extends 'user' ? userGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'user' ? userGetPayload<S['select'][P]> :  P extends keyof session ? session[P] : never
  } 
    : session
  : session


  type sessionCountArgs = Merge<
    Omit<sessionFindManyArgs, 'select' | 'include'> & {
      select?: SessionCountAggregateInputType | true
    }
  >

  export interface sessionDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Session that matches the filter.
     * @param {sessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends sessionFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, sessionFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'session'> extends True ? CheckSelect<T, Prisma__sessionClient<session>, Prisma__sessionClient<sessionGetPayload<T>>> : CheckSelect<T, Prisma__sessionClient<session | null >, Prisma__sessionClient<sessionGetPayload<T> | null >>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends sessionFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, sessionFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'session'> extends True ? CheckSelect<T, Prisma__sessionClient<session>, Prisma__sessionClient<sessionGetPayload<T>>> : CheckSelect<T, Prisma__sessionClient<session | null >, Prisma__sessionClient<sessionGetPayload<T> | null >>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessionFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `sessionId`
     * const sessionWithSessionIdOnly = await prisma.session.findMany({ select: { sessionId: true } })
     * 
    **/
    findMany<T extends sessionFindManyArgs>(
      args?: SelectSubset<T, sessionFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<session>>, PrismaPromise<Array<sessionGetPayload<T>>>>

    /**
     * Create a Session.
     * @param {sessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
    **/
    create<T extends sessionCreateArgs>(
      args: SelectSubset<T, sessionCreateArgs>
    ): CheckSelect<T, Prisma__sessionClient<session>, Prisma__sessionClient<sessionGetPayload<T>>>

    /**
     * Create many Sessions.
     *     @param {sessionCreateManyArgs} args - Arguments to create many Sessions.
     *     @example
     *     // Create many Sessions
     *     const session = await prisma.session.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends sessionCreateManyArgs>(
      args?: SelectSubset<T, sessionCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Session.
     * @param {sessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
    **/
    delete<T extends sessionDeleteArgs>(
      args: SelectSubset<T, sessionDeleteArgs>
    ): CheckSelect<T, Prisma__sessionClient<session>, Prisma__sessionClient<sessionGetPayload<T>>>

    /**
     * Update one Session.
     * @param {sessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends sessionUpdateArgs>(
      args: SelectSubset<T, sessionUpdateArgs>
    ): CheckSelect<T, Prisma__sessionClient<session>, Prisma__sessionClient<sessionGetPayload<T>>>

    /**
     * Delete zero or more Sessions.
     * @param {sessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends sessionDeleteManyArgs>(
      args?: SelectSubset<T, sessionDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends sessionUpdateManyArgs>(
      args: SelectSubset<T, sessionUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Session.
     * @param {sessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
    **/
    upsert<T extends sessionUpsertArgs>(
      args: SelectSubset<T, sessionUpsertArgs>
    ): CheckSelect<T, Prisma__sessionClient<session>, Prisma__sessionClient<sessionGetPayload<T>>>

    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends sessionCountArgs>(
      args?: Subset<T, sessionCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__sessionClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends userArgs = {}>(args?: Subset<T, userArgs>): CheckSelect<T, Prisma__userClient<user | null >, Prisma__userClient<userGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * session findUnique
   */
  export type sessionFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the session
     * 
    **/
    select?: sessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: sessionInclude | null
    /**
     * Throw an Error if a session can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which session to fetch.
     * 
    **/
    where: sessionWhereUniqueInput
  }


  /**
   * session findFirst
   */
  export type sessionFindFirstArgs = {
    /**
     * Select specific fields to fetch from the session
     * 
    **/
    select?: sessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: sessionInclude | null
    /**
     * Throw an Error if a session can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which session to fetch.
     * 
    **/
    where?: sessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sessions to fetch.
     * 
    **/
    orderBy?: Enumerable<sessionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for sessions.
     * 
    **/
    cursor?: sessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sessions from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sessions.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sessions.
     * 
    **/
    distinct?: Enumerable<SessionScalarFieldEnum>
  }


  /**
   * session findMany
   */
  export type sessionFindManyArgs = {
    /**
     * Select specific fields to fetch from the session
     * 
    **/
    select?: sessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: sessionInclude | null
    /**
     * Filter, which sessions to fetch.
     * 
    **/
    where?: sessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sessions to fetch.
     * 
    **/
    orderBy?: Enumerable<sessionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing sessions.
     * 
    **/
    cursor?: sessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sessions from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sessions.
     * 
    **/
    skip?: number
    distinct?: Enumerable<SessionScalarFieldEnum>
  }


  /**
   * session create
   */
  export type sessionCreateArgs = {
    /**
     * Select specific fields to fetch from the session
     * 
    **/
    select?: sessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: sessionInclude | null
    /**
     * The data needed to create a session.
     * 
    **/
    data: XOR<sessionCreateInput, sessionUncheckedCreateInput>
  }


  /**
   * session createMany
   */
  export type sessionCreateManyArgs = {
    /**
     * The data used to create many sessions.
     * 
    **/
    data: Enumerable<sessionCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * session update
   */
  export type sessionUpdateArgs = {
    /**
     * Select specific fields to fetch from the session
     * 
    **/
    select?: sessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: sessionInclude | null
    /**
     * The data needed to update a session.
     * 
    **/
    data: XOR<sessionUpdateInput, sessionUncheckedUpdateInput>
    /**
     * Choose, which session to update.
     * 
    **/
    where: sessionWhereUniqueInput
  }


  /**
   * session updateMany
   */
  export type sessionUpdateManyArgs = {
    /**
     * The data used to update sessions.
     * 
    **/
    data: XOR<sessionUpdateManyMutationInput, sessionUncheckedUpdateManyInput>
    /**
     * Filter which sessions to update
     * 
    **/
    where?: sessionWhereInput
  }


  /**
   * session upsert
   */
  export type sessionUpsertArgs = {
    /**
     * Select specific fields to fetch from the session
     * 
    **/
    select?: sessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: sessionInclude | null
    /**
     * The filter to search for the session to update in case it exists.
     * 
    **/
    where: sessionWhereUniqueInput
    /**
     * In case the session found by the `where` argument doesn't exist, create a new session with this data.
     * 
    **/
    create: XOR<sessionCreateInput, sessionUncheckedCreateInput>
    /**
     * In case the session was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<sessionUpdateInput, sessionUncheckedUpdateInput>
  }


  /**
   * session delete
   */
  export type sessionDeleteArgs = {
    /**
     * Select specific fields to fetch from the session
     * 
    **/
    select?: sessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: sessionInclude | null
    /**
     * Filter which session to delete.
     * 
    **/
    where: sessionWhereUniqueInput
  }


  /**
   * session deleteMany
   */
  export type sessionDeleteManyArgs = {
    /**
     * Filter which sessions to delete
     * 
    **/
    where?: sessionWhereInput
  }


  /**
   * session without action
   */
  export type sessionArgs = {
    /**
     * Select specific fields to fetch from the session
     * 
    **/
    select?: sessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: sessionInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const AddressScalarFieldEnum: {
    addressId: 'addressId',
    userId: 'userId',
    name: 'name',
    phoneNumber: 'phoneNumber',
    email: 'email',
    streetAddress: 'streetAddress',
    city: 'city',
    state: 'state',
    zip: 'zip'
  };

  export type AddressScalarFieldEnum = (typeof AddressScalarFieldEnum)[keyof typeof AddressScalarFieldEnum]


  export const UserScalarFieldEnum: {
    userId: 'userId',
    name: 'name',
    email: 'email',
    password: 'password',
    phoneNumber: 'phoneNumber',
    flags: 'flags',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    sessionId: 'sessionId',
    userId: 'userId',
    createdAt: 'createdAt',
    lastUsedAt: 'lastUsedAt'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Deep Input Types
   */


  export type addressWhereInput = {
    AND?: Enumerable<addressWhereInput>
    OR?: Enumerable<addressWhereInput>
    NOT?: Enumerable<addressWhereInput>
    addressId?: StringFilter | string
    userId?: IntFilter | number
    name?: StringFilter | string
    phoneNumber?: StringFilter | string
    email?: StringFilter | string
    streetAddress?: StringFilter | string
    city?: StringFilter | string
    state?: StringFilter | string
    zip?: StringFilter | string
    user?: XOR<UserRelationFilter, userWhereInput>
  }

  export type addressOrderByWithRelationInput = {
    addressId?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    phoneNumber?: SortOrder
    email?: SortOrder
    streetAddress?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zip?: SortOrder
    user?: userOrderByWithRelationInput
  }

  export type addressWhereUniqueInput = {
    addressId?: string
  }

  export type addressOrderByWithAggregationInput = {
    addressId?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    phoneNumber?: SortOrder
    email?: SortOrder
    streetAddress?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zip?: SortOrder
    _count?: addressCountOrderByAggregateInput
    _avg?: addressAvgOrderByAggregateInput
    _max?: addressMaxOrderByAggregateInput
    _min?: addressMinOrderByAggregateInput
    _sum?: addressSumOrderByAggregateInput
  }

  export type addressScalarWhereWithAggregatesInput = {
    AND?: Enumerable<addressScalarWhereWithAggregatesInput>
    OR?: Enumerable<addressScalarWhereWithAggregatesInput>
    NOT?: Enumerable<addressScalarWhereWithAggregatesInput>
    addressId?: StringWithAggregatesFilter | string
    userId?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    phoneNumber?: StringWithAggregatesFilter | string
    email?: StringWithAggregatesFilter | string
    streetAddress?: StringWithAggregatesFilter | string
    city?: StringWithAggregatesFilter | string
    state?: StringWithAggregatesFilter | string
    zip?: StringWithAggregatesFilter | string
  }

  export type userWhereInput = {
    AND?: Enumerable<userWhereInput>
    OR?: Enumerable<userWhereInput>
    NOT?: Enumerable<userWhereInput>
    userId?: IntFilter | number
    name?: StringFilter | string
    email?: StringFilter | string
    password?: StringFilter | string
    phoneNumber?: StringNullableFilter | string | null
    flags?: BigIntFilter | bigint | number
    createdAt?: DateTimeFilter | Date | string
    addresses?: AddressListRelationFilter
    sessions?: SessionListRelationFilter
  }

  export type userOrderByWithRelationInput = {
    userId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phoneNumber?: SortOrder
    flags?: SortOrder
    createdAt?: SortOrder
    addresses?: addressOrderByRelationAggregateInput
    sessions?: sessionOrderByRelationAggregateInput
  }

  export type userWhereUniqueInput = {
    userId?: number
    email?: string
    phoneNumber?: string
  }

  export type userOrderByWithAggregationInput = {
    userId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phoneNumber?: SortOrder
    flags?: SortOrder
    createdAt?: SortOrder
    _count?: userCountOrderByAggregateInput
    _avg?: userAvgOrderByAggregateInput
    _max?: userMaxOrderByAggregateInput
    _min?: userMinOrderByAggregateInput
    _sum?: userSumOrderByAggregateInput
  }

  export type userScalarWhereWithAggregatesInput = {
    AND?: Enumerable<userScalarWhereWithAggregatesInput>
    OR?: Enumerable<userScalarWhereWithAggregatesInput>
    NOT?: Enumerable<userScalarWhereWithAggregatesInput>
    userId?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    email?: StringWithAggregatesFilter | string
    password?: StringWithAggregatesFilter | string
    phoneNumber?: StringNullableWithAggregatesFilter | string | null
    flags?: BigIntWithAggregatesFilter | bigint | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type sessionWhereInput = {
    AND?: Enumerable<sessionWhereInput>
    OR?: Enumerable<sessionWhereInput>
    NOT?: Enumerable<sessionWhereInput>
    sessionId?: StringFilter | string
    userId?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    lastUsedAt?: DateTimeFilter | Date | string
    user?: XOR<UserRelationFilter, userWhereInput>
  }

  export type sessionOrderByWithRelationInput = {
    sessionId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    lastUsedAt?: SortOrder
    user?: userOrderByWithRelationInput
  }

  export type sessionWhereUniqueInput = {
    sessionId?: string
  }

  export type sessionOrderByWithAggregationInput = {
    sessionId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    lastUsedAt?: SortOrder
    _count?: sessionCountOrderByAggregateInput
    _avg?: sessionAvgOrderByAggregateInput
    _max?: sessionMaxOrderByAggregateInput
    _min?: sessionMinOrderByAggregateInput
    _sum?: sessionSumOrderByAggregateInput
  }

  export type sessionScalarWhereWithAggregatesInput = {
    AND?: Enumerable<sessionScalarWhereWithAggregatesInput>
    OR?: Enumerable<sessionScalarWhereWithAggregatesInput>
    NOT?: Enumerable<sessionScalarWhereWithAggregatesInput>
    sessionId?: StringWithAggregatesFilter | string
    userId?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    lastUsedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type addressCreateInput = {
    addressId?: string
    name: string
    phoneNumber: string
    email: string
    streetAddress: string
    city: string
    state: string
    zip: string
    user: userCreateNestedOneWithoutAddressesInput
  }

  export type addressUncheckedCreateInput = {
    addressId?: string
    userId: number
    name: string
    phoneNumber: string
    email: string
    streetAddress: string
    city: string
    state: string
    zip: string
  }

  export type addressUpdateInput = {
    addressId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    streetAddress?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
    user?: userUpdateOneRequiredWithoutAddressesInput
  }

  export type addressUncheckedUpdateInput = {
    addressId?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    streetAddress?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
  }

  export type addressCreateManyInput = {
    addressId?: string
    userId: number
    name: string
    phoneNumber: string
    email: string
    streetAddress: string
    city: string
    state: string
    zip: string
  }

  export type addressUpdateManyMutationInput = {
    addressId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    streetAddress?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
  }

  export type addressUncheckedUpdateManyInput = {
    addressId?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    streetAddress?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
  }

  export type userCreateInput = {
    name: string
    email: string
    password: string
    phoneNumber?: string | null
    flags: bigint | number
    createdAt: Date | string
    addresses?: addressCreateNestedManyWithoutUserInput
    sessions?: sessionCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateInput = {
    userId?: number
    name: string
    email: string
    password: string
    phoneNumber?: string | null
    flags: bigint | number
    createdAt: Date | string
    addresses?: addressUncheckedCreateNestedManyWithoutUserInput
    sessions?: sessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type userUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    flags?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    addresses?: addressUpdateManyWithoutUserInput
    sessions?: sessionUpdateManyWithoutUserInput
  }

  export type userUncheckedUpdateInput = {
    userId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    flags?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    addresses?: addressUncheckedUpdateManyWithoutUserInput
    sessions?: sessionUncheckedUpdateManyWithoutUserInput
  }

  export type userCreateManyInput = {
    userId?: number
    name: string
    email: string
    password: string
    phoneNumber?: string | null
    flags: bigint | number
    createdAt: Date | string
  }

  export type userUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    flags?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type userUncheckedUpdateManyInput = {
    userId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    flags?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type sessionCreateInput = {
    sessionId?: string
    createdAt: Date | string
    lastUsedAt: Date | string
    user: userCreateNestedOneWithoutSessionsInput
  }

  export type sessionUncheckedCreateInput = {
    sessionId?: string
    userId: number
    createdAt: Date | string
    lastUsedAt: Date | string
  }

  export type sessionUpdateInput = {
    sessionId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: userUpdateOneRequiredWithoutSessionsInput
  }

  export type sessionUncheckedUpdateInput = {
    sessionId?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type sessionCreateManyInput = {
    sessionId?: string
    userId: number
    createdAt: Date | string
    lastUsedAt: Date | string
  }

  export type sessionUpdateManyMutationInput = {
    sessionId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type sessionUncheckedUpdateManyInput = {
    sessionId?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type UserRelationFilter = {
    is?: userWhereInput
    isNot?: userWhereInput
  }

  export type addressCountOrderByAggregateInput = {
    addressId?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    phoneNumber?: SortOrder
    email?: SortOrder
    streetAddress?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zip?: SortOrder
  }

  export type addressAvgOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type addressMaxOrderByAggregateInput = {
    addressId?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    phoneNumber?: SortOrder
    email?: SortOrder
    streetAddress?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zip?: SortOrder
  }

  export type addressMinOrderByAggregateInput = {
    addressId?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    phoneNumber?: SortOrder
    email?: SortOrder
    streetAddress?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zip?: SortOrder
  }

  export type addressSumOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type BigIntFilter = {
    equals?: bigint | number
    in?: Enumerable<bigint> | Enumerable<number>
    notIn?: Enumerable<bigint> | Enumerable<number>
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntFilter | bigint | number
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type AddressListRelationFilter = {
    every?: addressWhereInput
    some?: addressWhereInput
    none?: addressWhereInput
  }

  export type SessionListRelationFilter = {
    every?: sessionWhereInput
    some?: sessionWhereInput
    none?: sessionWhereInput
  }

  export type addressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type sessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type userCountOrderByAggregateInput = {
    userId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phoneNumber?: SortOrder
    flags?: SortOrder
    createdAt?: SortOrder
  }

  export type userAvgOrderByAggregateInput = {
    userId?: SortOrder
    flags?: SortOrder
  }

  export type userMaxOrderByAggregateInput = {
    userId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phoneNumber?: SortOrder
    flags?: SortOrder
    createdAt?: SortOrder
  }

  export type userMinOrderByAggregateInput = {
    userId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phoneNumber?: SortOrder
    flags?: SortOrder
    createdAt?: SortOrder
  }

  export type userSumOrderByAggregateInput = {
    userId?: SortOrder
    flags?: SortOrder
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type BigIntWithAggregatesFilter = {
    equals?: bigint | number
    in?: Enumerable<bigint> | Enumerable<number>
    notIn?: Enumerable<bigint> | Enumerable<number>
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntWithAggregatesFilter | bigint | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedBigIntFilter
    _min?: NestedBigIntFilter
    _max?: NestedBigIntFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type sessionCountOrderByAggregateInput = {
    sessionId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    lastUsedAt?: SortOrder
  }

  export type sessionAvgOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type sessionMaxOrderByAggregateInput = {
    sessionId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    lastUsedAt?: SortOrder
  }

  export type sessionMinOrderByAggregateInput = {
    sessionId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    lastUsedAt?: SortOrder
  }

  export type sessionSumOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type userCreateNestedOneWithoutAddressesInput = {
    create?: XOR<userCreateWithoutAddressesInput, userUncheckedCreateWithoutAddressesInput>
    connectOrCreate?: userCreateOrConnectWithoutAddressesInput
    connect?: userWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type userUpdateOneRequiredWithoutAddressesInput = {
    create?: XOR<userCreateWithoutAddressesInput, userUncheckedCreateWithoutAddressesInput>
    connectOrCreate?: userCreateOrConnectWithoutAddressesInput
    upsert?: userUpsertWithoutAddressesInput
    connect?: userWhereUniqueInput
    update?: XOR<userUpdateWithoutAddressesInput, userUncheckedUpdateWithoutAddressesInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type addressCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<addressCreateWithoutUserInput>, Enumerable<addressUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<addressCreateOrConnectWithoutUserInput>
    createMany?: addressCreateManyUserInputEnvelope
    connect?: Enumerable<addressWhereUniqueInput>
  }

  export type sessionCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<sessionCreateWithoutUserInput>, Enumerable<sessionUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<sessionCreateOrConnectWithoutUserInput>
    createMany?: sessionCreateManyUserInputEnvelope
    connect?: Enumerable<sessionWhereUniqueInput>
  }

  export type addressUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<addressCreateWithoutUserInput>, Enumerable<addressUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<addressCreateOrConnectWithoutUserInput>
    createMany?: addressCreateManyUserInputEnvelope
    connect?: Enumerable<addressWhereUniqueInput>
  }

  export type sessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<sessionCreateWithoutUserInput>, Enumerable<sessionUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<sessionCreateOrConnectWithoutUserInput>
    createMany?: sessionCreateManyUserInputEnvelope
    connect?: Enumerable<sessionWhereUniqueInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type addressUpdateManyWithoutUserInput = {
    create?: XOR<Enumerable<addressCreateWithoutUserInput>, Enumerable<addressUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<addressCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<addressUpsertWithWhereUniqueWithoutUserInput>
    createMany?: addressCreateManyUserInputEnvelope
    set?: Enumerable<addressWhereUniqueInput>
    disconnect?: Enumerable<addressWhereUniqueInput>
    delete?: Enumerable<addressWhereUniqueInput>
    connect?: Enumerable<addressWhereUniqueInput>
    update?: Enumerable<addressUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<addressUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<addressScalarWhereInput>
  }

  export type sessionUpdateManyWithoutUserInput = {
    create?: XOR<Enumerable<sessionCreateWithoutUserInput>, Enumerable<sessionUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<sessionCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<sessionUpsertWithWhereUniqueWithoutUserInput>
    createMany?: sessionCreateManyUserInputEnvelope
    set?: Enumerable<sessionWhereUniqueInput>
    disconnect?: Enumerable<sessionWhereUniqueInput>
    delete?: Enumerable<sessionWhereUniqueInput>
    connect?: Enumerable<sessionWhereUniqueInput>
    update?: Enumerable<sessionUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<sessionUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<sessionScalarWhereInput>
  }

  export type addressUncheckedUpdateManyWithoutUserInput = {
    create?: XOR<Enumerable<addressCreateWithoutUserInput>, Enumerable<addressUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<addressCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<addressUpsertWithWhereUniqueWithoutUserInput>
    createMany?: addressCreateManyUserInputEnvelope
    set?: Enumerable<addressWhereUniqueInput>
    disconnect?: Enumerable<addressWhereUniqueInput>
    delete?: Enumerable<addressWhereUniqueInput>
    connect?: Enumerable<addressWhereUniqueInput>
    update?: Enumerable<addressUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<addressUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<addressScalarWhereInput>
  }

  export type sessionUncheckedUpdateManyWithoutUserInput = {
    create?: XOR<Enumerable<sessionCreateWithoutUserInput>, Enumerable<sessionUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<sessionCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<sessionUpsertWithWhereUniqueWithoutUserInput>
    createMany?: sessionCreateManyUserInputEnvelope
    set?: Enumerable<sessionWhereUniqueInput>
    disconnect?: Enumerable<sessionWhereUniqueInput>
    delete?: Enumerable<sessionWhereUniqueInput>
    connect?: Enumerable<sessionWhereUniqueInput>
    update?: Enumerable<sessionUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<sessionUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<sessionScalarWhereInput>
  }

  export type userCreateNestedOneWithoutSessionsInput = {
    create?: XOR<userCreateWithoutSessionsInput, userUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: userCreateOrConnectWithoutSessionsInput
    connect?: userWhereUniqueInput
  }

  export type userUpdateOneRequiredWithoutSessionsInput = {
    create?: XOR<userCreateWithoutSessionsInput, userUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: userCreateOrConnectWithoutSessionsInput
    upsert?: userUpsertWithoutSessionsInput
    connect?: userWhereUniqueInput
    update?: XOR<userUpdateWithoutSessionsInput, userUncheckedUpdateWithoutSessionsInput>
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedBigIntFilter = {
    equals?: bigint | number
    in?: Enumerable<bigint> | Enumerable<number>
    notIn?: Enumerable<bigint> | Enumerable<number>
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntFilter | bigint | number
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedBigIntWithAggregatesFilter = {
    equals?: bigint | number
    in?: Enumerable<bigint> | Enumerable<number>
    notIn?: Enumerable<bigint> | Enumerable<number>
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntWithAggregatesFilter | bigint | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedBigIntFilter
    _min?: NestedBigIntFilter
    _max?: NestedBigIntFilter
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type userCreateWithoutAddressesInput = {
    name: string
    email: string
    password: string
    phoneNumber?: string | null
    flags: bigint | number
    createdAt: Date | string
    sessions?: sessionCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateWithoutAddressesInput = {
    userId?: number
    name: string
    email: string
    password: string
    phoneNumber?: string | null
    flags: bigint | number
    createdAt: Date | string
    sessions?: sessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type userCreateOrConnectWithoutAddressesInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutAddressesInput, userUncheckedCreateWithoutAddressesInput>
  }

  export type userUpsertWithoutAddressesInput = {
    update: XOR<userUpdateWithoutAddressesInput, userUncheckedUpdateWithoutAddressesInput>
    create: XOR<userCreateWithoutAddressesInput, userUncheckedCreateWithoutAddressesInput>
  }

  export type userUpdateWithoutAddressesInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    flags?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: sessionUpdateManyWithoutUserInput
  }

  export type userUncheckedUpdateWithoutAddressesInput = {
    userId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    flags?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: sessionUncheckedUpdateManyWithoutUserInput
  }

  export type addressCreateWithoutUserInput = {
    addressId?: string
    name: string
    phoneNumber: string
    email: string
    streetAddress: string
    city: string
    state: string
    zip: string
  }

  export type addressUncheckedCreateWithoutUserInput = {
    addressId?: string
    name: string
    phoneNumber: string
    email: string
    streetAddress: string
    city: string
    state: string
    zip: string
  }

  export type addressCreateOrConnectWithoutUserInput = {
    where: addressWhereUniqueInput
    create: XOR<addressCreateWithoutUserInput, addressUncheckedCreateWithoutUserInput>
  }

  export type addressCreateManyUserInputEnvelope = {
    data: Enumerable<addressCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type sessionCreateWithoutUserInput = {
    sessionId?: string
    createdAt: Date | string
    lastUsedAt: Date | string
  }

  export type sessionUncheckedCreateWithoutUserInput = {
    sessionId?: string
    createdAt: Date | string
    lastUsedAt: Date | string
  }

  export type sessionCreateOrConnectWithoutUserInput = {
    where: sessionWhereUniqueInput
    create: XOR<sessionCreateWithoutUserInput, sessionUncheckedCreateWithoutUserInput>
  }

  export type sessionCreateManyUserInputEnvelope = {
    data: Enumerable<sessionCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type addressUpsertWithWhereUniqueWithoutUserInput = {
    where: addressWhereUniqueInput
    update: XOR<addressUpdateWithoutUserInput, addressUncheckedUpdateWithoutUserInput>
    create: XOR<addressCreateWithoutUserInput, addressUncheckedCreateWithoutUserInput>
  }

  export type addressUpdateWithWhereUniqueWithoutUserInput = {
    where: addressWhereUniqueInput
    data: XOR<addressUpdateWithoutUserInput, addressUncheckedUpdateWithoutUserInput>
  }

  export type addressUpdateManyWithWhereWithoutUserInput = {
    where: addressScalarWhereInput
    data: XOR<addressUpdateManyMutationInput, addressUncheckedUpdateManyWithoutAddressesInput>
  }

  export type addressScalarWhereInput = {
    AND?: Enumerable<addressScalarWhereInput>
    OR?: Enumerable<addressScalarWhereInput>
    NOT?: Enumerable<addressScalarWhereInput>
    addressId?: StringFilter | string
    userId?: IntFilter | number
    name?: StringFilter | string
    phoneNumber?: StringFilter | string
    email?: StringFilter | string
    streetAddress?: StringFilter | string
    city?: StringFilter | string
    state?: StringFilter | string
    zip?: StringFilter | string
  }

  export type sessionUpsertWithWhereUniqueWithoutUserInput = {
    where: sessionWhereUniqueInput
    update: XOR<sessionUpdateWithoutUserInput, sessionUncheckedUpdateWithoutUserInput>
    create: XOR<sessionCreateWithoutUserInput, sessionUncheckedCreateWithoutUserInput>
  }

  export type sessionUpdateWithWhereUniqueWithoutUserInput = {
    where: sessionWhereUniqueInput
    data: XOR<sessionUpdateWithoutUserInput, sessionUncheckedUpdateWithoutUserInput>
  }

  export type sessionUpdateManyWithWhereWithoutUserInput = {
    where: sessionScalarWhereInput
    data: XOR<sessionUpdateManyMutationInput, sessionUncheckedUpdateManyWithoutSessionsInput>
  }

  export type sessionScalarWhereInput = {
    AND?: Enumerable<sessionScalarWhereInput>
    OR?: Enumerable<sessionScalarWhereInput>
    NOT?: Enumerable<sessionScalarWhereInput>
    sessionId?: StringFilter | string
    userId?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    lastUsedAt?: DateTimeFilter | Date | string
  }

  export type userCreateWithoutSessionsInput = {
    name: string
    email: string
    password: string
    phoneNumber?: string | null
    flags: bigint | number
    createdAt: Date | string
    addresses?: addressCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateWithoutSessionsInput = {
    userId?: number
    name: string
    email: string
    password: string
    phoneNumber?: string | null
    flags: bigint | number
    createdAt: Date | string
    addresses?: addressUncheckedCreateNestedManyWithoutUserInput
  }

  export type userCreateOrConnectWithoutSessionsInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutSessionsInput, userUncheckedCreateWithoutSessionsInput>
  }

  export type userUpsertWithoutSessionsInput = {
    update: XOR<userUpdateWithoutSessionsInput, userUncheckedUpdateWithoutSessionsInput>
    create: XOR<userCreateWithoutSessionsInput, userUncheckedCreateWithoutSessionsInput>
  }

  export type userUpdateWithoutSessionsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    flags?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    addresses?: addressUpdateManyWithoutUserInput
  }

  export type userUncheckedUpdateWithoutSessionsInput = {
    userId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    flags?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    addresses?: addressUncheckedUpdateManyWithoutUserInput
  }

  export type addressCreateManyUserInput = {
    addressId?: string
    name: string
    phoneNumber: string
    email: string
    streetAddress: string
    city: string
    state: string
    zip: string
  }

  export type sessionCreateManyUserInput = {
    sessionId?: string
    createdAt: Date | string
    lastUsedAt: Date | string
  }

  export type addressUpdateWithoutUserInput = {
    addressId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    streetAddress?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
  }

  export type addressUncheckedUpdateWithoutUserInput = {
    addressId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    streetAddress?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
  }

  export type addressUncheckedUpdateManyWithoutAddressesInput = {
    addressId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    streetAddress?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
  }

  export type sessionUpdateWithoutUserInput = {
    sessionId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type sessionUncheckedUpdateWithoutUserInput = {
    sessionId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type sessionUncheckedUpdateManyWithoutSessionsInput = {
    sessionId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.DMMF.Document;
}