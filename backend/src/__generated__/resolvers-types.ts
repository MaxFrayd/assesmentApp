import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Address = {
  __typename?: 'Address';
  addition?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  houseNumber?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  street?: Maybe<Scalars['String']>;
};

export type Empty = {
  __typename?: 'Empty';
  _?: Maybe<Scalars['String']>;
};

export type HumanName = {
  __typename?: 'HumanName';
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  lastName?: Maybe<Scalars['String']>;
  middleNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  title?: Maybe<Scalars['String']>;
};

export type Patient = {
  __typename?: 'Patient';
  address?: Maybe<Address>;
  dateOfBirth?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<HumanName>;
};

export type Query = {
  __typename?: 'Query';
  listPatients?: Maybe<Array<Maybe<Patient>>>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Address: ResolverTypeWrapper<Address>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Empty: ResolverTypeWrapper<Empty>;
  HumanName: ResolverTypeWrapper<HumanName>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Patient: ResolverTypeWrapper<Patient>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Address: Address;
  Boolean: Scalars['Boolean'];
  Date: Scalars['Date'];
  Empty: Empty;
  HumanName: HumanName;
  ID: Scalars['ID'];
  Patient: Patient;
  Query: {};
  String: Scalars['String'];
}>;

export type AddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = ResolversObject<{
  addition?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  houseNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  street?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type EmptyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Empty'] = ResolversParentTypes['Empty']> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type HumanNameResolvers<ContextType = any, ParentType extends ResolversParentTypes['HumanName'] = ResolversParentTypes['HumanName']> = ResolversObject<{
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  middleNames?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PatientResolvers<ContextType = any, ParentType extends ResolversParentTypes['Patient'] = ResolversParentTypes['Patient']> = ResolversObject<{
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  dateOfBirth?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['HumanName']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  listPatients?: Resolver<Maybe<Array<Maybe<ResolversTypes['Patient']>>>, ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Address?: AddressResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Empty?: EmptyResolvers<ContextType>;
  HumanName?: HumanNameResolvers<ContextType>;
  Patient?: PatientResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;

