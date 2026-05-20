
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
 * Model MasterFood
 * 
 */
export type MasterFood = $Result.DefaultSelection<Prisma.$MasterFoodPayload>
/**
 * Model MasterExercise
 * 
 */
export type MasterExercise = $Result.DefaultSelection<Prisma.$MasterExercisePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const FoodStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED'
};

export type FoodStatus = (typeof FoodStatus)[keyof typeof FoodStatus]

}

export type FoodStatus = $Enums.FoodStatus

export const FoodStatus: typeof $Enums.FoodStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more MasterFoods
 * const masterFoods = await prisma.masterFood.findMany()
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
   * // Fetch zero or more MasterFoods
   * const masterFoods = await prisma.masterFood.findMany()
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
   * `prisma.masterFood`: Exposes CRUD operations for the **MasterFood** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MasterFoods
    * const masterFoods = await prisma.masterFood.findMany()
    * ```
    */
  get masterFood(): Prisma.MasterFoodDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.masterExercise`: Exposes CRUD operations for the **MasterExercise** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MasterExercises
    * const masterExercises = await prisma.masterExercise.findMany()
    * ```
    */
  get masterExercise(): Prisma.MasterExerciseDelegate<ExtArgs, ClientOptions>;
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
    MasterFood: 'MasterFood',
    MasterExercise: 'MasterExercise'
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
      modelProps: "masterFood" | "masterExercise"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      MasterFood: {
        payload: Prisma.$MasterFoodPayload<ExtArgs>
        fields: Prisma.MasterFoodFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MasterFoodFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterFoodPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MasterFoodFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterFoodPayload>
          }
          findFirst: {
            args: Prisma.MasterFoodFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterFoodPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MasterFoodFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterFoodPayload>
          }
          findMany: {
            args: Prisma.MasterFoodFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterFoodPayload>[]
          }
          create: {
            args: Prisma.MasterFoodCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterFoodPayload>
          }
          createMany: {
            args: Prisma.MasterFoodCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MasterFoodCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterFoodPayload>[]
          }
          delete: {
            args: Prisma.MasterFoodDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterFoodPayload>
          }
          update: {
            args: Prisma.MasterFoodUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterFoodPayload>
          }
          deleteMany: {
            args: Prisma.MasterFoodDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MasterFoodUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MasterFoodUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterFoodPayload>[]
          }
          upsert: {
            args: Prisma.MasterFoodUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterFoodPayload>
          }
          aggregate: {
            args: Prisma.MasterFoodAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMasterFood>
          }
          groupBy: {
            args: Prisma.MasterFoodGroupByArgs<ExtArgs>
            result: $Utils.Optional<MasterFoodGroupByOutputType>[]
          }
          count: {
            args: Prisma.MasterFoodCountArgs<ExtArgs>
            result: $Utils.Optional<MasterFoodCountAggregateOutputType> | number
          }
        }
      }
      MasterExercise: {
        payload: Prisma.$MasterExercisePayload<ExtArgs>
        fields: Prisma.MasterExerciseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MasterExerciseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterExercisePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MasterExerciseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterExercisePayload>
          }
          findFirst: {
            args: Prisma.MasterExerciseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterExercisePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MasterExerciseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterExercisePayload>
          }
          findMany: {
            args: Prisma.MasterExerciseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterExercisePayload>[]
          }
          create: {
            args: Prisma.MasterExerciseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterExercisePayload>
          }
          createMany: {
            args: Prisma.MasterExerciseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MasterExerciseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterExercisePayload>[]
          }
          delete: {
            args: Prisma.MasterExerciseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterExercisePayload>
          }
          update: {
            args: Prisma.MasterExerciseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterExercisePayload>
          }
          deleteMany: {
            args: Prisma.MasterExerciseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MasterExerciseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MasterExerciseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterExercisePayload>[]
          }
          upsert: {
            args: Prisma.MasterExerciseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterExercisePayload>
          }
          aggregate: {
            args: Prisma.MasterExerciseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMasterExercise>
          }
          groupBy: {
            args: Prisma.MasterExerciseGroupByArgs<ExtArgs>
            result: $Utils.Optional<MasterExerciseGroupByOutputType>[]
          }
          count: {
            args: Prisma.MasterExerciseCountArgs<ExtArgs>
            result: $Utils.Optional<MasterExerciseCountAggregateOutputType> | number
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
    masterFood?: MasterFoodOmit
    masterExercise?: MasterExerciseOmit
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
   * Model MasterFood
   */

  export type AggregateMasterFood = {
    _count: MasterFoodCountAggregateOutputType | null
    _avg: MasterFoodAvgAggregateOutputType | null
    _sum: MasterFoodSumAggregateOutputType | null
    _min: MasterFoodMinAggregateOutputType | null
    _max: MasterFoodMaxAggregateOutputType | null
  }

  export type MasterFoodAvgAggregateOutputType = {
    baseServingSize: number | null
    baseCalories: number | null
    baseProtein: number | null
    baseCarbs: number | null
    baseFat: number | null
  }

  export type MasterFoodSumAggregateOutputType = {
    baseServingSize: number | null
    baseCalories: number | null
    baseProtein: number | null
    baseCarbs: number | null
    baseFat: number | null
  }

  export type MasterFoodMinAggregateOutputType = {
    id: string | null
    name: string | null
    baseServingSize: number | null
    baseCalories: number | null
    baseProtein: number | null
    baseCarbs: number | null
    baseFat: number | null
    status: $Enums.FoodStatus | null
  }

  export type MasterFoodMaxAggregateOutputType = {
    id: string | null
    name: string | null
    baseServingSize: number | null
    baseCalories: number | null
    baseProtein: number | null
    baseCarbs: number | null
    baseFat: number | null
    status: $Enums.FoodStatus | null
  }

  export type MasterFoodCountAggregateOutputType = {
    id: number
    name: number
    baseServingSize: number
    baseCalories: number
    baseProtein: number
    baseCarbs: number
    baseFat: number
    status: number
    _all: number
  }


  export type MasterFoodAvgAggregateInputType = {
    baseServingSize?: true
    baseCalories?: true
    baseProtein?: true
    baseCarbs?: true
    baseFat?: true
  }

  export type MasterFoodSumAggregateInputType = {
    baseServingSize?: true
    baseCalories?: true
    baseProtein?: true
    baseCarbs?: true
    baseFat?: true
  }

  export type MasterFoodMinAggregateInputType = {
    id?: true
    name?: true
    baseServingSize?: true
    baseCalories?: true
    baseProtein?: true
    baseCarbs?: true
    baseFat?: true
    status?: true
  }

  export type MasterFoodMaxAggregateInputType = {
    id?: true
    name?: true
    baseServingSize?: true
    baseCalories?: true
    baseProtein?: true
    baseCarbs?: true
    baseFat?: true
    status?: true
  }

  export type MasterFoodCountAggregateInputType = {
    id?: true
    name?: true
    baseServingSize?: true
    baseCalories?: true
    baseProtein?: true
    baseCarbs?: true
    baseFat?: true
    status?: true
    _all?: true
  }

  export type MasterFoodAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MasterFood to aggregate.
     */
    where?: MasterFoodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MasterFoods to fetch.
     */
    orderBy?: MasterFoodOrderByWithRelationInput | MasterFoodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MasterFoodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MasterFoods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MasterFoods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MasterFoods
    **/
    _count?: true | MasterFoodCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MasterFoodAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MasterFoodSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MasterFoodMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MasterFoodMaxAggregateInputType
  }

  export type GetMasterFoodAggregateType<T extends MasterFoodAggregateArgs> = {
        [P in keyof T & keyof AggregateMasterFood]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMasterFood[P]>
      : GetScalarType<T[P], AggregateMasterFood[P]>
  }




  export type MasterFoodGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MasterFoodWhereInput
    orderBy?: MasterFoodOrderByWithAggregationInput | MasterFoodOrderByWithAggregationInput[]
    by: MasterFoodScalarFieldEnum[] | MasterFoodScalarFieldEnum
    having?: MasterFoodScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MasterFoodCountAggregateInputType | true
    _avg?: MasterFoodAvgAggregateInputType
    _sum?: MasterFoodSumAggregateInputType
    _min?: MasterFoodMinAggregateInputType
    _max?: MasterFoodMaxAggregateInputType
  }

  export type MasterFoodGroupByOutputType = {
    id: string
    name: string
    baseServingSize: number
    baseCalories: number
    baseProtein: number
    baseCarbs: number
    baseFat: number
    status: $Enums.FoodStatus
    _count: MasterFoodCountAggregateOutputType | null
    _avg: MasterFoodAvgAggregateOutputType | null
    _sum: MasterFoodSumAggregateOutputType | null
    _min: MasterFoodMinAggregateOutputType | null
    _max: MasterFoodMaxAggregateOutputType | null
  }

  type GetMasterFoodGroupByPayload<T extends MasterFoodGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MasterFoodGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MasterFoodGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MasterFoodGroupByOutputType[P]>
            : GetScalarType<T[P], MasterFoodGroupByOutputType[P]>
        }
      >
    >


  export type MasterFoodSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    baseServingSize?: boolean
    baseCalories?: boolean
    baseProtein?: boolean
    baseCarbs?: boolean
    baseFat?: boolean
    status?: boolean
  }, ExtArgs["result"]["masterFood"]>

  export type MasterFoodSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    baseServingSize?: boolean
    baseCalories?: boolean
    baseProtein?: boolean
    baseCarbs?: boolean
    baseFat?: boolean
    status?: boolean
  }, ExtArgs["result"]["masterFood"]>

  export type MasterFoodSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    baseServingSize?: boolean
    baseCalories?: boolean
    baseProtein?: boolean
    baseCarbs?: boolean
    baseFat?: boolean
    status?: boolean
  }, ExtArgs["result"]["masterFood"]>

  export type MasterFoodSelectScalar = {
    id?: boolean
    name?: boolean
    baseServingSize?: boolean
    baseCalories?: boolean
    baseProtein?: boolean
    baseCarbs?: boolean
    baseFat?: boolean
    status?: boolean
  }

  export type MasterFoodOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "baseServingSize" | "baseCalories" | "baseProtein" | "baseCarbs" | "baseFat" | "status", ExtArgs["result"]["masterFood"]>

  export type $MasterFoodPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MasterFood"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      baseServingSize: number
      baseCalories: number
      baseProtein: number
      baseCarbs: number
      baseFat: number
      status: $Enums.FoodStatus
    }, ExtArgs["result"]["masterFood"]>
    composites: {}
  }

  type MasterFoodGetPayload<S extends boolean | null | undefined | MasterFoodDefaultArgs> = $Result.GetResult<Prisma.$MasterFoodPayload, S>

  type MasterFoodCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MasterFoodFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MasterFoodCountAggregateInputType | true
    }

  export interface MasterFoodDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MasterFood'], meta: { name: 'MasterFood' } }
    /**
     * Find zero or one MasterFood that matches the filter.
     * @param {MasterFoodFindUniqueArgs} args - Arguments to find a MasterFood
     * @example
     * // Get one MasterFood
     * const masterFood = await prisma.masterFood.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MasterFoodFindUniqueArgs>(args: SelectSubset<T, MasterFoodFindUniqueArgs<ExtArgs>>): Prisma__MasterFoodClient<$Result.GetResult<Prisma.$MasterFoodPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MasterFood that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MasterFoodFindUniqueOrThrowArgs} args - Arguments to find a MasterFood
     * @example
     * // Get one MasterFood
     * const masterFood = await prisma.masterFood.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MasterFoodFindUniqueOrThrowArgs>(args: SelectSubset<T, MasterFoodFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MasterFoodClient<$Result.GetResult<Prisma.$MasterFoodPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MasterFood that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterFoodFindFirstArgs} args - Arguments to find a MasterFood
     * @example
     * // Get one MasterFood
     * const masterFood = await prisma.masterFood.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MasterFoodFindFirstArgs>(args?: SelectSubset<T, MasterFoodFindFirstArgs<ExtArgs>>): Prisma__MasterFoodClient<$Result.GetResult<Prisma.$MasterFoodPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MasterFood that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterFoodFindFirstOrThrowArgs} args - Arguments to find a MasterFood
     * @example
     * // Get one MasterFood
     * const masterFood = await prisma.masterFood.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MasterFoodFindFirstOrThrowArgs>(args?: SelectSubset<T, MasterFoodFindFirstOrThrowArgs<ExtArgs>>): Prisma__MasterFoodClient<$Result.GetResult<Prisma.$MasterFoodPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MasterFoods that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterFoodFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MasterFoods
     * const masterFoods = await prisma.masterFood.findMany()
     * 
     * // Get first 10 MasterFoods
     * const masterFoods = await prisma.masterFood.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const masterFoodWithIdOnly = await prisma.masterFood.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MasterFoodFindManyArgs>(args?: SelectSubset<T, MasterFoodFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MasterFoodPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MasterFood.
     * @param {MasterFoodCreateArgs} args - Arguments to create a MasterFood.
     * @example
     * // Create one MasterFood
     * const MasterFood = await prisma.masterFood.create({
     *   data: {
     *     // ... data to create a MasterFood
     *   }
     * })
     * 
     */
    create<T extends MasterFoodCreateArgs>(args: SelectSubset<T, MasterFoodCreateArgs<ExtArgs>>): Prisma__MasterFoodClient<$Result.GetResult<Prisma.$MasterFoodPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MasterFoods.
     * @param {MasterFoodCreateManyArgs} args - Arguments to create many MasterFoods.
     * @example
     * // Create many MasterFoods
     * const masterFood = await prisma.masterFood.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MasterFoodCreateManyArgs>(args?: SelectSubset<T, MasterFoodCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MasterFoods and returns the data saved in the database.
     * @param {MasterFoodCreateManyAndReturnArgs} args - Arguments to create many MasterFoods.
     * @example
     * // Create many MasterFoods
     * const masterFood = await prisma.masterFood.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MasterFoods and only return the `id`
     * const masterFoodWithIdOnly = await prisma.masterFood.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MasterFoodCreateManyAndReturnArgs>(args?: SelectSubset<T, MasterFoodCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MasterFoodPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MasterFood.
     * @param {MasterFoodDeleteArgs} args - Arguments to delete one MasterFood.
     * @example
     * // Delete one MasterFood
     * const MasterFood = await prisma.masterFood.delete({
     *   where: {
     *     // ... filter to delete one MasterFood
     *   }
     * })
     * 
     */
    delete<T extends MasterFoodDeleteArgs>(args: SelectSubset<T, MasterFoodDeleteArgs<ExtArgs>>): Prisma__MasterFoodClient<$Result.GetResult<Prisma.$MasterFoodPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MasterFood.
     * @param {MasterFoodUpdateArgs} args - Arguments to update one MasterFood.
     * @example
     * // Update one MasterFood
     * const masterFood = await prisma.masterFood.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MasterFoodUpdateArgs>(args: SelectSubset<T, MasterFoodUpdateArgs<ExtArgs>>): Prisma__MasterFoodClient<$Result.GetResult<Prisma.$MasterFoodPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MasterFoods.
     * @param {MasterFoodDeleteManyArgs} args - Arguments to filter MasterFoods to delete.
     * @example
     * // Delete a few MasterFoods
     * const { count } = await prisma.masterFood.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MasterFoodDeleteManyArgs>(args?: SelectSubset<T, MasterFoodDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MasterFoods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterFoodUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MasterFoods
     * const masterFood = await prisma.masterFood.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MasterFoodUpdateManyArgs>(args: SelectSubset<T, MasterFoodUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MasterFoods and returns the data updated in the database.
     * @param {MasterFoodUpdateManyAndReturnArgs} args - Arguments to update many MasterFoods.
     * @example
     * // Update many MasterFoods
     * const masterFood = await prisma.masterFood.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MasterFoods and only return the `id`
     * const masterFoodWithIdOnly = await prisma.masterFood.updateManyAndReturn({
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
    updateManyAndReturn<T extends MasterFoodUpdateManyAndReturnArgs>(args: SelectSubset<T, MasterFoodUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MasterFoodPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MasterFood.
     * @param {MasterFoodUpsertArgs} args - Arguments to update or create a MasterFood.
     * @example
     * // Update or create a MasterFood
     * const masterFood = await prisma.masterFood.upsert({
     *   create: {
     *     // ... data to create a MasterFood
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MasterFood we want to update
     *   }
     * })
     */
    upsert<T extends MasterFoodUpsertArgs>(args: SelectSubset<T, MasterFoodUpsertArgs<ExtArgs>>): Prisma__MasterFoodClient<$Result.GetResult<Prisma.$MasterFoodPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MasterFoods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterFoodCountArgs} args - Arguments to filter MasterFoods to count.
     * @example
     * // Count the number of MasterFoods
     * const count = await prisma.masterFood.count({
     *   where: {
     *     // ... the filter for the MasterFoods we want to count
     *   }
     * })
    **/
    count<T extends MasterFoodCountArgs>(
      args?: Subset<T, MasterFoodCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MasterFoodCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MasterFood.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterFoodAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MasterFoodAggregateArgs>(args: Subset<T, MasterFoodAggregateArgs>): Prisma.PrismaPromise<GetMasterFoodAggregateType<T>>

    /**
     * Group by MasterFood.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterFoodGroupByArgs} args - Group by arguments.
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
      T extends MasterFoodGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MasterFoodGroupByArgs['orderBy'] }
        : { orderBy?: MasterFoodGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MasterFoodGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMasterFoodGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MasterFood model
   */
  readonly fields: MasterFoodFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MasterFood.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MasterFoodClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the MasterFood model
   */
  interface MasterFoodFieldRefs {
    readonly id: FieldRef<"MasterFood", 'String'>
    readonly name: FieldRef<"MasterFood", 'String'>
    readonly baseServingSize: FieldRef<"MasterFood", 'Float'>
    readonly baseCalories: FieldRef<"MasterFood", 'Float'>
    readonly baseProtein: FieldRef<"MasterFood", 'Float'>
    readonly baseCarbs: FieldRef<"MasterFood", 'Float'>
    readonly baseFat: FieldRef<"MasterFood", 'Float'>
    readonly status: FieldRef<"MasterFood", 'FoodStatus'>
  }
    

  // Custom InputTypes
  /**
   * MasterFood findUnique
   */
  export type MasterFoodFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterFood
     */
    select?: MasterFoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasterFood
     */
    omit?: MasterFoodOmit<ExtArgs> | null
    /**
     * Filter, which MasterFood to fetch.
     */
    where: MasterFoodWhereUniqueInput
  }

  /**
   * MasterFood findUniqueOrThrow
   */
  export type MasterFoodFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterFood
     */
    select?: MasterFoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasterFood
     */
    omit?: MasterFoodOmit<ExtArgs> | null
    /**
     * Filter, which MasterFood to fetch.
     */
    where: MasterFoodWhereUniqueInput
  }

  /**
   * MasterFood findFirst
   */
  export type MasterFoodFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterFood
     */
    select?: MasterFoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasterFood
     */
    omit?: MasterFoodOmit<ExtArgs> | null
    /**
     * Filter, which MasterFood to fetch.
     */
    where?: MasterFoodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MasterFoods to fetch.
     */
    orderBy?: MasterFoodOrderByWithRelationInput | MasterFoodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MasterFoods.
     */
    cursor?: MasterFoodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MasterFoods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MasterFoods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MasterFoods.
     */
    distinct?: MasterFoodScalarFieldEnum | MasterFoodScalarFieldEnum[]
  }

  /**
   * MasterFood findFirstOrThrow
   */
  export type MasterFoodFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterFood
     */
    select?: MasterFoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasterFood
     */
    omit?: MasterFoodOmit<ExtArgs> | null
    /**
     * Filter, which MasterFood to fetch.
     */
    where?: MasterFoodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MasterFoods to fetch.
     */
    orderBy?: MasterFoodOrderByWithRelationInput | MasterFoodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MasterFoods.
     */
    cursor?: MasterFoodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MasterFoods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MasterFoods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MasterFoods.
     */
    distinct?: MasterFoodScalarFieldEnum | MasterFoodScalarFieldEnum[]
  }

  /**
   * MasterFood findMany
   */
  export type MasterFoodFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterFood
     */
    select?: MasterFoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasterFood
     */
    omit?: MasterFoodOmit<ExtArgs> | null
    /**
     * Filter, which MasterFoods to fetch.
     */
    where?: MasterFoodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MasterFoods to fetch.
     */
    orderBy?: MasterFoodOrderByWithRelationInput | MasterFoodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MasterFoods.
     */
    cursor?: MasterFoodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MasterFoods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MasterFoods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MasterFoods.
     */
    distinct?: MasterFoodScalarFieldEnum | MasterFoodScalarFieldEnum[]
  }

  /**
   * MasterFood create
   */
  export type MasterFoodCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterFood
     */
    select?: MasterFoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasterFood
     */
    omit?: MasterFoodOmit<ExtArgs> | null
    /**
     * The data needed to create a MasterFood.
     */
    data: XOR<MasterFoodCreateInput, MasterFoodUncheckedCreateInput>
  }

  /**
   * MasterFood createMany
   */
  export type MasterFoodCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MasterFoods.
     */
    data: MasterFoodCreateManyInput | MasterFoodCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MasterFood createManyAndReturn
   */
  export type MasterFoodCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterFood
     */
    select?: MasterFoodSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MasterFood
     */
    omit?: MasterFoodOmit<ExtArgs> | null
    /**
     * The data used to create many MasterFoods.
     */
    data: MasterFoodCreateManyInput | MasterFoodCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MasterFood update
   */
  export type MasterFoodUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterFood
     */
    select?: MasterFoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasterFood
     */
    omit?: MasterFoodOmit<ExtArgs> | null
    /**
     * The data needed to update a MasterFood.
     */
    data: XOR<MasterFoodUpdateInput, MasterFoodUncheckedUpdateInput>
    /**
     * Choose, which MasterFood to update.
     */
    where: MasterFoodWhereUniqueInput
  }

  /**
   * MasterFood updateMany
   */
  export type MasterFoodUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MasterFoods.
     */
    data: XOR<MasterFoodUpdateManyMutationInput, MasterFoodUncheckedUpdateManyInput>
    /**
     * Filter which MasterFoods to update
     */
    where?: MasterFoodWhereInput
    /**
     * Limit how many MasterFoods to update.
     */
    limit?: number
  }

  /**
   * MasterFood updateManyAndReturn
   */
  export type MasterFoodUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterFood
     */
    select?: MasterFoodSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MasterFood
     */
    omit?: MasterFoodOmit<ExtArgs> | null
    /**
     * The data used to update MasterFoods.
     */
    data: XOR<MasterFoodUpdateManyMutationInput, MasterFoodUncheckedUpdateManyInput>
    /**
     * Filter which MasterFoods to update
     */
    where?: MasterFoodWhereInput
    /**
     * Limit how many MasterFoods to update.
     */
    limit?: number
  }

  /**
   * MasterFood upsert
   */
  export type MasterFoodUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterFood
     */
    select?: MasterFoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasterFood
     */
    omit?: MasterFoodOmit<ExtArgs> | null
    /**
     * The filter to search for the MasterFood to update in case it exists.
     */
    where: MasterFoodWhereUniqueInput
    /**
     * In case the MasterFood found by the `where` argument doesn't exist, create a new MasterFood with this data.
     */
    create: XOR<MasterFoodCreateInput, MasterFoodUncheckedCreateInput>
    /**
     * In case the MasterFood was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MasterFoodUpdateInput, MasterFoodUncheckedUpdateInput>
  }

  /**
   * MasterFood delete
   */
  export type MasterFoodDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterFood
     */
    select?: MasterFoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasterFood
     */
    omit?: MasterFoodOmit<ExtArgs> | null
    /**
     * Filter which MasterFood to delete.
     */
    where: MasterFoodWhereUniqueInput
  }

  /**
   * MasterFood deleteMany
   */
  export type MasterFoodDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MasterFoods to delete
     */
    where?: MasterFoodWhereInput
    /**
     * Limit how many MasterFoods to delete.
     */
    limit?: number
  }

  /**
   * MasterFood without action
   */
  export type MasterFoodDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterFood
     */
    select?: MasterFoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasterFood
     */
    omit?: MasterFoodOmit<ExtArgs> | null
  }


  /**
   * Model MasterExercise
   */

  export type AggregateMasterExercise = {
    _count: MasterExerciseCountAggregateOutputType | null
    _min: MasterExerciseMinAggregateOutputType | null
    _max: MasterExerciseMaxAggregateOutputType | null
  }

  export type MasterExerciseMinAggregateOutputType = {
    id: string | null
    name: string | null
    category: string | null
    youtubeLink: string | null
  }

  export type MasterExerciseMaxAggregateOutputType = {
    id: string | null
    name: string | null
    category: string | null
    youtubeLink: string | null
  }

  export type MasterExerciseCountAggregateOutputType = {
    id: number
    name: number
    category: number
    tags: number
    youtubeLink: number
    _all: number
  }


  export type MasterExerciseMinAggregateInputType = {
    id?: true
    name?: true
    category?: true
    youtubeLink?: true
  }

  export type MasterExerciseMaxAggregateInputType = {
    id?: true
    name?: true
    category?: true
    youtubeLink?: true
  }

  export type MasterExerciseCountAggregateInputType = {
    id?: true
    name?: true
    category?: true
    tags?: true
    youtubeLink?: true
    _all?: true
  }

  export type MasterExerciseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MasterExercise to aggregate.
     */
    where?: MasterExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MasterExercises to fetch.
     */
    orderBy?: MasterExerciseOrderByWithRelationInput | MasterExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MasterExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MasterExercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MasterExercises.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MasterExercises
    **/
    _count?: true | MasterExerciseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MasterExerciseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MasterExerciseMaxAggregateInputType
  }

  export type GetMasterExerciseAggregateType<T extends MasterExerciseAggregateArgs> = {
        [P in keyof T & keyof AggregateMasterExercise]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMasterExercise[P]>
      : GetScalarType<T[P], AggregateMasterExercise[P]>
  }




  export type MasterExerciseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MasterExerciseWhereInput
    orderBy?: MasterExerciseOrderByWithAggregationInput | MasterExerciseOrderByWithAggregationInput[]
    by: MasterExerciseScalarFieldEnum[] | MasterExerciseScalarFieldEnum
    having?: MasterExerciseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MasterExerciseCountAggregateInputType | true
    _min?: MasterExerciseMinAggregateInputType
    _max?: MasterExerciseMaxAggregateInputType
  }

  export type MasterExerciseGroupByOutputType = {
    id: string
    name: string
    category: string
    tags: string[]
    youtubeLink: string | null
    _count: MasterExerciseCountAggregateOutputType | null
    _min: MasterExerciseMinAggregateOutputType | null
    _max: MasterExerciseMaxAggregateOutputType | null
  }

  type GetMasterExerciseGroupByPayload<T extends MasterExerciseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MasterExerciseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MasterExerciseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MasterExerciseGroupByOutputType[P]>
            : GetScalarType<T[P], MasterExerciseGroupByOutputType[P]>
        }
      >
    >


  export type MasterExerciseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category?: boolean
    tags?: boolean
    youtubeLink?: boolean
  }, ExtArgs["result"]["masterExercise"]>

  export type MasterExerciseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category?: boolean
    tags?: boolean
    youtubeLink?: boolean
  }, ExtArgs["result"]["masterExercise"]>

  export type MasterExerciseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category?: boolean
    tags?: boolean
    youtubeLink?: boolean
  }, ExtArgs["result"]["masterExercise"]>

  export type MasterExerciseSelectScalar = {
    id?: boolean
    name?: boolean
    category?: boolean
    tags?: boolean
    youtubeLink?: boolean
  }

  export type MasterExerciseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "category" | "tags" | "youtubeLink", ExtArgs["result"]["masterExercise"]>

  export type $MasterExercisePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MasterExercise"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      category: string
      tags: string[]
      youtubeLink: string | null
    }, ExtArgs["result"]["masterExercise"]>
    composites: {}
  }

  type MasterExerciseGetPayload<S extends boolean | null | undefined | MasterExerciseDefaultArgs> = $Result.GetResult<Prisma.$MasterExercisePayload, S>

  type MasterExerciseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MasterExerciseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MasterExerciseCountAggregateInputType | true
    }

  export interface MasterExerciseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MasterExercise'], meta: { name: 'MasterExercise' } }
    /**
     * Find zero or one MasterExercise that matches the filter.
     * @param {MasterExerciseFindUniqueArgs} args - Arguments to find a MasterExercise
     * @example
     * // Get one MasterExercise
     * const masterExercise = await prisma.masterExercise.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MasterExerciseFindUniqueArgs>(args: SelectSubset<T, MasterExerciseFindUniqueArgs<ExtArgs>>): Prisma__MasterExerciseClient<$Result.GetResult<Prisma.$MasterExercisePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MasterExercise that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MasterExerciseFindUniqueOrThrowArgs} args - Arguments to find a MasterExercise
     * @example
     * // Get one MasterExercise
     * const masterExercise = await prisma.masterExercise.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MasterExerciseFindUniqueOrThrowArgs>(args: SelectSubset<T, MasterExerciseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MasterExerciseClient<$Result.GetResult<Prisma.$MasterExercisePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MasterExercise that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterExerciseFindFirstArgs} args - Arguments to find a MasterExercise
     * @example
     * // Get one MasterExercise
     * const masterExercise = await prisma.masterExercise.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MasterExerciseFindFirstArgs>(args?: SelectSubset<T, MasterExerciseFindFirstArgs<ExtArgs>>): Prisma__MasterExerciseClient<$Result.GetResult<Prisma.$MasterExercisePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MasterExercise that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterExerciseFindFirstOrThrowArgs} args - Arguments to find a MasterExercise
     * @example
     * // Get one MasterExercise
     * const masterExercise = await prisma.masterExercise.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MasterExerciseFindFirstOrThrowArgs>(args?: SelectSubset<T, MasterExerciseFindFirstOrThrowArgs<ExtArgs>>): Prisma__MasterExerciseClient<$Result.GetResult<Prisma.$MasterExercisePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MasterExercises that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterExerciseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MasterExercises
     * const masterExercises = await prisma.masterExercise.findMany()
     * 
     * // Get first 10 MasterExercises
     * const masterExercises = await prisma.masterExercise.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const masterExerciseWithIdOnly = await prisma.masterExercise.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MasterExerciseFindManyArgs>(args?: SelectSubset<T, MasterExerciseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MasterExercisePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MasterExercise.
     * @param {MasterExerciseCreateArgs} args - Arguments to create a MasterExercise.
     * @example
     * // Create one MasterExercise
     * const MasterExercise = await prisma.masterExercise.create({
     *   data: {
     *     // ... data to create a MasterExercise
     *   }
     * })
     * 
     */
    create<T extends MasterExerciseCreateArgs>(args: SelectSubset<T, MasterExerciseCreateArgs<ExtArgs>>): Prisma__MasterExerciseClient<$Result.GetResult<Prisma.$MasterExercisePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MasterExercises.
     * @param {MasterExerciseCreateManyArgs} args - Arguments to create many MasterExercises.
     * @example
     * // Create many MasterExercises
     * const masterExercise = await prisma.masterExercise.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MasterExerciseCreateManyArgs>(args?: SelectSubset<T, MasterExerciseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MasterExercises and returns the data saved in the database.
     * @param {MasterExerciseCreateManyAndReturnArgs} args - Arguments to create many MasterExercises.
     * @example
     * // Create many MasterExercises
     * const masterExercise = await prisma.masterExercise.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MasterExercises and only return the `id`
     * const masterExerciseWithIdOnly = await prisma.masterExercise.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MasterExerciseCreateManyAndReturnArgs>(args?: SelectSubset<T, MasterExerciseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MasterExercisePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MasterExercise.
     * @param {MasterExerciseDeleteArgs} args - Arguments to delete one MasterExercise.
     * @example
     * // Delete one MasterExercise
     * const MasterExercise = await prisma.masterExercise.delete({
     *   where: {
     *     // ... filter to delete one MasterExercise
     *   }
     * })
     * 
     */
    delete<T extends MasterExerciseDeleteArgs>(args: SelectSubset<T, MasterExerciseDeleteArgs<ExtArgs>>): Prisma__MasterExerciseClient<$Result.GetResult<Prisma.$MasterExercisePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MasterExercise.
     * @param {MasterExerciseUpdateArgs} args - Arguments to update one MasterExercise.
     * @example
     * // Update one MasterExercise
     * const masterExercise = await prisma.masterExercise.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MasterExerciseUpdateArgs>(args: SelectSubset<T, MasterExerciseUpdateArgs<ExtArgs>>): Prisma__MasterExerciseClient<$Result.GetResult<Prisma.$MasterExercisePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MasterExercises.
     * @param {MasterExerciseDeleteManyArgs} args - Arguments to filter MasterExercises to delete.
     * @example
     * // Delete a few MasterExercises
     * const { count } = await prisma.masterExercise.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MasterExerciseDeleteManyArgs>(args?: SelectSubset<T, MasterExerciseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MasterExercises.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterExerciseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MasterExercises
     * const masterExercise = await prisma.masterExercise.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MasterExerciseUpdateManyArgs>(args: SelectSubset<T, MasterExerciseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MasterExercises and returns the data updated in the database.
     * @param {MasterExerciseUpdateManyAndReturnArgs} args - Arguments to update many MasterExercises.
     * @example
     * // Update many MasterExercises
     * const masterExercise = await prisma.masterExercise.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MasterExercises and only return the `id`
     * const masterExerciseWithIdOnly = await prisma.masterExercise.updateManyAndReturn({
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
    updateManyAndReturn<T extends MasterExerciseUpdateManyAndReturnArgs>(args: SelectSubset<T, MasterExerciseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MasterExercisePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MasterExercise.
     * @param {MasterExerciseUpsertArgs} args - Arguments to update or create a MasterExercise.
     * @example
     * // Update or create a MasterExercise
     * const masterExercise = await prisma.masterExercise.upsert({
     *   create: {
     *     // ... data to create a MasterExercise
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MasterExercise we want to update
     *   }
     * })
     */
    upsert<T extends MasterExerciseUpsertArgs>(args: SelectSubset<T, MasterExerciseUpsertArgs<ExtArgs>>): Prisma__MasterExerciseClient<$Result.GetResult<Prisma.$MasterExercisePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MasterExercises.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterExerciseCountArgs} args - Arguments to filter MasterExercises to count.
     * @example
     * // Count the number of MasterExercises
     * const count = await prisma.masterExercise.count({
     *   where: {
     *     // ... the filter for the MasterExercises we want to count
     *   }
     * })
    **/
    count<T extends MasterExerciseCountArgs>(
      args?: Subset<T, MasterExerciseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MasterExerciseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MasterExercise.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterExerciseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MasterExerciseAggregateArgs>(args: Subset<T, MasterExerciseAggregateArgs>): Prisma.PrismaPromise<GetMasterExerciseAggregateType<T>>

    /**
     * Group by MasterExercise.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterExerciseGroupByArgs} args - Group by arguments.
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
      T extends MasterExerciseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MasterExerciseGroupByArgs['orderBy'] }
        : { orderBy?: MasterExerciseGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MasterExerciseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMasterExerciseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MasterExercise model
   */
  readonly fields: MasterExerciseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MasterExercise.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MasterExerciseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the MasterExercise model
   */
  interface MasterExerciseFieldRefs {
    readonly id: FieldRef<"MasterExercise", 'String'>
    readonly name: FieldRef<"MasterExercise", 'String'>
    readonly category: FieldRef<"MasterExercise", 'String'>
    readonly tags: FieldRef<"MasterExercise", 'String[]'>
    readonly youtubeLink: FieldRef<"MasterExercise", 'String'>
  }
    

  // Custom InputTypes
  /**
   * MasterExercise findUnique
   */
  export type MasterExerciseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterExercise
     */
    select?: MasterExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasterExercise
     */
    omit?: MasterExerciseOmit<ExtArgs> | null
    /**
     * Filter, which MasterExercise to fetch.
     */
    where: MasterExerciseWhereUniqueInput
  }

  /**
   * MasterExercise findUniqueOrThrow
   */
  export type MasterExerciseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterExercise
     */
    select?: MasterExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasterExercise
     */
    omit?: MasterExerciseOmit<ExtArgs> | null
    /**
     * Filter, which MasterExercise to fetch.
     */
    where: MasterExerciseWhereUniqueInput
  }

  /**
   * MasterExercise findFirst
   */
  export type MasterExerciseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterExercise
     */
    select?: MasterExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasterExercise
     */
    omit?: MasterExerciseOmit<ExtArgs> | null
    /**
     * Filter, which MasterExercise to fetch.
     */
    where?: MasterExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MasterExercises to fetch.
     */
    orderBy?: MasterExerciseOrderByWithRelationInput | MasterExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MasterExercises.
     */
    cursor?: MasterExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MasterExercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MasterExercises.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MasterExercises.
     */
    distinct?: MasterExerciseScalarFieldEnum | MasterExerciseScalarFieldEnum[]
  }

  /**
   * MasterExercise findFirstOrThrow
   */
  export type MasterExerciseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterExercise
     */
    select?: MasterExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasterExercise
     */
    omit?: MasterExerciseOmit<ExtArgs> | null
    /**
     * Filter, which MasterExercise to fetch.
     */
    where?: MasterExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MasterExercises to fetch.
     */
    orderBy?: MasterExerciseOrderByWithRelationInput | MasterExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MasterExercises.
     */
    cursor?: MasterExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MasterExercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MasterExercises.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MasterExercises.
     */
    distinct?: MasterExerciseScalarFieldEnum | MasterExerciseScalarFieldEnum[]
  }

  /**
   * MasterExercise findMany
   */
  export type MasterExerciseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterExercise
     */
    select?: MasterExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasterExercise
     */
    omit?: MasterExerciseOmit<ExtArgs> | null
    /**
     * Filter, which MasterExercises to fetch.
     */
    where?: MasterExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MasterExercises to fetch.
     */
    orderBy?: MasterExerciseOrderByWithRelationInput | MasterExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MasterExercises.
     */
    cursor?: MasterExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MasterExercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MasterExercises.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MasterExercises.
     */
    distinct?: MasterExerciseScalarFieldEnum | MasterExerciseScalarFieldEnum[]
  }

  /**
   * MasterExercise create
   */
  export type MasterExerciseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterExercise
     */
    select?: MasterExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasterExercise
     */
    omit?: MasterExerciseOmit<ExtArgs> | null
    /**
     * The data needed to create a MasterExercise.
     */
    data: XOR<MasterExerciseCreateInput, MasterExerciseUncheckedCreateInput>
  }

  /**
   * MasterExercise createMany
   */
  export type MasterExerciseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MasterExercises.
     */
    data: MasterExerciseCreateManyInput | MasterExerciseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MasterExercise createManyAndReturn
   */
  export type MasterExerciseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterExercise
     */
    select?: MasterExerciseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MasterExercise
     */
    omit?: MasterExerciseOmit<ExtArgs> | null
    /**
     * The data used to create many MasterExercises.
     */
    data: MasterExerciseCreateManyInput | MasterExerciseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MasterExercise update
   */
  export type MasterExerciseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterExercise
     */
    select?: MasterExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasterExercise
     */
    omit?: MasterExerciseOmit<ExtArgs> | null
    /**
     * The data needed to update a MasterExercise.
     */
    data: XOR<MasterExerciseUpdateInput, MasterExerciseUncheckedUpdateInput>
    /**
     * Choose, which MasterExercise to update.
     */
    where: MasterExerciseWhereUniqueInput
  }

  /**
   * MasterExercise updateMany
   */
  export type MasterExerciseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MasterExercises.
     */
    data: XOR<MasterExerciseUpdateManyMutationInput, MasterExerciseUncheckedUpdateManyInput>
    /**
     * Filter which MasterExercises to update
     */
    where?: MasterExerciseWhereInput
    /**
     * Limit how many MasterExercises to update.
     */
    limit?: number
  }

  /**
   * MasterExercise updateManyAndReturn
   */
  export type MasterExerciseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterExercise
     */
    select?: MasterExerciseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MasterExercise
     */
    omit?: MasterExerciseOmit<ExtArgs> | null
    /**
     * The data used to update MasterExercises.
     */
    data: XOR<MasterExerciseUpdateManyMutationInput, MasterExerciseUncheckedUpdateManyInput>
    /**
     * Filter which MasterExercises to update
     */
    where?: MasterExerciseWhereInput
    /**
     * Limit how many MasterExercises to update.
     */
    limit?: number
  }

  /**
   * MasterExercise upsert
   */
  export type MasterExerciseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterExercise
     */
    select?: MasterExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasterExercise
     */
    omit?: MasterExerciseOmit<ExtArgs> | null
    /**
     * The filter to search for the MasterExercise to update in case it exists.
     */
    where: MasterExerciseWhereUniqueInput
    /**
     * In case the MasterExercise found by the `where` argument doesn't exist, create a new MasterExercise with this data.
     */
    create: XOR<MasterExerciseCreateInput, MasterExerciseUncheckedCreateInput>
    /**
     * In case the MasterExercise was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MasterExerciseUpdateInput, MasterExerciseUncheckedUpdateInput>
  }

  /**
   * MasterExercise delete
   */
  export type MasterExerciseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterExercise
     */
    select?: MasterExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasterExercise
     */
    omit?: MasterExerciseOmit<ExtArgs> | null
    /**
     * Filter which MasterExercise to delete.
     */
    where: MasterExerciseWhereUniqueInput
  }

  /**
   * MasterExercise deleteMany
   */
  export type MasterExerciseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MasterExercises to delete
     */
    where?: MasterExerciseWhereInput
    /**
     * Limit how many MasterExercises to delete.
     */
    limit?: number
  }

  /**
   * MasterExercise without action
   */
  export type MasterExerciseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterExercise
     */
    select?: MasterExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasterExercise
     */
    omit?: MasterExerciseOmit<ExtArgs> | null
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


  export const MasterFoodScalarFieldEnum: {
    id: 'id',
    name: 'name',
    baseServingSize: 'baseServingSize',
    baseCalories: 'baseCalories',
    baseProtein: 'baseProtein',
    baseCarbs: 'baseCarbs',
    baseFat: 'baseFat',
    status: 'status'
  };

  export type MasterFoodScalarFieldEnum = (typeof MasterFoodScalarFieldEnum)[keyof typeof MasterFoodScalarFieldEnum]


  export const MasterExerciseScalarFieldEnum: {
    id: 'id',
    name: 'name',
    category: 'category',
    tags: 'tags',
    youtubeLink: 'youtubeLink'
  };

  export type MasterExerciseScalarFieldEnum = (typeof MasterExerciseScalarFieldEnum)[keyof typeof MasterExerciseScalarFieldEnum]


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


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


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
   * Reference to a field of type 'FoodStatus'
   */
  export type EnumFoodStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FoodStatus'>
    


  /**
   * Reference to a field of type 'FoodStatus[]'
   */
  export type ListEnumFoodStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FoodStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type MasterFoodWhereInput = {
    AND?: MasterFoodWhereInput | MasterFoodWhereInput[]
    OR?: MasterFoodWhereInput[]
    NOT?: MasterFoodWhereInput | MasterFoodWhereInput[]
    id?: StringFilter<"MasterFood"> | string
    name?: StringFilter<"MasterFood"> | string
    baseServingSize?: FloatFilter<"MasterFood"> | number
    baseCalories?: FloatFilter<"MasterFood"> | number
    baseProtein?: FloatFilter<"MasterFood"> | number
    baseCarbs?: FloatFilter<"MasterFood"> | number
    baseFat?: FloatFilter<"MasterFood"> | number
    status?: EnumFoodStatusFilter<"MasterFood"> | $Enums.FoodStatus
  }

  export type MasterFoodOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    baseServingSize?: SortOrder
    baseCalories?: SortOrder
    baseProtein?: SortOrder
    baseCarbs?: SortOrder
    baseFat?: SortOrder
    status?: SortOrder
  }

  export type MasterFoodWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MasterFoodWhereInput | MasterFoodWhereInput[]
    OR?: MasterFoodWhereInput[]
    NOT?: MasterFoodWhereInput | MasterFoodWhereInput[]
    name?: StringFilter<"MasterFood"> | string
    baseServingSize?: FloatFilter<"MasterFood"> | number
    baseCalories?: FloatFilter<"MasterFood"> | number
    baseProtein?: FloatFilter<"MasterFood"> | number
    baseCarbs?: FloatFilter<"MasterFood"> | number
    baseFat?: FloatFilter<"MasterFood"> | number
    status?: EnumFoodStatusFilter<"MasterFood"> | $Enums.FoodStatus
  }, "id">

  export type MasterFoodOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    baseServingSize?: SortOrder
    baseCalories?: SortOrder
    baseProtein?: SortOrder
    baseCarbs?: SortOrder
    baseFat?: SortOrder
    status?: SortOrder
    _count?: MasterFoodCountOrderByAggregateInput
    _avg?: MasterFoodAvgOrderByAggregateInput
    _max?: MasterFoodMaxOrderByAggregateInput
    _min?: MasterFoodMinOrderByAggregateInput
    _sum?: MasterFoodSumOrderByAggregateInput
  }

  export type MasterFoodScalarWhereWithAggregatesInput = {
    AND?: MasterFoodScalarWhereWithAggregatesInput | MasterFoodScalarWhereWithAggregatesInput[]
    OR?: MasterFoodScalarWhereWithAggregatesInput[]
    NOT?: MasterFoodScalarWhereWithAggregatesInput | MasterFoodScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MasterFood"> | string
    name?: StringWithAggregatesFilter<"MasterFood"> | string
    baseServingSize?: FloatWithAggregatesFilter<"MasterFood"> | number
    baseCalories?: FloatWithAggregatesFilter<"MasterFood"> | number
    baseProtein?: FloatWithAggregatesFilter<"MasterFood"> | number
    baseCarbs?: FloatWithAggregatesFilter<"MasterFood"> | number
    baseFat?: FloatWithAggregatesFilter<"MasterFood"> | number
    status?: EnumFoodStatusWithAggregatesFilter<"MasterFood"> | $Enums.FoodStatus
  }

  export type MasterExerciseWhereInput = {
    AND?: MasterExerciseWhereInput | MasterExerciseWhereInput[]
    OR?: MasterExerciseWhereInput[]
    NOT?: MasterExerciseWhereInput | MasterExerciseWhereInput[]
    id?: StringFilter<"MasterExercise"> | string
    name?: StringFilter<"MasterExercise"> | string
    category?: StringFilter<"MasterExercise"> | string
    tags?: StringNullableListFilter<"MasterExercise">
    youtubeLink?: StringNullableFilter<"MasterExercise"> | string | null
  }

  export type MasterExerciseOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    tags?: SortOrder
    youtubeLink?: SortOrderInput | SortOrder
  }

  export type MasterExerciseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MasterExerciseWhereInput | MasterExerciseWhereInput[]
    OR?: MasterExerciseWhereInput[]
    NOT?: MasterExerciseWhereInput | MasterExerciseWhereInput[]
    name?: StringFilter<"MasterExercise"> | string
    category?: StringFilter<"MasterExercise"> | string
    tags?: StringNullableListFilter<"MasterExercise">
    youtubeLink?: StringNullableFilter<"MasterExercise"> | string | null
  }, "id">

  export type MasterExerciseOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    tags?: SortOrder
    youtubeLink?: SortOrderInput | SortOrder
    _count?: MasterExerciseCountOrderByAggregateInput
    _max?: MasterExerciseMaxOrderByAggregateInput
    _min?: MasterExerciseMinOrderByAggregateInput
  }

  export type MasterExerciseScalarWhereWithAggregatesInput = {
    AND?: MasterExerciseScalarWhereWithAggregatesInput | MasterExerciseScalarWhereWithAggregatesInput[]
    OR?: MasterExerciseScalarWhereWithAggregatesInput[]
    NOT?: MasterExerciseScalarWhereWithAggregatesInput | MasterExerciseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MasterExercise"> | string
    name?: StringWithAggregatesFilter<"MasterExercise"> | string
    category?: StringWithAggregatesFilter<"MasterExercise"> | string
    tags?: StringNullableListFilter<"MasterExercise">
    youtubeLink?: StringNullableWithAggregatesFilter<"MasterExercise"> | string | null
  }

  export type MasterFoodCreateInput = {
    id?: string
    name: string
    baseServingSize: number
    baseCalories: number
    baseProtein: number
    baseCarbs: number
    baseFat: number
    status?: $Enums.FoodStatus
  }

  export type MasterFoodUncheckedCreateInput = {
    id?: string
    name: string
    baseServingSize: number
    baseCalories: number
    baseProtein: number
    baseCarbs: number
    baseFat: number
    status?: $Enums.FoodStatus
  }

  export type MasterFoodUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    baseServingSize?: FloatFieldUpdateOperationsInput | number
    baseCalories?: FloatFieldUpdateOperationsInput | number
    baseProtein?: FloatFieldUpdateOperationsInput | number
    baseCarbs?: FloatFieldUpdateOperationsInput | number
    baseFat?: FloatFieldUpdateOperationsInput | number
    status?: EnumFoodStatusFieldUpdateOperationsInput | $Enums.FoodStatus
  }

  export type MasterFoodUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    baseServingSize?: FloatFieldUpdateOperationsInput | number
    baseCalories?: FloatFieldUpdateOperationsInput | number
    baseProtein?: FloatFieldUpdateOperationsInput | number
    baseCarbs?: FloatFieldUpdateOperationsInput | number
    baseFat?: FloatFieldUpdateOperationsInput | number
    status?: EnumFoodStatusFieldUpdateOperationsInput | $Enums.FoodStatus
  }

  export type MasterFoodCreateManyInput = {
    id?: string
    name: string
    baseServingSize: number
    baseCalories: number
    baseProtein: number
    baseCarbs: number
    baseFat: number
    status?: $Enums.FoodStatus
  }

  export type MasterFoodUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    baseServingSize?: FloatFieldUpdateOperationsInput | number
    baseCalories?: FloatFieldUpdateOperationsInput | number
    baseProtein?: FloatFieldUpdateOperationsInput | number
    baseCarbs?: FloatFieldUpdateOperationsInput | number
    baseFat?: FloatFieldUpdateOperationsInput | number
    status?: EnumFoodStatusFieldUpdateOperationsInput | $Enums.FoodStatus
  }

  export type MasterFoodUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    baseServingSize?: FloatFieldUpdateOperationsInput | number
    baseCalories?: FloatFieldUpdateOperationsInput | number
    baseProtein?: FloatFieldUpdateOperationsInput | number
    baseCarbs?: FloatFieldUpdateOperationsInput | number
    baseFat?: FloatFieldUpdateOperationsInput | number
    status?: EnumFoodStatusFieldUpdateOperationsInput | $Enums.FoodStatus
  }

  export type MasterExerciseCreateInput = {
    id?: string
    name: string
    category: string
    tags?: MasterExerciseCreatetagsInput | string[]
    youtubeLink?: string | null
  }

  export type MasterExerciseUncheckedCreateInput = {
    id?: string
    name: string
    category: string
    tags?: MasterExerciseCreatetagsInput | string[]
    youtubeLink?: string | null
  }

  export type MasterExerciseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    tags?: MasterExerciseUpdatetagsInput | string[]
    youtubeLink?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MasterExerciseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    tags?: MasterExerciseUpdatetagsInput | string[]
    youtubeLink?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MasterExerciseCreateManyInput = {
    id?: string
    name: string
    category: string
    tags?: MasterExerciseCreatetagsInput | string[]
    youtubeLink?: string | null
  }

  export type MasterExerciseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    tags?: MasterExerciseUpdatetagsInput | string[]
    youtubeLink?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MasterExerciseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    tags?: MasterExerciseUpdatetagsInput | string[]
    youtubeLink?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type EnumFoodStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.FoodStatus | EnumFoodStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FoodStatus[] | ListEnumFoodStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FoodStatus[] | ListEnumFoodStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFoodStatusFilter<$PrismaModel> | $Enums.FoodStatus
  }

  export type MasterFoodCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    baseServingSize?: SortOrder
    baseCalories?: SortOrder
    baseProtein?: SortOrder
    baseCarbs?: SortOrder
    baseFat?: SortOrder
    status?: SortOrder
  }

  export type MasterFoodAvgOrderByAggregateInput = {
    baseServingSize?: SortOrder
    baseCalories?: SortOrder
    baseProtein?: SortOrder
    baseCarbs?: SortOrder
    baseFat?: SortOrder
  }

  export type MasterFoodMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    baseServingSize?: SortOrder
    baseCalories?: SortOrder
    baseProtein?: SortOrder
    baseCarbs?: SortOrder
    baseFat?: SortOrder
    status?: SortOrder
  }

  export type MasterFoodMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    baseServingSize?: SortOrder
    baseCalories?: SortOrder
    baseProtein?: SortOrder
    baseCarbs?: SortOrder
    baseFat?: SortOrder
    status?: SortOrder
  }

  export type MasterFoodSumOrderByAggregateInput = {
    baseServingSize?: SortOrder
    baseCalories?: SortOrder
    baseProtein?: SortOrder
    baseCarbs?: SortOrder
    baseFat?: SortOrder
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

  export type EnumFoodStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FoodStatus | EnumFoodStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FoodStatus[] | ListEnumFoodStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FoodStatus[] | ListEnumFoodStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFoodStatusWithAggregatesFilter<$PrismaModel> | $Enums.FoodStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFoodStatusFilter<$PrismaModel>
    _max?: NestedEnumFoodStatusFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MasterExerciseCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    tags?: SortOrder
    youtubeLink?: SortOrder
  }

  export type MasterExerciseMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    youtubeLink?: SortOrder
  }

  export type MasterExerciseMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    youtubeLink?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
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

  export type EnumFoodStatusFieldUpdateOperationsInput = {
    set?: $Enums.FoodStatus
  }

  export type MasterExerciseCreatetagsInput = {
    set: string[]
  }

  export type MasterExerciseUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
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

  export type NestedEnumFoodStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.FoodStatus | EnumFoodStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FoodStatus[] | ListEnumFoodStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FoodStatus[] | ListEnumFoodStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFoodStatusFilter<$PrismaModel> | $Enums.FoodStatus
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

  export type NestedEnumFoodStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FoodStatus | EnumFoodStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FoodStatus[] | ListEnumFoodStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FoodStatus[] | ListEnumFoodStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFoodStatusWithAggregatesFilter<$PrismaModel> | $Enums.FoodStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFoodStatusFilter<$PrismaModel>
    _max?: NestedEnumFoodStatusFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
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