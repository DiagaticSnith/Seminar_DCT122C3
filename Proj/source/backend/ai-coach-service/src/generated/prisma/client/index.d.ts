
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model UserProfile
 * 
 */
export type UserProfile = $Result.DefaultSelection<Prisma.$UserProfilePayload>
/**
 * Model DailyMealPlan
 * 
 */
export type DailyMealPlan = $Result.DefaultSelection<Prisma.$DailyMealPlanPayload>
/**
 * Model SystemPrompt
 * 
 */
export type SystemPrompt = $Result.DefaultSelection<Prisma.$SystemPromptPayload>
/**
 * Model AiActivityLog
 * 
 */
export type AiActivityLog = $Result.DefaultSelection<Prisma.$AiActivityLogPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more UserProfiles
 * const userProfiles = await prisma.userProfile.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more UserProfiles
   * const userProfiles = await prisma.userProfile.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


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
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.userProfile`: Exposes CRUD operations for the **UserProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserProfiles
    * const userProfiles = await prisma.userProfile.findMany()
    * ```
    */
  get userProfile(): Prisma.UserProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dailyMealPlan`: Exposes CRUD operations for the **DailyMealPlan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DailyMealPlans
    * const dailyMealPlans = await prisma.dailyMealPlan.findMany()
    * ```
    */
  get dailyMealPlan(): Prisma.DailyMealPlanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.systemPrompt`: Exposes CRUD operations for the **SystemPrompt** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SystemPrompts
    * const systemPrompts = await prisma.systemPrompt.findMany()
    * ```
    */
  get systemPrompt(): Prisma.SystemPromptDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aiActivityLog`: Exposes CRUD operations for the **AiActivityLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AiActivityLogs
    * const aiActivityLogs = await prisma.aiActivityLog.findMany()
    * ```
    */
  get aiActivityLog(): Prisma.AiActivityLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

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

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

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

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

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
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
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
  : T extends Uint8Array
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

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

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

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



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
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    UserProfile: 'UserProfile',
    DailyMealPlan: 'DailyMealPlan',
    SystemPrompt: 'SystemPrompt',
    AiActivityLog: 'AiActivityLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "userProfile" | "dailyMealPlan" | "systemPrompt" | "aiActivityLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      UserProfile: {
        payload: Prisma.$UserProfilePayload<ExtArgs>
        fields: Prisma.UserProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          findFirst: {
            args: Prisma.UserProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          findMany: {
            args: Prisma.UserProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>[]
          }
          create: {
            args: Prisma.UserProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          createMany: {
            args: Prisma.UserProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>[]
          }
          delete: {
            args: Prisma.UserProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          update: {
            args: Prisma.UserProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          deleteMany: {
            args: Prisma.UserProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>[]
          }
          upsert: {
            args: Prisma.UserProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          aggregate: {
            args: Prisma.UserProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserProfile>
          }
          groupBy: {
            args: Prisma.UserProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserProfileCountArgs<ExtArgs>
            result: $Utils.Optional<UserProfileCountAggregateOutputType> | number
          }
        }
      }
      DailyMealPlan: {
        payload: Prisma.$DailyMealPlanPayload<ExtArgs>
        fields: Prisma.DailyMealPlanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DailyMealPlanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyMealPlanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DailyMealPlanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyMealPlanPayload>
          }
          findFirst: {
            args: Prisma.DailyMealPlanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyMealPlanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DailyMealPlanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyMealPlanPayload>
          }
          findMany: {
            args: Prisma.DailyMealPlanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyMealPlanPayload>[]
          }
          create: {
            args: Prisma.DailyMealPlanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyMealPlanPayload>
          }
          createMany: {
            args: Prisma.DailyMealPlanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DailyMealPlanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyMealPlanPayload>[]
          }
          delete: {
            args: Prisma.DailyMealPlanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyMealPlanPayload>
          }
          update: {
            args: Prisma.DailyMealPlanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyMealPlanPayload>
          }
          deleteMany: {
            args: Prisma.DailyMealPlanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DailyMealPlanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DailyMealPlanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyMealPlanPayload>[]
          }
          upsert: {
            args: Prisma.DailyMealPlanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyMealPlanPayload>
          }
          aggregate: {
            args: Prisma.DailyMealPlanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDailyMealPlan>
          }
          groupBy: {
            args: Prisma.DailyMealPlanGroupByArgs<ExtArgs>
            result: $Utils.Optional<DailyMealPlanGroupByOutputType>[]
          }
          count: {
            args: Prisma.DailyMealPlanCountArgs<ExtArgs>
            result: $Utils.Optional<DailyMealPlanCountAggregateOutputType> | number
          }
        }
      }
      SystemPrompt: {
        payload: Prisma.$SystemPromptPayload<ExtArgs>
        fields: Prisma.SystemPromptFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SystemPromptFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemPromptPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SystemPromptFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemPromptPayload>
          }
          findFirst: {
            args: Prisma.SystemPromptFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemPromptPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SystemPromptFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemPromptPayload>
          }
          findMany: {
            args: Prisma.SystemPromptFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemPromptPayload>[]
          }
          create: {
            args: Prisma.SystemPromptCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemPromptPayload>
          }
          createMany: {
            args: Prisma.SystemPromptCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SystemPromptCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemPromptPayload>[]
          }
          delete: {
            args: Prisma.SystemPromptDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemPromptPayload>
          }
          update: {
            args: Prisma.SystemPromptUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemPromptPayload>
          }
          deleteMany: {
            args: Prisma.SystemPromptDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SystemPromptUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SystemPromptUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemPromptPayload>[]
          }
          upsert: {
            args: Prisma.SystemPromptUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemPromptPayload>
          }
          aggregate: {
            args: Prisma.SystemPromptAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSystemPrompt>
          }
          groupBy: {
            args: Prisma.SystemPromptGroupByArgs<ExtArgs>
            result: $Utils.Optional<SystemPromptGroupByOutputType>[]
          }
          count: {
            args: Prisma.SystemPromptCountArgs<ExtArgs>
            result: $Utils.Optional<SystemPromptCountAggregateOutputType> | number
          }
        }
      }
      AiActivityLog: {
        payload: Prisma.$AiActivityLogPayload<ExtArgs>
        fields: Prisma.AiActivityLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AiActivityLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiActivityLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AiActivityLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiActivityLogPayload>
          }
          findFirst: {
            args: Prisma.AiActivityLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiActivityLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AiActivityLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiActivityLogPayload>
          }
          findMany: {
            args: Prisma.AiActivityLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiActivityLogPayload>[]
          }
          create: {
            args: Prisma.AiActivityLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiActivityLogPayload>
          }
          createMany: {
            args: Prisma.AiActivityLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AiActivityLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiActivityLogPayload>[]
          }
          delete: {
            args: Prisma.AiActivityLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiActivityLogPayload>
          }
          update: {
            args: Prisma.AiActivityLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiActivityLogPayload>
          }
          deleteMany: {
            args: Prisma.AiActivityLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AiActivityLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AiActivityLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiActivityLogPayload>[]
          }
          upsert: {
            args: Prisma.AiActivityLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiActivityLogPayload>
          }
          aggregate: {
            args: Prisma.AiActivityLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAiActivityLog>
          }
          groupBy: {
            args: Prisma.AiActivityLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AiActivityLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AiActivityLogCountArgs<ExtArgs>
            result: $Utils.Optional<AiActivityLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    userProfile?: UserProfileOmit
    dailyMealPlan?: DailyMealPlanOmit
    systemPrompt?: SystemPromptOmit
    aiActivityLog?: AiActivityLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model UserProfile
   */

  export type AggregateUserProfile = {
    _count: UserProfileCountAggregateOutputType | null
    _avg: UserProfileAvgAggregateOutputType | null
    _sum: UserProfileSumAggregateOutputType | null
    _min: UserProfileMinAggregateOutputType | null
    _max: UserProfileMaxAggregateOutputType | null
  }

  export type UserProfileAvgAggregateOutputType = {
    height: number | null
    weight: number | null
    age: number | null
    targetCalories: number | null
    targetProtein: number | null
    targetCarbs: number | null
    targetFat: number | null
  }

  export type UserProfileSumAggregateOutputType = {
    height: number | null
    weight: number | null
    age: number | null
    targetCalories: number | null
    targetProtein: number | null
    targetCarbs: number | null
    targetFat: number | null
  }

  export type UserProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    height: number | null
    weight: number | null
    age: number | null
    gender: string | null
    activityLevel: string | null
    workoutStyle: string | null
    goal: string | null
    targetCalories: number | null
    targetProtein: number | null
    targetCarbs: number | null
    targetFat: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    height: number | null
    weight: number | null
    age: number | null
    gender: string | null
    activityLevel: string | null
    workoutStyle: string | null
    goal: string | null
    targetCalories: number | null
    targetProtein: number | null
    targetCarbs: number | null
    targetFat: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserProfileCountAggregateOutputType = {
    id: number
    userId: number
    height: number
    weight: number
    age: number
    gender: number
    activityLevel: number
    workoutStyle: number
    goal: number
    targetCalories: number
    targetProtein: number
    targetCarbs: number
    targetFat: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserProfileAvgAggregateInputType = {
    height?: true
    weight?: true
    age?: true
    targetCalories?: true
    targetProtein?: true
    targetCarbs?: true
    targetFat?: true
  }

  export type UserProfileSumAggregateInputType = {
    height?: true
    weight?: true
    age?: true
    targetCalories?: true
    targetProtein?: true
    targetCarbs?: true
    targetFat?: true
  }

  export type UserProfileMinAggregateInputType = {
    id?: true
    userId?: true
    height?: true
    weight?: true
    age?: true
    gender?: true
    activityLevel?: true
    workoutStyle?: true
    goal?: true
    targetCalories?: true
    targetProtein?: true
    targetCarbs?: true
    targetFat?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    height?: true
    weight?: true
    age?: true
    gender?: true
    activityLevel?: true
    workoutStyle?: true
    goal?: true
    targetCalories?: true
    targetProtein?: true
    targetCarbs?: true
    targetFat?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserProfileCountAggregateInputType = {
    id?: true
    userId?: true
    height?: true
    weight?: true
    age?: true
    gender?: true
    activityLevel?: true
    workoutStyle?: true
    goal?: true
    targetCalories?: true
    targetProtein?: true
    targetCarbs?: true
    targetFat?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserProfile to aggregate.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserProfiles
    **/
    _count?: true | UserProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserProfileMaxAggregateInputType
  }

  export type GetUserProfileAggregateType<T extends UserProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateUserProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserProfile[P]>
      : GetScalarType<T[P], AggregateUserProfile[P]>
  }




  export type UserProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserProfileWhereInput
    orderBy?: UserProfileOrderByWithAggregationInput | UserProfileOrderByWithAggregationInput[]
    by: UserProfileScalarFieldEnum[] | UserProfileScalarFieldEnum
    having?: UserProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserProfileCountAggregateInputType | true
    _avg?: UserProfileAvgAggregateInputType
    _sum?: UserProfileSumAggregateInputType
    _min?: UserProfileMinAggregateInputType
    _max?: UserProfileMaxAggregateInputType
  }

  export type UserProfileGroupByOutputType = {
    id: string
    userId: string
    height: number
    weight: number
    age: number
    gender: string
    activityLevel: string
    workoutStyle: string
    goal: string
    targetCalories: number | null
    targetProtein: number | null
    targetCarbs: number | null
    targetFat: number | null
    createdAt: Date
    updatedAt: Date
    _count: UserProfileCountAggregateOutputType | null
    _avg: UserProfileAvgAggregateOutputType | null
    _sum: UserProfileSumAggregateOutputType | null
    _min: UserProfileMinAggregateOutputType | null
    _max: UserProfileMaxAggregateOutputType | null
  }

  type GetUserProfileGroupByPayload<T extends UserProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserProfileGroupByOutputType[P]>
            : GetScalarType<T[P], UserProfileGroupByOutputType[P]>
        }
      >
    >


  export type UserProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    height?: boolean
    weight?: boolean
    age?: boolean
    gender?: boolean
    activityLevel?: boolean
    workoutStyle?: boolean
    goal?: boolean
    targetCalories?: boolean
    targetProtein?: boolean
    targetCarbs?: boolean
    targetFat?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["userProfile"]>

  export type UserProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    height?: boolean
    weight?: boolean
    age?: boolean
    gender?: boolean
    activityLevel?: boolean
    workoutStyle?: boolean
    goal?: boolean
    targetCalories?: boolean
    targetProtein?: boolean
    targetCarbs?: boolean
    targetFat?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["userProfile"]>

  export type UserProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    height?: boolean
    weight?: boolean
    age?: boolean
    gender?: boolean
    activityLevel?: boolean
    workoutStyle?: boolean
    goal?: boolean
    targetCalories?: boolean
    targetProtein?: boolean
    targetCarbs?: boolean
    targetFat?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["userProfile"]>

  export type UserProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    height?: boolean
    weight?: boolean
    age?: boolean
    gender?: boolean
    activityLevel?: boolean
    workoutStyle?: boolean
    goal?: boolean
    targetCalories?: boolean
    targetProtein?: boolean
    targetCarbs?: boolean
    targetFat?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "height" | "weight" | "age" | "gender" | "activityLevel" | "workoutStyle" | "goal" | "targetCalories" | "targetProtein" | "targetCarbs" | "targetFat" | "createdAt" | "updatedAt", ExtArgs["result"]["userProfile"]>

  export type $UserProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserProfile"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      height: number
      weight: number
      age: number
      gender: string
      activityLevel: string
      workoutStyle: string
      goal: string
      targetCalories: number | null
      targetProtein: number | null
      targetCarbs: number | null
      targetFat: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userProfile"]>
    composites: {}
  }

  type UserProfileGetPayload<S extends boolean | null | undefined | UserProfileDefaultArgs> = $Result.GetResult<Prisma.$UserProfilePayload, S>

  type UserProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserProfileCountAggregateInputType | true
    }

  export interface UserProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserProfile'], meta: { name: 'UserProfile' } }
    /**
     * Find zero or one UserProfile that matches the filter.
     * @param {UserProfileFindUniqueArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserProfileFindUniqueArgs>(args: SelectSubset<T, UserProfileFindUniqueArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserProfileFindUniqueOrThrowArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, UserProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileFindFirstArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserProfileFindFirstArgs>(args?: SelectSubset<T, UserProfileFindFirstArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileFindFirstOrThrowArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, UserProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserProfiles
     * const userProfiles = await prisma.userProfile.findMany()
     * 
     * // Get first 10 UserProfiles
     * const userProfiles = await prisma.userProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userProfileWithIdOnly = await prisma.userProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserProfileFindManyArgs>(args?: SelectSubset<T, UserProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserProfile.
     * @param {UserProfileCreateArgs} args - Arguments to create a UserProfile.
     * @example
     * // Create one UserProfile
     * const UserProfile = await prisma.userProfile.create({
     *   data: {
     *     // ... data to create a UserProfile
     *   }
     * })
     * 
     */
    create<T extends UserProfileCreateArgs>(args: SelectSubset<T, UserProfileCreateArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserProfiles.
     * @param {UserProfileCreateManyArgs} args - Arguments to create many UserProfiles.
     * @example
     * // Create many UserProfiles
     * const userProfile = await prisma.userProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserProfileCreateManyArgs>(args?: SelectSubset<T, UserProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserProfiles and returns the data saved in the database.
     * @param {UserProfileCreateManyAndReturnArgs} args - Arguments to create many UserProfiles.
     * @example
     * // Create many UserProfiles
     * const userProfile = await prisma.userProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserProfiles and only return the `id`
     * const userProfileWithIdOnly = await prisma.userProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, UserProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserProfile.
     * @param {UserProfileDeleteArgs} args - Arguments to delete one UserProfile.
     * @example
     * // Delete one UserProfile
     * const UserProfile = await prisma.userProfile.delete({
     *   where: {
     *     // ... filter to delete one UserProfile
     *   }
     * })
     * 
     */
    delete<T extends UserProfileDeleteArgs>(args: SelectSubset<T, UserProfileDeleteArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserProfile.
     * @param {UserProfileUpdateArgs} args - Arguments to update one UserProfile.
     * @example
     * // Update one UserProfile
     * const userProfile = await prisma.userProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserProfileUpdateArgs>(args: SelectSubset<T, UserProfileUpdateArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserProfiles.
     * @param {UserProfileDeleteManyArgs} args - Arguments to filter UserProfiles to delete.
     * @example
     * // Delete a few UserProfiles
     * const { count } = await prisma.userProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserProfileDeleteManyArgs>(args?: SelectSubset<T, UserProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserProfiles
     * const userProfile = await prisma.userProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserProfileUpdateManyArgs>(args: SelectSubset<T, UserProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserProfiles and returns the data updated in the database.
     * @param {UserProfileUpdateManyAndReturnArgs} args - Arguments to update many UserProfiles.
     * @example
     * // Update many UserProfiles
     * const userProfile = await prisma.userProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserProfiles and only return the `id`
     * const userProfileWithIdOnly = await prisma.userProfile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, UserProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserProfile.
     * @param {UserProfileUpsertArgs} args - Arguments to update or create a UserProfile.
     * @example
     * // Update or create a UserProfile
     * const userProfile = await prisma.userProfile.upsert({
     *   create: {
     *     // ... data to create a UserProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserProfile we want to update
     *   }
     * })
     */
    upsert<T extends UserProfileUpsertArgs>(args: SelectSubset<T, UserProfileUpsertArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileCountArgs} args - Arguments to filter UserProfiles to count.
     * @example
     * // Count the number of UserProfiles
     * const count = await prisma.userProfile.count({
     *   where: {
     *     // ... the filter for the UserProfiles we want to count
     *   }
     * })
    **/
    count<T extends UserProfileCountArgs>(
      args?: Subset<T, UserProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserProfileAggregateArgs>(args: Subset<T, UserProfileAggregateArgs>): Prisma.PrismaPromise<GetUserProfileAggregateType<T>>

    /**
     * Group by UserProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileGroupByArgs} args - Group by arguments.
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
      T extends UserProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserProfileGroupByArgs['orderBy'] }
        : { orderBy?: UserProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, UserProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserProfile model
   */
  readonly fields: UserProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserProfile model
   */
  interface UserProfileFieldRefs {
    readonly id: FieldRef<"UserProfile", 'String'>
    readonly userId: FieldRef<"UserProfile", 'String'>
    readonly height: FieldRef<"UserProfile", 'Float'>
    readonly weight: FieldRef<"UserProfile", 'Float'>
    readonly age: FieldRef<"UserProfile", 'Int'>
    readonly gender: FieldRef<"UserProfile", 'String'>
    readonly activityLevel: FieldRef<"UserProfile", 'String'>
    readonly workoutStyle: FieldRef<"UserProfile", 'String'>
    readonly goal: FieldRef<"UserProfile", 'String'>
    readonly targetCalories: FieldRef<"UserProfile", 'Int'>
    readonly targetProtein: FieldRef<"UserProfile", 'Int'>
    readonly targetCarbs: FieldRef<"UserProfile", 'Int'>
    readonly targetFat: FieldRef<"UserProfile", 'Int'>
    readonly createdAt: FieldRef<"UserProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"UserProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserProfile findUnique
   */
  export type UserProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile findUniqueOrThrow
   */
  export type UserProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile findFirst
   */
  export type UserProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserProfiles.
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserProfiles.
     */
    distinct?: UserProfileScalarFieldEnum | UserProfileScalarFieldEnum[]
  }

  /**
   * UserProfile findFirstOrThrow
   */
  export type UserProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserProfiles.
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserProfiles.
     */
    distinct?: UserProfileScalarFieldEnum | UserProfileScalarFieldEnum[]
  }

  /**
   * UserProfile findMany
   */
  export type UserProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Filter, which UserProfiles to fetch.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserProfiles.
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserProfiles.
     */
    distinct?: UserProfileScalarFieldEnum | UserProfileScalarFieldEnum[]
  }

  /**
   * UserProfile create
   */
  export type UserProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * The data needed to create a UserProfile.
     */
    data: XOR<UserProfileCreateInput, UserProfileUncheckedCreateInput>
  }

  /**
   * UserProfile createMany
   */
  export type UserProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserProfiles.
     */
    data: UserProfileCreateManyInput | UserProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserProfile createManyAndReturn
   */
  export type UserProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * The data used to create many UserProfiles.
     */
    data: UserProfileCreateManyInput | UserProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserProfile update
   */
  export type UserProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * The data needed to update a UserProfile.
     */
    data: XOR<UserProfileUpdateInput, UserProfileUncheckedUpdateInput>
    /**
     * Choose, which UserProfile to update.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile updateMany
   */
  export type UserProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserProfiles.
     */
    data: XOR<UserProfileUpdateManyMutationInput, UserProfileUncheckedUpdateManyInput>
    /**
     * Filter which UserProfiles to update
     */
    where?: UserProfileWhereInput
    /**
     * Limit how many UserProfiles to update.
     */
    limit?: number
  }

  /**
   * UserProfile updateManyAndReturn
   */
  export type UserProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * The data used to update UserProfiles.
     */
    data: XOR<UserProfileUpdateManyMutationInput, UserProfileUncheckedUpdateManyInput>
    /**
     * Filter which UserProfiles to update
     */
    where?: UserProfileWhereInput
    /**
     * Limit how many UserProfiles to update.
     */
    limit?: number
  }

  /**
   * UserProfile upsert
   */
  export type UserProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * The filter to search for the UserProfile to update in case it exists.
     */
    where: UserProfileWhereUniqueInput
    /**
     * In case the UserProfile found by the `where` argument doesn't exist, create a new UserProfile with this data.
     */
    create: XOR<UserProfileCreateInput, UserProfileUncheckedCreateInput>
    /**
     * In case the UserProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserProfileUpdateInput, UserProfileUncheckedUpdateInput>
  }

  /**
   * UserProfile delete
   */
  export type UserProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Filter which UserProfile to delete.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile deleteMany
   */
  export type UserProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserProfiles to delete
     */
    where?: UserProfileWhereInput
    /**
     * Limit how many UserProfiles to delete.
     */
    limit?: number
  }

  /**
   * UserProfile without action
   */
  export type UserProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
  }


  /**
   * Model DailyMealPlan
   */

  export type AggregateDailyMealPlan = {
    _count: DailyMealPlanCountAggregateOutputType | null
    _min: DailyMealPlanMinAggregateOutputType | null
    _max: DailyMealPlanMaxAggregateOutputType | null
  }

  export type DailyMealPlanMinAggregateOutputType = {
    id: string | null
    userId: string | null
    date: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DailyMealPlanMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    date: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DailyMealPlanCountAggregateOutputType = {
    id: number
    userId: number
    date: number
    plan: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DailyMealPlanMinAggregateInputType = {
    id?: true
    userId?: true
    date?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DailyMealPlanMaxAggregateInputType = {
    id?: true
    userId?: true
    date?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DailyMealPlanCountAggregateInputType = {
    id?: true
    userId?: true
    date?: true
    plan?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DailyMealPlanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyMealPlan to aggregate.
     */
    where?: DailyMealPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyMealPlans to fetch.
     */
    orderBy?: DailyMealPlanOrderByWithRelationInput | DailyMealPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DailyMealPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyMealPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyMealPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DailyMealPlans
    **/
    _count?: true | DailyMealPlanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DailyMealPlanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DailyMealPlanMaxAggregateInputType
  }

  export type GetDailyMealPlanAggregateType<T extends DailyMealPlanAggregateArgs> = {
        [P in keyof T & keyof AggregateDailyMealPlan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDailyMealPlan[P]>
      : GetScalarType<T[P], AggregateDailyMealPlan[P]>
  }




  export type DailyMealPlanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyMealPlanWhereInput
    orderBy?: DailyMealPlanOrderByWithAggregationInput | DailyMealPlanOrderByWithAggregationInput[]
    by: DailyMealPlanScalarFieldEnum[] | DailyMealPlanScalarFieldEnum
    having?: DailyMealPlanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DailyMealPlanCountAggregateInputType | true
    _min?: DailyMealPlanMinAggregateInputType
    _max?: DailyMealPlanMaxAggregateInputType
  }

  export type DailyMealPlanGroupByOutputType = {
    id: string
    userId: string
    date: Date
    plan: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: DailyMealPlanCountAggregateOutputType | null
    _min: DailyMealPlanMinAggregateOutputType | null
    _max: DailyMealPlanMaxAggregateOutputType | null
  }

  type GetDailyMealPlanGroupByPayload<T extends DailyMealPlanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DailyMealPlanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DailyMealPlanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DailyMealPlanGroupByOutputType[P]>
            : GetScalarType<T[P], DailyMealPlanGroupByOutputType[P]>
        }
      >
    >


  export type DailyMealPlanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    date?: boolean
    plan?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["dailyMealPlan"]>

  export type DailyMealPlanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    date?: boolean
    plan?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["dailyMealPlan"]>

  export type DailyMealPlanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    date?: boolean
    plan?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["dailyMealPlan"]>

  export type DailyMealPlanSelectScalar = {
    id?: boolean
    userId?: boolean
    date?: boolean
    plan?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DailyMealPlanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "date" | "plan" | "createdAt" | "updatedAt", ExtArgs["result"]["dailyMealPlan"]>

  export type $DailyMealPlanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DailyMealPlan"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      date: Date
      plan: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["dailyMealPlan"]>
    composites: {}
  }

  type DailyMealPlanGetPayload<S extends boolean | null | undefined | DailyMealPlanDefaultArgs> = $Result.GetResult<Prisma.$DailyMealPlanPayload, S>

  type DailyMealPlanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DailyMealPlanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DailyMealPlanCountAggregateInputType | true
    }

  export interface DailyMealPlanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DailyMealPlan'], meta: { name: 'DailyMealPlan' } }
    /**
     * Find zero or one DailyMealPlan that matches the filter.
     * @param {DailyMealPlanFindUniqueArgs} args - Arguments to find a DailyMealPlan
     * @example
     * // Get one DailyMealPlan
     * const dailyMealPlan = await prisma.dailyMealPlan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DailyMealPlanFindUniqueArgs>(args: SelectSubset<T, DailyMealPlanFindUniqueArgs<ExtArgs>>): Prisma__DailyMealPlanClient<$Result.GetResult<Prisma.$DailyMealPlanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DailyMealPlan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DailyMealPlanFindUniqueOrThrowArgs} args - Arguments to find a DailyMealPlan
     * @example
     * // Get one DailyMealPlan
     * const dailyMealPlan = await prisma.dailyMealPlan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DailyMealPlanFindUniqueOrThrowArgs>(args: SelectSubset<T, DailyMealPlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DailyMealPlanClient<$Result.GetResult<Prisma.$DailyMealPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DailyMealPlan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyMealPlanFindFirstArgs} args - Arguments to find a DailyMealPlan
     * @example
     * // Get one DailyMealPlan
     * const dailyMealPlan = await prisma.dailyMealPlan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DailyMealPlanFindFirstArgs>(args?: SelectSubset<T, DailyMealPlanFindFirstArgs<ExtArgs>>): Prisma__DailyMealPlanClient<$Result.GetResult<Prisma.$DailyMealPlanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DailyMealPlan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyMealPlanFindFirstOrThrowArgs} args - Arguments to find a DailyMealPlan
     * @example
     * // Get one DailyMealPlan
     * const dailyMealPlan = await prisma.dailyMealPlan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DailyMealPlanFindFirstOrThrowArgs>(args?: SelectSubset<T, DailyMealPlanFindFirstOrThrowArgs<ExtArgs>>): Prisma__DailyMealPlanClient<$Result.GetResult<Prisma.$DailyMealPlanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DailyMealPlans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyMealPlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DailyMealPlans
     * const dailyMealPlans = await prisma.dailyMealPlan.findMany()
     * 
     * // Get first 10 DailyMealPlans
     * const dailyMealPlans = await prisma.dailyMealPlan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dailyMealPlanWithIdOnly = await prisma.dailyMealPlan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DailyMealPlanFindManyArgs>(args?: SelectSubset<T, DailyMealPlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyMealPlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DailyMealPlan.
     * @param {DailyMealPlanCreateArgs} args - Arguments to create a DailyMealPlan.
     * @example
     * // Create one DailyMealPlan
     * const DailyMealPlan = await prisma.dailyMealPlan.create({
     *   data: {
     *     // ... data to create a DailyMealPlan
     *   }
     * })
     * 
     */
    create<T extends DailyMealPlanCreateArgs>(args: SelectSubset<T, DailyMealPlanCreateArgs<ExtArgs>>): Prisma__DailyMealPlanClient<$Result.GetResult<Prisma.$DailyMealPlanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DailyMealPlans.
     * @param {DailyMealPlanCreateManyArgs} args - Arguments to create many DailyMealPlans.
     * @example
     * // Create many DailyMealPlans
     * const dailyMealPlan = await prisma.dailyMealPlan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DailyMealPlanCreateManyArgs>(args?: SelectSubset<T, DailyMealPlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DailyMealPlans and returns the data saved in the database.
     * @param {DailyMealPlanCreateManyAndReturnArgs} args - Arguments to create many DailyMealPlans.
     * @example
     * // Create many DailyMealPlans
     * const dailyMealPlan = await prisma.dailyMealPlan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DailyMealPlans and only return the `id`
     * const dailyMealPlanWithIdOnly = await prisma.dailyMealPlan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DailyMealPlanCreateManyAndReturnArgs>(args?: SelectSubset<T, DailyMealPlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyMealPlanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DailyMealPlan.
     * @param {DailyMealPlanDeleteArgs} args - Arguments to delete one DailyMealPlan.
     * @example
     * // Delete one DailyMealPlan
     * const DailyMealPlan = await prisma.dailyMealPlan.delete({
     *   where: {
     *     // ... filter to delete one DailyMealPlan
     *   }
     * })
     * 
     */
    delete<T extends DailyMealPlanDeleteArgs>(args: SelectSubset<T, DailyMealPlanDeleteArgs<ExtArgs>>): Prisma__DailyMealPlanClient<$Result.GetResult<Prisma.$DailyMealPlanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DailyMealPlan.
     * @param {DailyMealPlanUpdateArgs} args - Arguments to update one DailyMealPlan.
     * @example
     * // Update one DailyMealPlan
     * const dailyMealPlan = await prisma.dailyMealPlan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DailyMealPlanUpdateArgs>(args: SelectSubset<T, DailyMealPlanUpdateArgs<ExtArgs>>): Prisma__DailyMealPlanClient<$Result.GetResult<Prisma.$DailyMealPlanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DailyMealPlans.
     * @param {DailyMealPlanDeleteManyArgs} args - Arguments to filter DailyMealPlans to delete.
     * @example
     * // Delete a few DailyMealPlans
     * const { count } = await prisma.dailyMealPlan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DailyMealPlanDeleteManyArgs>(args?: SelectSubset<T, DailyMealPlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DailyMealPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyMealPlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DailyMealPlans
     * const dailyMealPlan = await prisma.dailyMealPlan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DailyMealPlanUpdateManyArgs>(args: SelectSubset<T, DailyMealPlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DailyMealPlans and returns the data updated in the database.
     * @param {DailyMealPlanUpdateManyAndReturnArgs} args - Arguments to update many DailyMealPlans.
     * @example
     * // Update many DailyMealPlans
     * const dailyMealPlan = await prisma.dailyMealPlan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DailyMealPlans and only return the `id`
     * const dailyMealPlanWithIdOnly = await prisma.dailyMealPlan.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DailyMealPlanUpdateManyAndReturnArgs>(args: SelectSubset<T, DailyMealPlanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyMealPlanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DailyMealPlan.
     * @param {DailyMealPlanUpsertArgs} args - Arguments to update or create a DailyMealPlan.
     * @example
     * // Update or create a DailyMealPlan
     * const dailyMealPlan = await prisma.dailyMealPlan.upsert({
     *   create: {
     *     // ... data to create a DailyMealPlan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DailyMealPlan we want to update
     *   }
     * })
     */
    upsert<T extends DailyMealPlanUpsertArgs>(args: SelectSubset<T, DailyMealPlanUpsertArgs<ExtArgs>>): Prisma__DailyMealPlanClient<$Result.GetResult<Prisma.$DailyMealPlanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DailyMealPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyMealPlanCountArgs} args - Arguments to filter DailyMealPlans to count.
     * @example
     * // Count the number of DailyMealPlans
     * const count = await prisma.dailyMealPlan.count({
     *   where: {
     *     // ... the filter for the DailyMealPlans we want to count
     *   }
     * })
    **/
    count<T extends DailyMealPlanCountArgs>(
      args?: Subset<T, DailyMealPlanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DailyMealPlanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DailyMealPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyMealPlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DailyMealPlanAggregateArgs>(args: Subset<T, DailyMealPlanAggregateArgs>): Prisma.PrismaPromise<GetDailyMealPlanAggregateType<T>>

    /**
     * Group by DailyMealPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyMealPlanGroupByArgs} args - Group by arguments.
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
      T extends DailyMealPlanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DailyMealPlanGroupByArgs['orderBy'] }
        : { orderBy?: DailyMealPlanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, DailyMealPlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDailyMealPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DailyMealPlan model
   */
  readonly fields: DailyMealPlanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DailyMealPlan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DailyMealPlanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DailyMealPlan model
   */
  interface DailyMealPlanFieldRefs {
    readonly id: FieldRef<"DailyMealPlan", 'String'>
    readonly userId: FieldRef<"DailyMealPlan", 'String'>
    readonly date: FieldRef<"DailyMealPlan", 'DateTime'>
    readonly plan: FieldRef<"DailyMealPlan", 'Json'>
    readonly createdAt: FieldRef<"DailyMealPlan", 'DateTime'>
    readonly updatedAt: FieldRef<"DailyMealPlan", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DailyMealPlan findUnique
   */
  export type DailyMealPlanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyMealPlan
     */
    select?: DailyMealPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyMealPlan
     */
    omit?: DailyMealPlanOmit<ExtArgs> | null
    /**
     * Filter, which DailyMealPlan to fetch.
     */
    where: DailyMealPlanWhereUniqueInput
  }

  /**
   * DailyMealPlan findUniqueOrThrow
   */
  export type DailyMealPlanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyMealPlan
     */
    select?: DailyMealPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyMealPlan
     */
    omit?: DailyMealPlanOmit<ExtArgs> | null
    /**
     * Filter, which DailyMealPlan to fetch.
     */
    where: DailyMealPlanWhereUniqueInput
  }

  /**
   * DailyMealPlan findFirst
   */
  export type DailyMealPlanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyMealPlan
     */
    select?: DailyMealPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyMealPlan
     */
    omit?: DailyMealPlanOmit<ExtArgs> | null
    /**
     * Filter, which DailyMealPlan to fetch.
     */
    where?: DailyMealPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyMealPlans to fetch.
     */
    orderBy?: DailyMealPlanOrderByWithRelationInput | DailyMealPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyMealPlans.
     */
    cursor?: DailyMealPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyMealPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyMealPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyMealPlans.
     */
    distinct?: DailyMealPlanScalarFieldEnum | DailyMealPlanScalarFieldEnum[]
  }

  /**
   * DailyMealPlan findFirstOrThrow
   */
  export type DailyMealPlanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyMealPlan
     */
    select?: DailyMealPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyMealPlan
     */
    omit?: DailyMealPlanOmit<ExtArgs> | null
    /**
     * Filter, which DailyMealPlan to fetch.
     */
    where?: DailyMealPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyMealPlans to fetch.
     */
    orderBy?: DailyMealPlanOrderByWithRelationInput | DailyMealPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyMealPlans.
     */
    cursor?: DailyMealPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyMealPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyMealPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyMealPlans.
     */
    distinct?: DailyMealPlanScalarFieldEnum | DailyMealPlanScalarFieldEnum[]
  }

  /**
   * DailyMealPlan findMany
   */
  export type DailyMealPlanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyMealPlan
     */
    select?: DailyMealPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyMealPlan
     */
    omit?: DailyMealPlanOmit<ExtArgs> | null
    /**
     * Filter, which DailyMealPlans to fetch.
     */
    where?: DailyMealPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyMealPlans to fetch.
     */
    orderBy?: DailyMealPlanOrderByWithRelationInput | DailyMealPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DailyMealPlans.
     */
    cursor?: DailyMealPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyMealPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyMealPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyMealPlans.
     */
    distinct?: DailyMealPlanScalarFieldEnum | DailyMealPlanScalarFieldEnum[]
  }

  /**
   * DailyMealPlan create
   */
  export type DailyMealPlanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyMealPlan
     */
    select?: DailyMealPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyMealPlan
     */
    omit?: DailyMealPlanOmit<ExtArgs> | null
    /**
     * The data needed to create a DailyMealPlan.
     */
    data: XOR<DailyMealPlanCreateInput, DailyMealPlanUncheckedCreateInput>
  }

  /**
   * DailyMealPlan createMany
   */
  export type DailyMealPlanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DailyMealPlans.
     */
    data: DailyMealPlanCreateManyInput | DailyMealPlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DailyMealPlan createManyAndReturn
   */
  export type DailyMealPlanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyMealPlan
     */
    select?: DailyMealPlanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DailyMealPlan
     */
    omit?: DailyMealPlanOmit<ExtArgs> | null
    /**
     * The data used to create many DailyMealPlans.
     */
    data: DailyMealPlanCreateManyInput | DailyMealPlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DailyMealPlan update
   */
  export type DailyMealPlanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyMealPlan
     */
    select?: DailyMealPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyMealPlan
     */
    omit?: DailyMealPlanOmit<ExtArgs> | null
    /**
     * The data needed to update a DailyMealPlan.
     */
    data: XOR<DailyMealPlanUpdateInput, DailyMealPlanUncheckedUpdateInput>
    /**
     * Choose, which DailyMealPlan to update.
     */
    where: DailyMealPlanWhereUniqueInput
  }

  /**
   * DailyMealPlan updateMany
   */
  export type DailyMealPlanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DailyMealPlans.
     */
    data: XOR<DailyMealPlanUpdateManyMutationInput, DailyMealPlanUncheckedUpdateManyInput>
    /**
     * Filter which DailyMealPlans to update
     */
    where?: DailyMealPlanWhereInput
    /**
     * Limit how many DailyMealPlans to update.
     */
    limit?: number
  }

  /**
   * DailyMealPlan updateManyAndReturn
   */
  export type DailyMealPlanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyMealPlan
     */
    select?: DailyMealPlanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DailyMealPlan
     */
    omit?: DailyMealPlanOmit<ExtArgs> | null
    /**
     * The data used to update DailyMealPlans.
     */
    data: XOR<DailyMealPlanUpdateManyMutationInput, DailyMealPlanUncheckedUpdateManyInput>
    /**
     * Filter which DailyMealPlans to update
     */
    where?: DailyMealPlanWhereInput
    /**
     * Limit how many DailyMealPlans to update.
     */
    limit?: number
  }

  /**
   * DailyMealPlan upsert
   */
  export type DailyMealPlanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyMealPlan
     */
    select?: DailyMealPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyMealPlan
     */
    omit?: DailyMealPlanOmit<ExtArgs> | null
    /**
     * The filter to search for the DailyMealPlan to update in case it exists.
     */
    where: DailyMealPlanWhereUniqueInput
    /**
     * In case the DailyMealPlan found by the `where` argument doesn't exist, create a new DailyMealPlan with this data.
     */
    create: XOR<DailyMealPlanCreateInput, DailyMealPlanUncheckedCreateInput>
    /**
     * In case the DailyMealPlan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DailyMealPlanUpdateInput, DailyMealPlanUncheckedUpdateInput>
  }

  /**
   * DailyMealPlan delete
   */
  export type DailyMealPlanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyMealPlan
     */
    select?: DailyMealPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyMealPlan
     */
    omit?: DailyMealPlanOmit<ExtArgs> | null
    /**
     * Filter which DailyMealPlan to delete.
     */
    where: DailyMealPlanWhereUniqueInput
  }

  /**
   * DailyMealPlan deleteMany
   */
  export type DailyMealPlanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyMealPlans to delete
     */
    where?: DailyMealPlanWhereInput
    /**
     * Limit how many DailyMealPlans to delete.
     */
    limit?: number
  }

  /**
   * DailyMealPlan without action
   */
  export type DailyMealPlanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyMealPlan
     */
    select?: DailyMealPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyMealPlan
     */
    omit?: DailyMealPlanOmit<ExtArgs> | null
  }


  /**
   * Model SystemPrompt
   */

  export type AggregateSystemPrompt = {
    _count: SystemPromptCountAggregateOutputType | null
    _min: SystemPromptMinAggregateOutputType | null
    _max: SystemPromptMaxAggregateOutputType | null
  }

  export type SystemPromptMinAggregateOutputType = {
    id: string | null
    workoutStyle: string | null
    prompt: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SystemPromptMaxAggregateOutputType = {
    id: string | null
    workoutStyle: string | null
    prompt: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SystemPromptCountAggregateOutputType = {
    id: number
    workoutStyle: number
    prompt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SystemPromptMinAggregateInputType = {
    id?: true
    workoutStyle?: true
    prompt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SystemPromptMaxAggregateInputType = {
    id?: true
    workoutStyle?: true
    prompt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SystemPromptCountAggregateInputType = {
    id?: true
    workoutStyle?: true
    prompt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SystemPromptAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemPrompt to aggregate.
     */
    where?: SystemPromptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemPrompts to fetch.
     */
    orderBy?: SystemPromptOrderByWithRelationInput | SystemPromptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SystemPromptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemPrompts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemPrompts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SystemPrompts
    **/
    _count?: true | SystemPromptCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SystemPromptMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SystemPromptMaxAggregateInputType
  }

  export type GetSystemPromptAggregateType<T extends SystemPromptAggregateArgs> = {
        [P in keyof T & keyof AggregateSystemPrompt]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSystemPrompt[P]>
      : GetScalarType<T[P], AggregateSystemPrompt[P]>
  }




  export type SystemPromptGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SystemPromptWhereInput
    orderBy?: SystemPromptOrderByWithAggregationInput | SystemPromptOrderByWithAggregationInput[]
    by: SystemPromptScalarFieldEnum[] | SystemPromptScalarFieldEnum
    having?: SystemPromptScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SystemPromptCountAggregateInputType | true
    _min?: SystemPromptMinAggregateInputType
    _max?: SystemPromptMaxAggregateInputType
  }

  export type SystemPromptGroupByOutputType = {
    id: string
    workoutStyle: string
    prompt: string
    createdAt: Date
    updatedAt: Date
    _count: SystemPromptCountAggregateOutputType | null
    _min: SystemPromptMinAggregateOutputType | null
    _max: SystemPromptMaxAggregateOutputType | null
  }

  type GetSystemPromptGroupByPayload<T extends SystemPromptGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SystemPromptGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SystemPromptGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SystemPromptGroupByOutputType[P]>
            : GetScalarType<T[P], SystemPromptGroupByOutputType[P]>
        }
      >
    >


  export type SystemPromptSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workoutStyle?: boolean
    prompt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["systemPrompt"]>

  export type SystemPromptSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workoutStyle?: boolean
    prompt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["systemPrompt"]>

  export type SystemPromptSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workoutStyle?: boolean
    prompt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["systemPrompt"]>

  export type SystemPromptSelectScalar = {
    id?: boolean
    workoutStyle?: boolean
    prompt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SystemPromptOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "workoutStyle" | "prompt" | "createdAt" | "updatedAt", ExtArgs["result"]["systemPrompt"]>

  export type $SystemPromptPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SystemPrompt"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      workoutStyle: string
      prompt: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["systemPrompt"]>
    composites: {}
  }

  type SystemPromptGetPayload<S extends boolean | null | undefined | SystemPromptDefaultArgs> = $Result.GetResult<Prisma.$SystemPromptPayload, S>

  type SystemPromptCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SystemPromptFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SystemPromptCountAggregateInputType | true
    }

  export interface SystemPromptDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SystemPrompt'], meta: { name: 'SystemPrompt' } }
    /**
     * Find zero or one SystemPrompt that matches the filter.
     * @param {SystemPromptFindUniqueArgs} args - Arguments to find a SystemPrompt
     * @example
     * // Get one SystemPrompt
     * const systemPrompt = await prisma.systemPrompt.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SystemPromptFindUniqueArgs>(args: SelectSubset<T, SystemPromptFindUniqueArgs<ExtArgs>>): Prisma__SystemPromptClient<$Result.GetResult<Prisma.$SystemPromptPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SystemPrompt that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SystemPromptFindUniqueOrThrowArgs} args - Arguments to find a SystemPrompt
     * @example
     * // Get one SystemPrompt
     * const systemPrompt = await prisma.systemPrompt.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SystemPromptFindUniqueOrThrowArgs>(args: SelectSubset<T, SystemPromptFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SystemPromptClient<$Result.GetResult<Prisma.$SystemPromptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SystemPrompt that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemPromptFindFirstArgs} args - Arguments to find a SystemPrompt
     * @example
     * // Get one SystemPrompt
     * const systemPrompt = await prisma.systemPrompt.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SystemPromptFindFirstArgs>(args?: SelectSubset<T, SystemPromptFindFirstArgs<ExtArgs>>): Prisma__SystemPromptClient<$Result.GetResult<Prisma.$SystemPromptPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SystemPrompt that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemPromptFindFirstOrThrowArgs} args - Arguments to find a SystemPrompt
     * @example
     * // Get one SystemPrompt
     * const systemPrompt = await prisma.systemPrompt.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SystemPromptFindFirstOrThrowArgs>(args?: SelectSubset<T, SystemPromptFindFirstOrThrowArgs<ExtArgs>>): Prisma__SystemPromptClient<$Result.GetResult<Prisma.$SystemPromptPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SystemPrompts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemPromptFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SystemPrompts
     * const systemPrompts = await prisma.systemPrompt.findMany()
     * 
     * // Get first 10 SystemPrompts
     * const systemPrompts = await prisma.systemPrompt.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const systemPromptWithIdOnly = await prisma.systemPrompt.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SystemPromptFindManyArgs>(args?: SelectSubset<T, SystemPromptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemPromptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SystemPrompt.
     * @param {SystemPromptCreateArgs} args - Arguments to create a SystemPrompt.
     * @example
     * // Create one SystemPrompt
     * const SystemPrompt = await prisma.systemPrompt.create({
     *   data: {
     *     // ... data to create a SystemPrompt
     *   }
     * })
     * 
     */
    create<T extends SystemPromptCreateArgs>(args: SelectSubset<T, SystemPromptCreateArgs<ExtArgs>>): Prisma__SystemPromptClient<$Result.GetResult<Prisma.$SystemPromptPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SystemPrompts.
     * @param {SystemPromptCreateManyArgs} args - Arguments to create many SystemPrompts.
     * @example
     * // Create many SystemPrompts
     * const systemPrompt = await prisma.systemPrompt.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SystemPromptCreateManyArgs>(args?: SelectSubset<T, SystemPromptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SystemPrompts and returns the data saved in the database.
     * @param {SystemPromptCreateManyAndReturnArgs} args - Arguments to create many SystemPrompts.
     * @example
     * // Create many SystemPrompts
     * const systemPrompt = await prisma.systemPrompt.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SystemPrompts and only return the `id`
     * const systemPromptWithIdOnly = await prisma.systemPrompt.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SystemPromptCreateManyAndReturnArgs>(args?: SelectSubset<T, SystemPromptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemPromptPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SystemPrompt.
     * @param {SystemPromptDeleteArgs} args - Arguments to delete one SystemPrompt.
     * @example
     * // Delete one SystemPrompt
     * const SystemPrompt = await prisma.systemPrompt.delete({
     *   where: {
     *     // ... filter to delete one SystemPrompt
     *   }
     * })
     * 
     */
    delete<T extends SystemPromptDeleteArgs>(args: SelectSubset<T, SystemPromptDeleteArgs<ExtArgs>>): Prisma__SystemPromptClient<$Result.GetResult<Prisma.$SystemPromptPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SystemPrompt.
     * @param {SystemPromptUpdateArgs} args - Arguments to update one SystemPrompt.
     * @example
     * // Update one SystemPrompt
     * const systemPrompt = await prisma.systemPrompt.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SystemPromptUpdateArgs>(args: SelectSubset<T, SystemPromptUpdateArgs<ExtArgs>>): Prisma__SystemPromptClient<$Result.GetResult<Prisma.$SystemPromptPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SystemPrompts.
     * @param {SystemPromptDeleteManyArgs} args - Arguments to filter SystemPrompts to delete.
     * @example
     * // Delete a few SystemPrompts
     * const { count } = await prisma.systemPrompt.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SystemPromptDeleteManyArgs>(args?: SelectSubset<T, SystemPromptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SystemPrompts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemPromptUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SystemPrompts
     * const systemPrompt = await prisma.systemPrompt.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SystemPromptUpdateManyArgs>(args: SelectSubset<T, SystemPromptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SystemPrompts and returns the data updated in the database.
     * @param {SystemPromptUpdateManyAndReturnArgs} args - Arguments to update many SystemPrompts.
     * @example
     * // Update many SystemPrompts
     * const systemPrompt = await prisma.systemPrompt.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SystemPrompts and only return the `id`
     * const systemPromptWithIdOnly = await prisma.systemPrompt.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SystemPromptUpdateManyAndReturnArgs>(args: SelectSubset<T, SystemPromptUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemPromptPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SystemPrompt.
     * @param {SystemPromptUpsertArgs} args - Arguments to update or create a SystemPrompt.
     * @example
     * // Update or create a SystemPrompt
     * const systemPrompt = await prisma.systemPrompt.upsert({
     *   create: {
     *     // ... data to create a SystemPrompt
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SystemPrompt we want to update
     *   }
     * })
     */
    upsert<T extends SystemPromptUpsertArgs>(args: SelectSubset<T, SystemPromptUpsertArgs<ExtArgs>>): Prisma__SystemPromptClient<$Result.GetResult<Prisma.$SystemPromptPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SystemPrompts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemPromptCountArgs} args - Arguments to filter SystemPrompts to count.
     * @example
     * // Count the number of SystemPrompts
     * const count = await prisma.systemPrompt.count({
     *   where: {
     *     // ... the filter for the SystemPrompts we want to count
     *   }
     * })
    **/
    count<T extends SystemPromptCountArgs>(
      args?: Subset<T, SystemPromptCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SystemPromptCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SystemPrompt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemPromptAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SystemPromptAggregateArgs>(args: Subset<T, SystemPromptAggregateArgs>): Prisma.PrismaPromise<GetSystemPromptAggregateType<T>>

    /**
     * Group by SystemPrompt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemPromptGroupByArgs} args - Group by arguments.
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
      T extends SystemPromptGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SystemPromptGroupByArgs['orderBy'] }
        : { orderBy?: SystemPromptGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, SystemPromptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSystemPromptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SystemPrompt model
   */
  readonly fields: SystemPromptFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SystemPrompt.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SystemPromptClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SystemPrompt model
   */
  interface SystemPromptFieldRefs {
    readonly id: FieldRef<"SystemPrompt", 'String'>
    readonly workoutStyle: FieldRef<"SystemPrompt", 'String'>
    readonly prompt: FieldRef<"SystemPrompt", 'String'>
    readonly createdAt: FieldRef<"SystemPrompt", 'DateTime'>
    readonly updatedAt: FieldRef<"SystemPrompt", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SystemPrompt findUnique
   */
  export type SystemPromptFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemPrompt
     */
    select?: SystemPromptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemPrompt
     */
    omit?: SystemPromptOmit<ExtArgs> | null
    /**
     * Filter, which SystemPrompt to fetch.
     */
    where: SystemPromptWhereUniqueInput
  }

  /**
   * SystemPrompt findUniqueOrThrow
   */
  export type SystemPromptFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemPrompt
     */
    select?: SystemPromptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemPrompt
     */
    omit?: SystemPromptOmit<ExtArgs> | null
    /**
     * Filter, which SystemPrompt to fetch.
     */
    where: SystemPromptWhereUniqueInput
  }

  /**
   * SystemPrompt findFirst
   */
  export type SystemPromptFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemPrompt
     */
    select?: SystemPromptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemPrompt
     */
    omit?: SystemPromptOmit<ExtArgs> | null
    /**
     * Filter, which SystemPrompt to fetch.
     */
    where?: SystemPromptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemPrompts to fetch.
     */
    orderBy?: SystemPromptOrderByWithRelationInput | SystemPromptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemPrompts.
     */
    cursor?: SystemPromptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemPrompts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemPrompts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemPrompts.
     */
    distinct?: SystemPromptScalarFieldEnum | SystemPromptScalarFieldEnum[]
  }

  /**
   * SystemPrompt findFirstOrThrow
   */
  export type SystemPromptFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemPrompt
     */
    select?: SystemPromptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemPrompt
     */
    omit?: SystemPromptOmit<ExtArgs> | null
    /**
     * Filter, which SystemPrompt to fetch.
     */
    where?: SystemPromptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemPrompts to fetch.
     */
    orderBy?: SystemPromptOrderByWithRelationInput | SystemPromptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemPrompts.
     */
    cursor?: SystemPromptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemPrompts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemPrompts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemPrompts.
     */
    distinct?: SystemPromptScalarFieldEnum | SystemPromptScalarFieldEnum[]
  }

  /**
   * SystemPrompt findMany
   */
  export type SystemPromptFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemPrompt
     */
    select?: SystemPromptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemPrompt
     */
    omit?: SystemPromptOmit<ExtArgs> | null
    /**
     * Filter, which SystemPrompts to fetch.
     */
    where?: SystemPromptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemPrompts to fetch.
     */
    orderBy?: SystemPromptOrderByWithRelationInput | SystemPromptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SystemPrompts.
     */
    cursor?: SystemPromptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemPrompts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemPrompts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemPrompts.
     */
    distinct?: SystemPromptScalarFieldEnum | SystemPromptScalarFieldEnum[]
  }

  /**
   * SystemPrompt create
   */
  export type SystemPromptCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemPrompt
     */
    select?: SystemPromptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemPrompt
     */
    omit?: SystemPromptOmit<ExtArgs> | null
    /**
     * The data needed to create a SystemPrompt.
     */
    data: XOR<SystemPromptCreateInput, SystemPromptUncheckedCreateInput>
  }

  /**
   * SystemPrompt createMany
   */
  export type SystemPromptCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SystemPrompts.
     */
    data: SystemPromptCreateManyInput | SystemPromptCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemPrompt createManyAndReturn
   */
  export type SystemPromptCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemPrompt
     */
    select?: SystemPromptSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SystemPrompt
     */
    omit?: SystemPromptOmit<ExtArgs> | null
    /**
     * The data used to create many SystemPrompts.
     */
    data: SystemPromptCreateManyInput | SystemPromptCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemPrompt update
   */
  export type SystemPromptUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemPrompt
     */
    select?: SystemPromptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemPrompt
     */
    omit?: SystemPromptOmit<ExtArgs> | null
    /**
     * The data needed to update a SystemPrompt.
     */
    data: XOR<SystemPromptUpdateInput, SystemPromptUncheckedUpdateInput>
    /**
     * Choose, which SystemPrompt to update.
     */
    where: SystemPromptWhereUniqueInput
  }

  /**
   * SystemPrompt updateMany
   */
  export type SystemPromptUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SystemPrompts.
     */
    data: XOR<SystemPromptUpdateManyMutationInput, SystemPromptUncheckedUpdateManyInput>
    /**
     * Filter which SystemPrompts to update
     */
    where?: SystemPromptWhereInput
    /**
     * Limit how many SystemPrompts to update.
     */
    limit?: number
  }

  /**
   * SystemPrompt updateManyAndReturn
   */
  export type SystemPromptUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemPrompt
     */
    select?: SystemPromptSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SystemPrompt
     */
    omit?: SystemPromptOmit<ExtArgs> | null
    /**
     * The data used to update SystemPrompts.
     */
    data: XOR<SystemPromptUpdateManyMutationInput, SystemPromptUncheckedUpdateManyInput>
    /**
     * Filter which SystemPrompts to update
     */
    where?: SystemPromptWhereInput
    /**
     * Limit how many SystemPrompts to update.
     */
    limit?: number
  }

  /**
   * SystemPrompt upsert
   */
  export type SystemPromptUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemPrompt
     */
    select?: SystemPromptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemPrompt
     */
    omit?: SystemPromptOmit<ExtArgs> | null
    /**
     * The filter to search for the SystemPrompt to update in case it exists.
     */
    where: SystemPromptWhereUniqueInput
    /**
     * In case the SystemPrompt found by the `where` argument doesn't exist, create a new SystemPrompt with this data.
     */
    create: XOR<SystemPromptCreateInput, SystemPromptUncheckedCreateInput>
    /**
     * In case the SystemPrompt was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SystemPromptUpdateInput, SystemPromptUncheckedUpdateInput>
  }

  /**
   * SystemPrompt delete
   */
  export type SystemPromptDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemPrompt
     */
    select?: SystemPromptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemPrompt
     */
    omit?: SystemPromptOmit<ExtArgs> | null
    /**
     * Filter which SystemPrompt to delete.
     */
    where: SystemPromptWhereUniqueInput
  }

  /**
   * SystemPrompt deleteMany
   */
  export type SystemPromptDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemPrompts to delete
     */
    where?: SystemPromptWhereInput
    /**
     * Limit how many SystemPrompts to delete.
     */
    limit?: number
  }

  /**
   * SystemPrompt without action
   */
  export type SystemPromptDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemPrompt
     */
    select?: SystemPromptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemPrompt
     */
    omit?: SystemPromptOmit<ExtArgs> | null
  }


  /**
   * Model AiActivityLog
   */

  export type AggregateAiActivityLog = {
    _count: AiActivityLogCountAggregateOutputType | null
    _avg: AiActivityLogAvgAggregateOutputType | null
    _sum: AiActivityLogSumAggregateOutputType | null
    _min: AiActivityLogMinAggregateOutputType | null
    _max: AiActivityLogMaxAggregateOutputType | null
  }

  export type AiActivityLogAvgAggregateOutputType = {
    promptTokens: number | null
    completionTokens: number | null
    totalTokens: number | null
    cost: number | null
  }

  export type AiActivityLogSumAggregateOutputType = {
    promptTokens: number | null
    completionTokens: number | null
    totalTokens: number | null
    cost: number | null
  }

  export type AiActivityLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    promptTokens: number | null
    completionTokens: number | null
    totalTokens: number | null
    cost: number | null
    intent: string | null
    createdAt: Date | null
  }

  export type AiActivityLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    promptTokens: number | null
    completionTokens: number | null
    totalTokens: number | null
    cost: number | null
    intent: string | null
    createdAt: Date | null
  }

  export type AiActivityLogCountAggregateOutputType = {
    id: number
    userId: number
    promptTokens: number
    completionTokens: number
    totalTokens: number
    cost: number
    intent: number
    createdAt: number
    _all: number
  }


  export type AiActivityLogAvgAggregateInputType = {
    promptTokens?: true
    completionTokens?: true
    totalTokens?: true
    cost?: true
  }

  export type AiActivityLogSumAggregateInputType = {
    promptTokens?: true
    completionTokens?: true
    totalTokens?: true
    cost?: true
  }

  export type AiActivityLogMinAggregateInputType = {
    id?: true
    userId?: true
    promptTokens?: true
    completionTokens?: true
    totalTokens?: true
    cost?: true
    intent?: true
    createdAt?: true
  }

  export type AiActivityLogMaxAggregateInputType = {
    id?: true
    userId?: true
    promptTokens?: true
    completionTokens?: true
    totalTokens?: true
    cost?: true
    intent?: true
    createdAt?: true
  }

  export type AiActivityLogCountAggregateInputType = {
    id?: true
    userId?: true
    promptTokens?: true
    completionTokens?: true
    totalTokens?: true
    cost?: true
    intent?: true
    createdAt?: true
    _all?: true
  }

  export type AiActivityLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiActivityLog to aggregate.
     */
    where?: AiActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiActivityLogs to fetch.
     */
    orderBy?: AiActivityLogOrderByWithRelationInput | AiActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AiActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AiActivityLogs
    **/
    _count?: true | AiActivityLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AiActivityLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AiActivityLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AiActivityLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AiActivityLogMaxAggregateInputType
  }

  export type GetAiActivityLogAggregateType<T extends AiActivityLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAiActivityLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAiActivityLog[P]>
      : GetScalarType<T[P], AggregateAiActivityLog[P]>
  }




  export type AiActivityLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AiActivityLogWhereInput
    orderBy?: AiActivityLogOrderByWithAggregationInput | AiActivityLogOrderByWithAggregationInput[]
    by: AiActivityLogScalarFieldEnum[] | AiActivityLogScalarFieldEnum
    having?: AiActivityLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AiActivityLogCountAggregateInputType | true
    _avg?: AiActivityLogAvgAggregateInputType
    _sum?: AiActivityLogSumAggregateInputType
    _min?: AiActivityLogMinAggregateInputType
    _max?: AiActivityLogMaxAggregateInputType
  }

  export type AiActivityLogGroupByOutputType = {
    id: string
    userId: string
    promptTokens: number
    completionTokens: number
    totalTokens: number
    cost: number
    intent: string
    createdAt: Date
    _count: AiActivityLogCountAggregateOutputType | null
    _avg: AiActivityLogAvgAggregateOutputType | null
    _sum: AiActivityLogSumAggregateOutputType | null
    _min: AiActivityLogMinAggregateOutputType | null
    _max: AiActivityLogMaxAggregateOutputType | null
  }

  type GetAiActivityLogGroupByPayload<T extends AiActivityLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AiActivityLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AiActivityLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AiActivityLogGroupByOutputType[P]>
            : GetScalarType<T[P], AiActivityLogGroupByOutputType[P]>
        }
      >
    >


  export type AiActivityLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    promptTokens?: boolean
    completionTokens?: boolean
    totalTokens?: boolean
    cost?: boolean
    intent?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["aiActivityLog"]>

  export type AiActivityLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    promptTokens?: boolean
    completionTokens?: boolean
    totalTokens?: boolean
    cost?: boolean
    intent?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["aiActivityLog"]>

  export type AiActivityLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    promptTokens?: boolean
    completionTokens?: boolean
    totalTokens?: boolean
    cost?: boolean
    intent?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["aiActivityLog"]>

  export type AiActivityLogSelectScalar = {
    id?: boolean
    userId?: boolean
    promptTokens?: boolean
    completionTokens?: boolean
    totalTokens?: boolean
    cost?: boolean
    intent?: boolean
    createdAt?: boolean
  }

  export type AiActivityLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "promptTokens" | "completionTokens" | "totalTokens" | "cost" | "intent" | "createdAt", ExtArgs["result"]["aiActivityLog"]>

  export type $AiActivityLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AiActivityLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      promptTokens: number
      completionTokens: number
      totalTokens: number
      cost: number
      intent: string
      createdAt: Date
    }, ExtArgs["result"]["aiActivityLog"]>
    composites: {}
  }

  type AiActivityLogGetPayload<S extends boolean | null | undefined | AiActivityLogDefaultArgs> = $Result.GetResult<Prisma.$AiActivityLogPayload, S>

  type AiActivityLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AiActivityLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AiActivityLogCountAggregateInputType | true
    }

  export interface AiActivityLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AiActivityLog'], meta: { name: 'AiActivityLog' } }
    /**
     * Find zero or one AiActivityLog that matches the filter.
     * @param {AiActivityLogFindUniqueArgs} args - Arguments to find a AiActivityLog
     * @example
     * // Get one AiActivityLog
     * const aiActivityLog = await prisma.aiActivityLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AiActivityLogFindUniqueArgs>(args: SelectSubset<T, AiActivityLogFindUniqueArgs<ExtArgs>>): Prisma__AiActivityLogClient<$Result.GetResult<Prisma.$AiActivityLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AiActivityLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AiActivityLogFindUniqueOrThrowArgs} args - Arguments to find a AiActivityLog
     * @example
     * // Get one AiActivityLog
     * const aiActivityLog = await prisma.aiActivityLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AiActivityLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AiActivityLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AiActivityLogClient<$Result.GetResult<Prisma.$AiActivityLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AiActivityLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiActivityLogFindFirstArgs} args - Arguments to find a AiActivityLog
     * @example
     * // Get one AiActivityLog
     * const aiActivityLog = await prisma.aiActivityLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AiActivityLogFindFirstArgs>(args?: SelectSubset<T, AiActivityLogFindFirstArgs<ExtArgs>>): Prisma__AiActivityLogClient<$Result.GetResult<Prisma.$AiActivityLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AiActivityLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiActivityLogFindFirstOrThrowArgs} args - Arguments to find a AiActivityLog
     * @example
     * // Get one AiActivityLog
     * const aiActivityLog = await prisma.aiActivityLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AiActivityLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AiActivityLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AiActivityLogClient<$Result.GetResult<Prisma.$AiActivityLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AiActivityLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiActivityLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AiActivityLogs
     * const aiActivityLogs = await prisma.aiActivityLog.findMany()
     * 
     * // Get first 10 AiActivityLogs
     * const aiActivityLogs = await prisma.aiActivityLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aiActivityLogWithIdOnly = await prisma.aiActivityLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AiActivityLogFindManyArgs>(args?: SelectSubset<T, AiActivityLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiActivityLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AiActivityLog.
     * @param {AiActivityLogCreateArgs} args - Arguments to create a AiActivityLog.
     * @example
     * // Create one AiActivityLog
     * const AiActivityLog = await prisma.aiActivityLog.create({
     *   data: {
     *     // ... data to create a AiActivityLog
     *   }
     * })
     * 
     */
    create<T extends AiActivityLogCreateArgs>(args: SelectSubset<T, AiActivityLogCreateArgs<ExtArgs>>): Prisma__AiActivityLogClient<$Result.GetResult<Prisma.$AiActivityLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AiActivityLogs.
     * @param {AiActivityLogCreateManyArgs} args - Arguments to create many AiActivityLogs.
     * @example
     * // Create many AiActivityLogs
     * const aiActivityLog = await prisma.aiActivityLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AiActivityLogCreateManyArgs>(args?: SelectSubset<T, AiActivityLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AiActivityLogs and returns the data saved in the database.
     * @param {AiActivityLogCreateManyAndReturnArgs} args - Arguments to create many AiActivityLogs.
     * @example
     * // Create many AiActivityLogs
     * const aiActivityLog = await prisma.aiActivityLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AiActivityLogs and only return the `id`
     * const aiActivityLogWithIdOnly = await prisma.aiActivityLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AiActivityLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AiActivityLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiActivityLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AiActivityLog.
     * @param {AiActivityLogDeleteArgs} args - Arguments to delete one AiActivityLog.
     * @example
     * // Delete one AiActivityLog
     * const AiActivityLog = await prisma.aiActivityLog.delete({
     *   where: {
     *     // ... filter to delete one AiActivityLog
     *   }
     * })
     * 
     */
    delete<T extends AiActivityLogDeleteArgs>(args: SelectSubset<T, AiActivityLogDeleteArgs<ExtArgs>>): Prisma__AiActivityLogClient<$Result.GetResult<Prisma.$AiActivityLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AiActivityLog.
     * @param {AiActivityLogUpdateArgs} args - Arguments to update one AiActivityLog.
     * @example
     * // Update one AiActivityLog
     * const aiActivityLog = await prisma.aiActivityLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AiActivityLogUpdateArgs>(args: SelectSubset<T, AiActivityLogUpdateArgs<ExtArgs>>): Prisma__AiActivityLogClient<$Result.GetResult<Prisma.$AiActivityLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AiActivityLogs.
     * @param {AiActivityLogDeleteManyArgs} args - Arguments to filter AiActivityLogs to delete.
     * @example
     * // Delete a few AiActivityLogs
     * const { count } = await prisma.aiActivityLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AiActivityLogDeleteManyArgs>(args?: SelectSubset<T, AiActivityLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AiActivityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiActivityLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AiActivityLogs
     * const aiActivityLog = await prisma.aiActivityLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AiActivityLogUpdateManyArgs>(args: SelectSubset<T, AiActivityLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AiActivityLogs and returns the data updated in the database.
     * @param {AiActivityLogUpdateManyAndReturnArgs} args - Arguments to update many AiActivityLogs.
     * @example
     * // Update many AiActivityLogs
     * const aiActivityLog = await prisma.aiActivityLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AiActivityLogs and only return the `id`
     * const aiActivityLogWithIdOnly = await prisma.aiActivityLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AiActivityLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AiActivityLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiActivityLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AiActivityLog.
     * @param {AiActivityLogUpsertArgs} args - Arguments to update or create a AiActivityLog.
     * @example
     * // Update or create a AiActivityLog
     * const aiActivityLog = await prisma.aiActivityLog.upsert({
     *   create: {
     *     // ... data to create a AiActivityLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AiActivityLog we want to update
     *   }
     * })
     */
    upsert<T extends AiActivityLogUpsertArgs>(args: SelectSubset<T, AiActivityLogUpsertArgs<ExtArgs>>): Prisma__AiActivityLogClient<$Result.GetResult<Prisma.$AiActivityLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AiActivityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiActivityLogCountArgs} args - Arguments to filter AiActivityLogs to count.
     * @example
     * // Count the number of AiActivityLogs
     * const count = await prisma.aiActivityLog.count({
     *   where: {
     *     // ... the filter for the AiActivityLogs we want to count
     *   }
     * })
    **/
    count<T extends AiActivityLogCountArgs>(
      args?: Subset<T, AiActivityLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AiActivityLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AiActivityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiActivityLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AiActivityLogAggregateArgs>(args: Subset<T, AiActivityLogAggregateArgs>): Prisma.PrismaPromise<GetAiActivityLogAggregateType<T>>

    /**
     * Group by AiActivityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiActivityLogGroupByArgs} args - Group by arguments.
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
      T extends AiActivityLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AiActivityLogGroupByArgs['orderBy'] }
        : { orderBy?: AiActivityLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, AiActivityLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAiActivityLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AiActivityLog model
   */
  readonly fields: AiActivityLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AiActivityLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AiActivityLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AiActivityLog model
   */
  interface AiActivityLogFieldRefs {
    readonly id: FieldRef<"AiActivityLog", 'String'>
    readonly userId: FieldRef<"AiActivityLog", 'String'>
    readonly promptTokens: FieldRef<"AiActivityLog", 'Int'>
    readonly completionTokens: FieldRef<"AiActivityLog", 'Int'>
    readonly totalTokens: FieldRef<"AiActivityLog", 'Int'>
    readonly cost: FieldRef<"AiActivityLog", 'Float'>
    readonly intent: FieldRef<"AiActivityLog", 'String'>
    readonly createdAt: FieldRef<"AiActivityLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AiActivityLog findUnique
   */
  export type AiActivityLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiActivityLog
     */
    select?: AiActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiActivityLog
     */
    omit?: AiActivityLogOmit<ExtArgs> | null
    /**
     * Filter, which AiActivityLog to fetch.
     */
    where: AiActivityLogWhereUniqueInput
  }

  /**
   * AiActivityLog findUniqueOrThrow
   */
  export type AiActivityLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiActivityLog
     */
    select?: AiActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiActivityLog
     */
    omit?: AiActivityLogOmit<ExtArgs> | null
    /**
     * Filter, which AiActivityLog to fetch.
     */
    where: AiActivityLogWhereUniqueInput
  }

  /**
   * AiActivityLog findFirst
   */
  export type AiActivityLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiActivityLog
     */
    select?: AiActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiActivityLog
     */
    omit?: AiActivityLogOmit<ExtArgs> | null
    /**
     * Filter, which AiActivityLog to fetch.
     */
    where?: AiActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiActivityLogs to fetch.
     */
    orderBy?: AiActivityLogOrderByWithRelationInput | AiActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiActivityLogs.
     */
    cursor?: AiActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiActivityLogs.
     */
    distinct?: AiActivityLogScalarFieldEnum | AiActivityLogScalarFieldEnum[]
  }

  /**
   * AiActivityLog findFirstOrThrow
   */
  export type AiActivityLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiActivityLog
     */
    select?: AiActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiActivityLog
     */
    omit?: AiActivityLogOmit<ExtArgs> | null
    /**
     * Filter, which AiActivityLog to fetch.
     */
    where?: AiActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiActivityLogs to fetch.
     */
    orderBy?: AiActivityLogOrderByWithRelationInput | AiActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiActivityLogs.
     */
    cursor?: AiActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiActivityLogs.
     */
    distinct?: AiActivityLogScalarFieldEnum | AiActivityLogScalarFieldEnum[]
  }

  /**
   * AiActivityLog findMany
   */
  export type AiActivityLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiActivityLog
     */
    select?: AiActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiActivityLog
     */
    omit?: AiActivityLogOmit<ExtArgs> | null
    /**
     * Filter, which AiActivityLogs to fetch.
     */
    where?: AiActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiActivityLogs to fetch.
     */
    orderBy?: AiActivityLogOrderByWithRelationInput | AiActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AiActivityLogs.
     */
    cursor?: AiActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiActivityLogs.
     */
    distinct?: AiActivityLogScalarFieldEnum | AiActivityLogScalarFieldEnum[]
  }

  /**
   * AiActivityLog create
   */
  export type AiActivityLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiActivityLog
     */
    select?: AiActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiActivityLog
     */
    omit?: AiActivityLogOmit<ExtArgs> | null
    /**
     * The data needed to create a AiActivityLog.
     */
    data: XOR<AiActivityLogCreateInput, AiActivityLogUncheckedCreateInput>
  }

  /**
   * AiActivityLog createMany
   */
  export type AiActivityLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AiActivityLogs.
     */
    data: AiActivityLogCreateManyInput | AiActivityLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AiActivityLog createManyAndReturn
   */
  export type AiActivityLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiActivityLog
     */
    select?: AiActivityLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AiActivityLog
     */
    omit?: AiActivityLogOmit<ExtArgs> | null
    /**
     * The data used to create many AiActivityLogs.
     */
    data: AiActivityLogCreateManyInput | AiActivityLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AiActivityLog update
   */
  export type AiActivityLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiActivityLog
     */
    select?: AiActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiActivityLog
     */
    omit?: AiActivityLogOmit<ExtArgs> | null
    /**
     * The data needed to update a AiActivityLog.
     */
    data: XOR<AiActivityLogUpdateInput, AiActivityLogUncheckedUpdateInput>
    /**
     * Choose, which AiActivityLog to update.
     */
    where: AiActivityLogWhereUniqueInput
  }

  /**
   * AiActivityLog updateMany
   */
  export type AiActivityLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AiActivityLogs.
     */
    data: XOR<AiActivityLogUpdateManyMutationInput, AiActivityLogUncheckedUpdateManyInput>
    /**
     * Filter which AiActivityLogs to update
     */
    where?: AiActivityLogWhereInput
    /**
     * Limit how many AiActivityLogs to update.
     */
    limit?: number
  }

  /**
   * AiActivityLog updateManyAndReturn
   */
  export type AiActivityLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiActivityLog
     */
    select?: AiActivityLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AiActivityLog
     */
    omit?: AiActivityLogOmit<ExtArgs> | null
    /**
     * The data used to update AiActivityLogs.
     */
    data: XOR<AiActivityLogUpdateManyMutationInput, AiActivityLogUncheckedUpdateManyInput>
    /**
     * Filter which AiActivityLogs to update
     */
    where?: AiActivityLogWhereInput
    /**
     * Limit how many AiActivityLogs to update.
     */
    limit?: number
  }

  /**
   * AiActivityLog upsert
   */
  export type AiActivityLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiActivityLog
     */
    select?: AiActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiActivityLog
     */
    omit?: AiActivityLogOmit<ExtArgs> | null
    /**
     * The filter to search for the AiActivityLog to update in case it exists.
     */
    where: AiActivityLogWhereUniqueInput
    /**
     * In case the AiActivityLog found by the `where` argument doesn't exist, create a new AiActivityLog with this data.
     */
    create: XOR<AiActivityLogCreateInput, AiActivityLogUncheckedCreateInput>
    /**
     * In case the AiActivityLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AiActivityLogUpdateInput, AiActivityLogUncheckedUpdateInput>
  }

  /**
   * AiActivityLog delete
   */
  export type AiActivityLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiActivityLog
     */
    select?: AiActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiActivityLog
     */
    omit?: AiActivityLogOmit<ExtArgs> | null
    /**
     * Filter which AiActivityLog to delete.
     */
    where: AiActivityLogWhereUniqueInput
  }

  /**
   * AiActivityLog deleteMany
   */
  export type AiActivityLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiActivityLogs to delete
     */
    where?: AiActivityLogWhereInput
    /**
     * Limit how many AiActivityLogs to delete.
     */
    limit?: number
  }

  /**
   * AiActivityLog without action
   */
  export type AiActivityLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiActivityLog
     */
    select?: AiActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiActivityLog
     */
    omit?: AiActivityLogOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    height: 'height',
    weight: 'weight',
    age: 'age',
    gender: 'gender',
    activityLevel: 'activityLevel',
    workoutStyle: 'workoutStyle',
    goal: 'goal',
    targetCalories: 'targetCalories',
    targetProtein: 'targetProtein',
    targetCarbs: 'targetCarbs',
    targetFat: 'targetFat',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserProfileScalarFieldEnum = (typeof UserProfileScalarFieldEnum)[keyof typeof UserProfileScalarFieldEnum]


  export const DailyMealPlanScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    date: 'date',
    plan: 'plan',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DailyMealPlanScalarFieldEnum = (typeof DailyMealPlanScalarFieldEnum)[keyof typeof DailyMealPlanScalarFieldEnum]


  export const SystemPromptScalarFieldEnum: {
    id: 'id',
    workoutStyle: 'workoutStyle',
    prompt: 'prompt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SystemPromptScalarFieldEnum = (typeof SystemPromptScalarFieldEnum)[keyof typeof SystemPromptScalarFieldEnum]


  export const AiActivityLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    promptTokens: 'promptTokens',
    completionTokens: 'completionTokens',
    totalTokens: 'totalTokens',
    cost: 'cost',
    intent: 'intent',
    createdAt: 'createdAt'
  };

  export type AiActivityLogScalarFieldEnum = (typeof AiActivityLogScalarFieldEnum)[keyof typeof AiActivityLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    
  /**
   * Deep Input Types
   */


  export type UserProfileWhereInput = {
    AND?: UserProfileWhereInput | UserProfileWhereInput[]
    OR?: UserProfileWhereInput[]
    NOT?: UserProfileWhereInput | UserProfileWhereInput[]
    id?: StringFilter<"UserProfile"> | string
    userId?: StringFilter<"UserProfile"> | string
    height?: FloatFilter<"UserProfile"> | number
    weight?: FloatFilter<"UserProfile"> | number
    age?: IntFilter<"UserProfile"> | number
    gender?: StringFilter<"UserProfile"> | string
    activityLevel?: StringFilter<"UserProfile"> | string
    workoutStyle?: StringFilter<"UserProfile"> | string
    goal?: StringFilter<"UserProfile"> | string
    targetCalories?: IntNullableFilter<"UserProfile"> | number | null
    targetProtein?: IntNullableFilter<"UserProfile"> | number | null
    targetCarbs?: IntNullableFilter<"UserProfile"> | number | null
    targetFat?: IntNullableFilter<"UserProfile"> | number | null
    createdAt?: DateTimeFilter<"UserProfile"> | Date | string
    updatedAt?: DateTimeFilter<"UserProfile"> | Date | string
  }

  export type UserProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    height?: SortOrder
    weight?: SortOrder
    age?: SortOrder
    gender?: SortOrder
    activityLevel?: SortOrder
    workoutStyle?: SortOrder
    goal?: SortOrder
    targetCalories?: SortOrderInput | SortOrder
    targetProtein?: SortOrderInput | SortOrder
    targetCarbs?: SortOrderInput | SortOrder
    targetFat?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: UserProfileWhereInput | UserProfileWhereInput[]
    OR?: UserProfileWhereInput[]
    NOT?: UserProfileWhereInput | UserProfileWhereInput[]
    height?: FloatFilter<"UserProfile"> | number
    weight?: FloatFilter<"UserProfile"> | number
    age?: IntFilter<"UserProfile"> | number
    gender?: StringFilter<"UserProfile"> | string
    activityLevel?: StringFilter<"UserProfile"> | string
    workoutStyle?: StringFilter<"UserProfile"> | string
    goal?: StringFilter<"UserProfile"> | string
    targetCalories?: IntNullableFilter<"UserProfile"> | number | null
    targetProtein?: IntNullableFilter<"UserProfile"> | number | null
    targetCarbs?: IntNullableFilter<"UserProfile"> | number | null
    targetFat?: IntNullableFilter<"UserProfile"> | number | null
    createdAt?: DateTimeFilter<"UserProfile"> | Date | string
    updatedAt?: DateTimeFilter<"UserProfile"> | Date | string
  }, "id" | "userId">

  export type UserProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    height?: SortOrder
    weight?: SortOrder
    age?: SortOrder
    gender?: SortOrder
    activityLevel?: SortOrder
    workoutStyle?: SortOrder
    goal?: SortOrder
    targetCalories?: SortOrderInput | SortOrder
    targetProtein?: SortOrderInput | SortOrder
    targetCarbs?: SortOrderInput | SortOrder
    targetFat?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserProfileCountOrderByAggregateInput
    _avg?: UserProfileAvgOrderByAggregateInput
    _max?: UserProfileMaxOrderByAggregateInput
    _min?: UserProfileMinOrderByAggregateInput
    _sum?: UserProfileSumOrderByAggregateInput
  }

  export type UserProfileScalarWhereWithAggregatesInput = {
    AND?: UserProfileScalarWhereWithAggregatesInput | UserProfileScalarWhereWithAggregatesInput[]
    OR?: UserProfileScalarWhereWithAggregatesInput[]
    NOT?: UserProfileScalarWhereWithAggregatesInput | UserProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserProfile"> | string
    userId?: StringWithAggregatesFilter<"UserProfile"> | string
    height?: FloatWithAggregatesFilter<"UserProfile"> | number
    weight?: FloatWithAggregatesFilter<"UserProfile"> | number
    age?: IntWithAggregatesFilter<"UserProfile"> | number
    gender?: StringWithAggregatesFilter<"UserProfile"> | string
    activityLevel?: StringWithAggregatesFilter<"UserProfile"> | string
    workoutStyle?: StringWithAggregatesFilter<"UserProfile"> | string
    goal?: StringWithAggregatesFilter<"UserProfile"> | string
    targetCalories?: IntNullableWithAggregatesFilter<"UserProfile"> | number | null
    targetProtein?: IntNullableWithAggregatesFilter<"UserProfile"> | number | null
    targetCarbs?: IntNullableWithAggregatesFilter<"UserProfile"> | number | null
    targetFat?: IntNullableWithAggregatesFilter<"UserProfile"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"UserProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserProfile"> | Date | string
  }

  export type DailyMealPlanWhereInput = {
    AND?: DailyMealPlanWhereInput | DailyMealPlanWhereInput[]
    OR?: DailyMealPlanWhereInput[]
    NOT?: DailyMealPlanWhereInput | DailyMealPlanWhereInput[]
    id?: StringFilter<"DailyMealPlan"> | string
    userId?: StringFilter<"DailyMealPlan"> | string
    date?: DateTimeFilter<"DailyMealPlan"> | Date | string
    plan?: JsonFilter<"DailyMealPlan">
    createdAt?: DateTimeFilter<"DailyMealPlan"> | Date | string
    updatedAt?: DateTimeFilter<"DailyMealPlan"> | Date | string
  }

  export type DailyMealPlanOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    plan?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DailyMealPlanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_date?: DailyMealPlanUserIdDateCompoundUniqueInput
    AND?: DailyMealPlanWhereInput | DailyMealPlanWhereInput[]
    OR?: DailyMealPlanWhereInput[]
    NOT?: DailyMealPlanWhereInput | DailyMealPlanWhereInput[]
    userId?: StringFilter<"DailyMealPlan"> | string
    date?: DateTimeFilter<"DailyMealPlan"> | Date | string
    plan?: JsonFilter<"DailyMealPlan">
    createdAt?: DateTimeFilter<"DailyMealPlan"> | Date | string
    updatedAt?: DateTimeFilter<"DailyMealPlan"> | Date | string
  }, "id" | "userId_date">

  export type DailyMealPlanOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    plan?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DailyMealPlanCountOrderByAggregateInput
    _max?: DailyMealPlanMaxOrderByAggregateInput
    _min?: DailyMealPlanMinOrderByAggregateInput
  }

  export type DailyMealPlanScalarWhereWithAggregatesInput = {
    AND?: DailyMealPlanScalarWhereWithAggregatesInput | DailyMealPlanScalarWhereWithAggregatesInput[]
    OR?: DailyMealPlanScalarWhereWithAggregatesInput[]
    NOT?: DailyMealPlanScalarWhereWithAggregatesInput | DailyMealPlanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DailyMealPlan"> | string
    userId?: StringWithAggregatesFilter<"DailyMealPlan"> | string
    date?: DateTimeWithAggregatesFilter<"DailyMealPlan"> | Date | string
    plan?: JsonWithAggregatesFilter<"DailyMealPlan">
    createdAt?: DateTimeWithAggregatesFilter<"DailyMealPlan"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DailyMealPlan"> | Date | string
  }

  export type SystemPromptWhereInput = {
    AND?: SystemPromptWhereInput | SystemPromptWhereInput[]
    OR?: SystemPromptWhereInput[]
    NOT?: SystemPromptWhereInput | SystemPromptWhereInput[]
    id?: StringFilter<"SystemPrompt"> | string
    workoutStyle?: StringFilter<"SystemPrompt"> | string
    prompt?: StringFilter<"SystemPrompt"> | string
    createdAt?: DateTimeFilter<"SystemPrompt"> | Date | string
    updatedAt?: DateTimeFilter<"SystemPrompt"> | Date | string
  }

  export type SystemPromptOrderByWithRelationInput = {
    id?: SortOrder
    workoutStyle?: SortOrder
    prompt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemPromptWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    workoutStyle?: string
    AND?: SystemPromptWhereInput | SystemPromptWhereInput[]
    OR?: SystemPromptWhereInput[]
    NOT?: SystemPromptWhereInput | SystemPromptWhereInput[]
    prompt?: StringFilter<"SystemPrompt"> | string
    createdAt?: DateTimeFilter<"SystemPrompt"> | Date | string
    updatedAt?: DateTimeFilter<"SystemPrompt"> | Date | string
  }, "id" | "workoutStyle">

  export type SystemPromptOrderByWithAggregationInput = {
    id?: SortOrder
    workoutStyle?: SortOrder
    prompt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SystemPromptCountOrderByAggregateInput
    _max?: SystemPromptMaxOrderByAggregateInput
    _min?: SystemPromptMinOrderByAggregateInput
  }

  export type SystemPromptScalarWhereWithAggregatesInput = {
    AND?: SystemPromptScalarWhereWithAggregatesInput | SystemPromptScalarWhereWithAggregatesInput[]
    OR?: SystemPromptScalarWhereWithAggregatesInput[]
    NOT?: SystemPromptScalarWhereWithAggregatesInput | SystemPromptScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SystemPrompt"> | string
    workoutStyle?: StringWithAggregatesFilter<"SystemPrompt"> | string
    prompt?: StringWithAggregatesFilter<"SystemPrompt"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SystemPrompt"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SystemPrompt"> | Date | string
  }

  export type AiActivityLogWhereInput = {
    AND?: AiActivityLogWhereInput | AiActivityLogWhereInput[]
    OR?: AiActivityLogWhereInput[]
    NOT?: AiActivityLogWhereInput | AiActivityLogWhereInput[]
    id?: StringFilter<"AiActivityLog"> | string
    userId?: StringFilter<"AiActivityLog"> | string
    promptTokens?: IntFilter<"AiActivityLog"> | number
    completionTokens?: IntFilter<"AiActivityLog"> | number
    totalTokens?: IntFilter<"AiActivityLog"> | number
    cost?: FloatFilter<"AiActivityLog"> | number
    intent?: StringFilter<"AiActivityLog"> | string
    createdAt?: DateTimeFilter<"AiActivityLog"> | Date | string
  }

  export type AiActivityLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    promptTokens?: SortOrder
    completionTokens?: SortOrder
    totalTokens?: SortOrder
    cost?: SortOrder
    intent?: SortOrder
    createdAt?: SortOrder
  }

  export type AiActivityLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AiActivityLogWhereInput | AiActivityLogWhereInput[]
    OR?: AiActivityLogWhereInput[]
    NOT?: AiActivityLogWhereInput | AiActivityLogWhereInput[]
    userId?: StringFilter<"AiActivityLog"> | string
    promptTokens?: IntFilter<"AiActivityLog"> | number
    completionTokens?: IntFilter<"AiActivityLog"> | number
    totalTokens?: IntFilter<"AiActivityLog"> | number
    cost?: FloatFilter<"AiActivityLog"> | number
    intent?: StringFilter<"AiActivityLog"> | string
    createdAt?: DateTimeFilter<"AiActivityLog"> | Date | string
  }, "id">

  export type AiActivityLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    promptTokens?: SortOrder
    completionTokens?: SortOrder
    totalTokens?: SortOrder
    cost?: SortOrder
    intent?: SortOrder
    createdAt?: SortOrder
    _count?: AiActivityLogCountOrderByAggregateInput
    _avg?: AiActivityLogAvgOrderByAggregateInput
    _max?: AiActivityLogMaxOrderByAggregateInput
    _min?: AiActivityLogMinOrderByAggregateInput
    _sum?: AiActivityLogSumOrderByAggregateInput
  }

  export type AiActivityLogScalarWhereWithAggregatesInput = {
    AND?: AiActivityLogScalarWhereWithAggregatesInput | AiActivityLogScalarWhereWithAggregatesInput[]
    OR?: AiActivityLogScalarWhereWithAggregatesInput[]
    NOT?: AiActivityLogScalarWhereWithAggregatesInput | AiActivityLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AiActivityLog"> | string
    userId?: StringWithAggregatesFilter<"AiActivityLog"> | string
    promptTokens?: IntWithAggregatesFilter<"AiActivityLog"> | number
    completionTokens?: IntWithAggregatesFilter<"AiActivityLog"> | number
    totalTokens?: IntWithAggregatesFilter<"AiActivityLog"> | number
    cost?: FloatWithAggregatesFilter<"AiActivityLog"> | number
    intent?: StringWithAggregatesFilter<"AiActivityLog"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AiActivityLog"> | Date | string
  }

  export type UserProfileCreateInput = {
    id?: string
    userId: string
    height: number
    weight: number
    age: number
    gender: string
    activityLevel: string
    workoutStyle: string
    goal: string
    targetCalories?: number | null
    targetProtein?: number | null
    targetCarbs?: number | null
    targetFat?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserProfileUncheckedCreateInput = {
    id?: string
    userId: string
    height: number
    weight: number
    age: number
    gender: string
    activityLevel: string
    workoutStyle: string
    goal: string
    targetCalories?: number | null
    targetProtein?: number | null
    targetCarbs?: number | null
    targetFat?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    height?: FloatFieldUpdateOperationsInput | number
    weight?: FloatFieldUpdateOperationsInput | number
    age?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    activityLevel?: StringFieldUpdateOperationsInput | string
    workoutStyle?: StringFieldUpdateOperationsInput | string
    goal?: StringFieldUpdateOperationsInput | string
    targetCalories?: NullableIntFieldUpdateOperationsInput | number | null
    targetProtein?: NullableIntFieldUpdateOperationsInput | number | null
    targetCarbs?: NullableIntFieldUpdateOperationsInput | number | null
    targetFat?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    height?: FloatFieldUpdateOperationsInput | number
    weight?: FloatFieldUpdateOperationsInput | number
    age?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    activityLevel?: StringFieldUpdateOperationsInput | string
    workoutStyle?: StringFieldUpdateOperationsInput | string
    goal?: StringFieldUpdateOperationsInput | string
    targetCalories?: NullableIntFieldUpdateOperationsInput | number | null
    targetProtein?: NullableIntFieldUpdateOperationsInput | number | null
    targetCarbs?: NullableIntFieldUpdateOperationsInput | number | null
    targetFat?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserProfileCreateManyInput = {
    id?: string
    userId: string
    height: number
    weight: number
    age: number
    gender: string
    activityLevel: string
    workoutStyle: string
    goal: string
    targetCalories?: number | null
    targetProtein?: number | null
    targetCarbs?: number | null
    targetFat?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    height?: FloatFieldUpdateOperationsInput | number
    weight?: FloatFieldUpdateOperationsInput | number
    age?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    activityLevel?: StringFieldUpdateOperationsInput | string
    workoutStyle?: StringFieldUpdateOperationsInput | string
    goal?: StringFieldUpdateOperationsInput | string
    targetCalories?: NullableIntFieldUpdateOperationsInput | number | null
    targetProtein?: NullableIntFieldUpdateOperationsInput | number | null
    targetCarbs?: NullableIntFieldUpdateOperationsInput | number | null
    targetFat?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    height?: FloatFieldUpdateOperationsInput | number
    weight?: FloatFieldUpdateOperationsInput | number
    age?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    activityLevel?: StringFieldUpdateOperationsInput | string
    workoutStyle?: StringFieldUpdateOperationsInput | string
    goal?: StringFieldUpdateOperationsInput | string
    targetCalories?: NullableIntFieldUpdateOperationsInput | number | null
    targetProtein?: NullableIntFieldUpdateOperationsInput | number | null
    targetCarbs?: NullableIntFieldUpdateOperationsInput | number | null
    targetFat?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyMealPlanCreateInput = {
    id?: string
    userId: string
    date: Date | string
    plan: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyMealPlanUncheckedCreateInput = {
    id?: string
    userId: string
    date: Date | string
    plan: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyMealPlanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    plan?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyMealPlanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    plan?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyMealPlanCreateManyInput = {
    id?: string
    userId: string
    date: Date | string
    plan: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyMealPlanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    plan?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyMealPlanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    plan?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemPromptCreateInput = {
    id?: string
    workoutStyle: string
    prompt: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SystemPromptUncheckedCreateInput = {
    id?: string
    workoutStyle: string
    prompt: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SystemPromptUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    workoutStyle?: StringFieldUpdateOperationsInput | string
    prompt?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemPromptUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    workoutStyle?: StringFieldUpdateOperationsInput | string
    prompt?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemPromptCreateManyInput = {
    id?: string
    workoutStyle: string
    prompt: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SystemPromptUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    workoutStyle?: StringFieldUpdateOperationsInput | string
    prompt?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemPromptUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    workoutStyle?: StringFieldUpdateOperationsInput | string
    prompt?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiActivityLogCreateInput = {
    id?: string
    userId: string
    promptTokens: number
    completionTokens: number
    totalTokens: number
    cost: number
    intent: string
    createdAt?: Date | string
  }

  export type AiActivityLogUncheckedCreateInput = {
    id?: string
    userId: string
    promptTokens: number
    completionTokens: number
    totalTokens: number
    cost: number
    intent: string
    createdAt?: Date | string
  }

  export type AiActivityLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    completionTokens?: IntFieldUpdateOperationsInput | number
    totalTokens?: IntFieldUpdateOperationsInput | number
    cost?: FloatFieldUpdateOperationsInput | number
    intent?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiActivityLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    completionTokens?: IntFieldUpdateOperationsInput | number
    totalTokens?: IntFieldUpdateOperationsInput | number
    cost?: FloatFieldUpdateOperationsInput | number
    intent?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiActivityLogCreateManyInput = {
    id?: string
    userId: string
    promptTokens: number
    completionTokens: number
    totalTokens: number
    cost: number
    intent: string
    createdAt?: Date | string
  }

  export type AiActivityLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    completionTokens?: IntFieldUpdateOperationsInput | number
    totalTokens?: IntFieldUpdateOperationsInput | number
    cost?: FloatFieldUpdateOperationsInput | number
    intent?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiActivityLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    completionTokens?: IntFieldUpdateOperationsInput | number
    totalTokens?: IntFieldUpdateOperationsInput | number
    cost?: FloatFieldUpdateOperationsInput | number
    intent?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    height?: SortOrder
    weight?: SortOrder
    age?: SortOrder
    gender?: SortOrder
    activityLevel?: SortOrder
    workoutStyle?: SortOrder
    goal?: SortOrder
    targetCalories?: SortOrder
    targetProtein?: SortOrder
    targetCarbs?: SortOrder
    targetFat?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserProfileAvgOrderByAggregateInput = {
    height?: SortOrder
    weight?: SortOrder
    age?: SortOrder
    targetCalories?: SortOrder
    targetProtein?: SortOrder
    targetCarbs?: SortOrder
    targetFat?: SortOrder
  }

  export type UserProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    height?: SortOrder
    weight?: SortOrder
    age?: SortOrder
    gender?: SortOrder
    activityLevel?: SortOrder
    workoutStyle?: SortOrder
    goal?: SortOrder
    targetCalories?: SortOrder
    targetProtein?: SortOrder
    targetCarbs?: SortOrder
    targetFat?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    height?: SortOrder
    weight?: SortOrder
    age?: SortOrder
    gender?: SortOrder
    activityLevel?: SortOrder
    workoutStyle?: SortOrder
    goal?: SortOrder
    targetCalories?: SortOrder
    targetProtein?: SortOrder
    targetCarbs?: SortOrder
    targetFat?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserProfileSumOrderByAggregateInput = {
    height?: SortOrder
    weight?: SortOrder
    age?: SortOrder
    targetCalories?: SortOrder
    targetProtein?: SortOrder
    targetCarbs?: SortOrder
    targetFat?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DailyMealPlanUserIdDateCompoundUniqueInput = {
    userId: string
    date: Date | string
  }

  export type DailyMealPlanCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    plan?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DailyMealPlanMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DailyMealPlanMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type SystemPromptCountOrderByAggregateInput = {
    id?: SortOrder
    workoutStyle?: SortOrder
    prompt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemPromptMaxOrderByAggregateInput = {
    id?: SortOrder
    workoutStyle?: SortOrder
    prompt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemPromptMinOrderByAggregateInput = {
    id?: SortOrder
    workoutStyle?: SortOrder
    prompt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AiActivityLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    promptTokens?: SortOrder
    completionTokens?: SortOrder
    totalTokens?: SortOrder
    cost?: SortOrder
    intent?: SortOrder
    createdAt?: SortOrder
  }

  export type AiActivityLogAvgOrderByAggregateInput = {
    promptTokens?: SortOrder
    completionTokens?: SortOrder
    totalTokens?: SortOrder
    cost?: SortOrder
  }

  export type AiActivityLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    promptTokens?: SortOrder
    completionTokens?: SortOrder
    totalTokens?: SortOrder
    cost?: SortOrder
    intent?: SortOrder
    createdAt?: SortOrder
  }

  export type AiActivityLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    promptTokens?: SortOrder
    completionTokens?: SortOrder
    totalTokens?: SortOrder
    cost?: SortOrder
    intent?: SortOrder
    createdAt?: SortOrder
  }

  export type AiActivityLogSumOrderByAggregateInput = {
    promptTokens?: SortOrder
    completionTokens?: SortOrder
    totalTokens?: SortOrder
    cost?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
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
  export const dmmf: runtime.BaseDMMF
}