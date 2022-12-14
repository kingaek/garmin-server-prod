(()=>{var e={634:(e,t,r)=>{const{gql:i}=r(222),a=i`
  scalar Date

  enum Sort {
    asc
    desc
  }

  input productFilter {
    take: Int
    gender: Gender
    price: Sort
    date: Sort
  }

  type Query {
    banners: [Banner!]!
    featureds: [Featured!]!
    pods: [Pod!]!
    categories(hasSeries: Boolean!, hasCoverImgsList: Boolean!): [Category!]!
    category(
      id: String!
      serieId: String
      hasProducts: Boolean!
      hasSeries: Boolean!
    ): Category!
    products(
      filter: productFilter
      search: String
      categoryId: String
      serieId: String
    ): [Product!]!
    productsByCategory(categoryId: String, serieId: String): [Product!]!
    product(id: String!): Product!
    serie(id: String!, hasProducts: Boolean!): Serie!
    cart(cartId: String): Cart
    fetchUserSession: AuthSession!
    initialCart(cartId: String!): Cart
    cartItemsCount(cartId: String!): Count!
  }

  type Mutation {
    login(username: String!): AuthSession!
    refreshToken: AuthSession!
    logout: LogoutSession
    addItemToCart(cartId: String, item: CartItemInput, price: Float!): Cart
    fetchOrcreateCart: Cart!
    updateCart(cartId: String!, item: ItemInput!): Cart!
    deletecartItem(itemId: String!): DeleteItemCart!
    signup(username: String!): AuthSession!
  }

  # type Subscription {}

  type DeleteItemCart {
    quantity: Int!
  }

  input ItemInput {
    itemId: String!
    price: Float!
    quantity: Int!
  }

  type CartWithMessage {
    message: String
    cart: Cart!
  }

  type Count {
    count: Int!
  }

  type AuthSession {
    user: Customer
    totalQuantity: Int!
    refresh_token: String
    expires_in: String
  }

  type LogoutSession {
    message: String
  }

  enum Gender {
    Male
    Female
    None
  }

  type Banner {
    id: ID!
    imgM: String
    imgT: String
    imgD: String
    title: String!
    subtitle: String!
    createdAt: Date!
  }

  type Featured {
    id: ID!
    img: String!
    title: String!
    subtitle: String!
    new: Boolean!
    sale: Boolean!
    createdAt: Date!
  }

  type Pod {
    id: ID!
    img: String!
    title: String!
    createdAt: Date!
  }

  type CoverImgList {
    id: ID!
    img: String!
    title: String!
    subtitle: String!
  }

  type Category {
    id: ID!
    name: String!
    displayName: String!
    img: String!
    title: String!
    coverImg: String!
    coverImgsList: [CoverImgList]
    series: [Serie]
  }

  type Serie {
    id: ID!
    name: String!
    products: [Product]
    categoryId: String
  }

  type ChosenFeature {
    id: ID!
    name: String!
    item: String!
  }

  type ProductFeature {
    id: ID!
    name: String!
    description: String
    items: [String!]!
  }

  type Model {
    id: ID!
    color: String!
    img: String!
  }

  type Product {
    id: ID!
    name: String!
    description: String
    subDescription: String
    subscriptionUrl: String
    partNumber: String!
    gender: Gender
    price: Float!
    formattedPrice: String!
    oldPrice: Float
    formattedOldPrice: String
    interestFree: Float
    formattedInterestFree: String
    imgList: [String!]!
    features: [ProductFeature]
    models: [Model]
    video: String
    sale: Boolean
    available: Boolean
    new: Boolean
    createdAt: Date!
    serieId: String
  }

  input CartItemInput {
    productId: String!
    modelId: String
    features: [ChosenFeatureInput]
  }

  input ChosenFeatureInput {
    name: String!
    item: String!
  }

  type CartItem {
    id: ID!
    product: Product!
    quantity: Int!
    model: Model
    features: [ChosenFeature]
    createdAt: Date!
  }

  type Cart {
    id: ID!
    subtotal: Float
    formattedSubtotal: String
    estimatedTotal: Float
    formattedEstimatedTotal: String
    expires: Date
    inSession: Boolean
    cartItems: [CartItem]
    createdAt: Date!
  }

  enum OrderStatus {
    PANDING
    SHIPPED
    CANCELED
    ARRIVED
    COMPLETED
  }

  type Order {
    id: String!
    status: OrderStatus!
    products: [CartItem!]!
    createdAt: Date!
  }

  enum Role {
    Admin
    # Guest
    Customer
  }

  interface User {
    id: ID!
    role: Role!
    createdAt: Date!
  }

  type Admin {
    id: ID!
    username: String!
    role: Role!
    isActive: Boolean!
    createdAt: Date!
  }

  type Customer {
    id: ID!
    username: String!
    role: Role!
    isActive: Boolean!
    cartId: String!
    cart: Cart!
    createdAt: Date!
  }

  # type Guest {
  #   id: ID!
  #   role: Role!
  #   cart: Cart
  #   createdAt: Date!
  # }
`;e.exports=a},222:e=>{"use strict";e.exports=require("apollo-server-core/dist/gql")}},t={};function r(i){var a=t[i];if(void 0!==a)return a.exports;var n=t[i]={exports:{}};return e[i](n,n.exports,r),n.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var i in t)r.o(t,i)&&!r.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";const e=require("apollo-server-express"),t=require("http"),i=require("express");var a=r.n(i);const n=require("cookie-parser");var s=r.n(n);const o=require("apollo-server-core"),u=require("@graphql-tools/schema"),d=require("ws"),c=require("graphql-ws/lib/use/ws"),l=require("@prisma/client"),p=require("graphql-subscriptions");var m=r(634),f=r.n(m);const I=require("jsonwebtoken");var g=r.n(I);const h="App-secret",w=7776e6;function S(e){try{return g().verify(e,h)}catch(e){console.log(e)}}function y(e){const t=g().sign(function(e){return{sub:e,iat:Date.now()}}(e),h,{expiresIn:w});return{refresh_token:t,expires_in:w}}async function v(e,t,r){if(t){const r=t.headers.authorization;if(r){const t=r.replace("Bearer ","");if(!t)return{userId:null,userRole:null};const i=S(t);if(!i.sub)return{userId:null,userRole:null};const{role:a,cartId:n}=await e.findUnique({where:{id:i.sub}});return{userId:i.sub,userRole:a,cartId:n,token:t}}}else if(r){const{userId:t}=S(r),i=await e.findUnique({where:{id:t}});return{userId:t,userRole:i.role,cartId:i.cartId,token}}return{userId:null,userRole:null}}const q=e=>{const t={product:{connect:{id:e.productId}}};return e.modelId&&(t.model={connect:{id:e.modelId}}),e.features&&(t.features={create:[...e.features]}),t},b={banners:function(e,t,{prisma:r}){return r.banner.findMany()},featureds:function(e,t,{prisma:r}){return r.featured.findMany()},pods:function(e,t,{prisma:r}){return r.pod.findMany()},categories:function(e,t,{prisma:r}){return r.category.findMany()},category:function(e,{id:t},{prisma:r}){return r.category.findUnique({where:{id:t}})},serie:function(e,{id:t},{prisma:r}){return r.serie.findUnique({where:{id:t}})},products:async function(e,{filter:t,search:r,categoryId:i,serieId:a},{prisma:n}){if(!(t||r||i||a))return n.product.findMany();const s=t?.price?{price:t?.price}:t?.date?{createdAt:t?.date}:{createdAt:"desc"};if(a){if(!(await n.serie.findMany({where:{AND:[{id:a},{categoryId:i}]}}))[0])throw new o.UserInputError(`${a} doesn't exist`);return n.product.findMany({take:t?.take,where:{AND:[{OR:[{name:{contains:r,mode:"insensitive"}},{description:{contains:r,mode:"insensitive"}},{subDescription:{contains:r,mode:"insensitive"}}]},{gender:t?.gender},{serieId:a}]},orderBy:s})}const u=(await n.serie.findMany({where:{categoryId:i},select:{id:!0}})).map((e=>({serieId:e.id})));return await n.product.findMany({take:t?.take,where:{AND:[{OR:u},{OR:[{name:{contains:r,mode:"insensitive"}},{description:{contains:r,mode:"insensitive"}},{subDescription:{contains:r,mode:"insensitive"}}]},{gender:t?.gender}]},orderBy:s})},productsByCategory:async function(e,{categoryId:t,serieId:r},{prisma:i,req:a}){if(r){if(!(await i.serie.findMany({where:{AND:[{id:r},{categoryId:t}]}}))[0])throw new o.UserInputError(`${r} doesn't exist`);return i.product.findMany({where:{serieId:r}})}const n=(await i.serie.findMany({where:{categoryId:t},select:{id:!0}})).map((e=>({serieId:e.id})));return await i.product.findMany({where:{OR:n}})},product:function(e,{id:t},{prisma:r}){return r.product.findUnique({where:{id:t}})},cart:async function(e,{cartId:t},{prisma:r,userId:i,cookies:a,cartId:n}){if(i){if(t!==n)throw new o.ForbiddenError("Forbidden Request");return await r.cart.findUnique({where:{id:t},include:{cartItems:!0}})}if(a?.cartId){if(a.cartId!==t)throw new o.ForbiddenError("Forbidden Request");return await r.cart.findUnique({where:{id:t},include:{cartItems:{include:{product:!0,model:!0,features:!0}}}})}throw new o.ForbiddenError("Forbidden Request")},fetchUserSession:async function(e,t,{prisma:r,userId:i,token:a}){if(!i)return{user:null,refresh_token:null,expires_in:null};const n=await r.user.findUnique({where:{id:i},include:{cart:{include:{cartItems:!0}}}});if(!n)throw new AuthenticationError("user doesn't authenticated");return{user:n,refresh_token:a,expires_in:S(a).exp}},initialCart:async function(e,{cartId:t},{prisma:r}){return await r.cart.findUnique({where:{id:t},include:{cartItems:!0}})},cartItemsCount:async function(e,{cartId:t},{prisma:r}){if(!t)return{count:0};const i=await r.cart.findUnique({where:{id:t},include:{cartItems:!0}});return{count:i?.cartItems.length>0?i.cartItems.reduce(((e,t)=>e+t.quantity),0):0}}},D=b,C=require("currency.js");var k=r.n(C);const U={login:async function(e,{username:t},{prisma:r,res:i,cookies:a}){const n=await r.user.findUnique({where:{username:t}});if(!n)throw new o.AuthenticationError(`${t} doesn't exist`);const{refresh_token:s,expires_in:u}=y(n.id);i.cookie("refresh_token",s,{httpOnly:!0,sameSite:"strict",secure:!0,maxAge:u});const d=await r.cart.findUnique({where:{id:n.cartId},include:{cartItems:!0}});let c=d.cartItems.reduce(((e,t)=>e+t.quantity),0);if(a?.cartId){const e=await r.cart.findUnique({where:{id:a.cartId},include:{cartItems:!0}}),t=e.cartItems?.map((e=>({id:e.id})));c+=e.cartItems.reduce(((e,t)=>e+t.quantity),0);const s=k()(e.subtotal).add(d.subtotal);await r.cart.update({where:{id:e.id},data:{cartItems:{disconnect:t}}}),await r.cart.update({where:{id:n.cartId},data:{subtotal:s.value,formattedSubtotal:`$${s.value} USD`,estimatedTotal:s.value,formattedEstimatedTotal:`$${s.value} USD`,cartItems:{connect:t}}}),await r.cart.delete({where:{id:e.id}}),i.clearCookie("cartId")}return{user:n,totalQuantity:c,refresh_token:s,expires_in:u}},refreshToken:async function(e,t,{prisma:r,userId:i,res:a}){if(!i)return{user:null,refresh_token:null,expires_in:null};const n=await r.user.findUnique({where:{id:i}});if(!n)throw new o.AuthenticationError("user doesn't authenticated");const{refresh_token:s,expires_in:u}=y(i);return a.cookie("refresh_token",s,{httpOnly:!0,sameSite:"strict",secure:!0,maxAge:u}),{user:n,refresh_token:s,expires_in:u}},logout:function(e,t,{res:r}){return r.clearCookie("refresh_token"),{message:"You have been successfully logged out"}},fetchOrcreateCart:async function(e,t,{prisma:r,userId:i,res:a,cookies:n,cartId:s}){const o=n?.cartId;if(i){const e=await r.cart.findUnique({where:{id:s}});if(!e)throw new UserInputError(`${user.name} with the id ${user.id} must has a cart`);return e}if(o){const e=await r.cart.findUnique({where:{id:o}});if(!e)throw new UserInputError(`${o} is wrong input`);return e}const u=await r.cart.create({data:{}});return a.cookie("cartId",u.id),u},addItemToCart:async function(e,{item:t,price:r},{prisma:i,userId:a,res:n,cookies:s,cartId:o}){const u=s?.cartId;if(!u&&!a){const e=await i.cart.create({data:{subtotal:r,formattedSubtotal:`$${r} USD`,estimatedTotal:r,formattedEstimatedTotal:`$${r} USD`,cartItems:{create:[q(t)]}}});return n.cookie("cartId",e.id),e}const d=await i.cart.findUnique({where:{id:o||u}}),c=k()(d.subtotal).add(k()(r));return i.cart.update({where:{id:o||u},data:{subtotal:c.value,formattedSubtotal:`$${c.value} USD`,estimatedTotal:c.value,formattedEstimatedTotal:`$${c.value} USD`,cartItems:{create:[q(t)]}}})},updateCart:async function(e,{cartId:t,item:r},{prisma:i,cookies:a,userId:n}){if(!n&&!a?.cartId)throw new o.ForbiddenError("Forbidden Request");const s=await i.cart.findUnique({where:{id:t},include:{cartItems:{include:{product:!0}}}});let u=s.cartItems.length>1?s.cartItems.filter((e=>e.id!==r.itemId)).reduce(((e,t)=>k()(e).add(k()(t.product.price).multiply(t.quantity))),0):{value:0};return u=k()(u.value).add(k()(r.price).multiply(r.quantity)),i.cart.update({where:{id:t},data:{subtotal:u.value,formattedSubtotal:`$${u.value} USD`,estimatedTotal:u.value,formattedEstimatedTotal:`$${u.value} USD`,cartItems:{update:{where:{id:r.itemId},data:{quantity:r.quantity}}}}})},deletecartItem:async function(e,{itemId:t},{prisma:r,cookies:i,cartId:a}){const n=await r.cartItem.delete({where:{id:t},include:{product:!0}}),s=await r.cart.findUnique({where:{id:a||i?.cartId}}),o=k()(n.product.price).multiply(n.quantity),u=k()(s.subtotal).subtract(o.value);return await r.cart.update({where:{id:s.id},data:{subtotal:u.value,formattedSubtotal:`$${u.value} USD`,estimatedTotal:u.value,formattedEstimatedTotal:`$${u.value} USD`}}),{quantity:n.quantity}},signup:async function(e,{username:t},{prisma:r,res:i,cookies:a}){const n=await r.user.create({data:{username:t,role:"Customer",cart:{create:{}}}}),{refresh_token:s,expires_in:o}=y(n.id);i.cookie("refresh_token",s,{httpOnly:!0,sameSite:"strict",secure:!0,maxAge:o});const u=await r.cart.findUnique({where:{id:n.cartId},include:{cartItems:!0}});let d=u.cartItems.reduce(((e,t)=>e+t.quantity),0);if(a?.cartId){const e=await r.cart.findUnique({where:{id:a.cartId},include:{cartItems:!0}}),t=e.cartItems?.map((e=>({id:e.id})));d+=e.cartItems.reduce(((e,t)=>e+t.quantity),0);const s=k()(e.subtotal).add(u.subtotal);await r.cart.update({where:{id:e.id},data:{cartItems:{disconnect:t}}}),await r.cart.update({where:{id:n.cartId},data:{subtotal:s.value,formattedSubtotal:`$${s.value} USD`,estimatedTotal:s.value,formattedEstimatedTotal:`$${s.value} USD`,cartItems:{connect:t}}}),await r.cart.delete({where:{id:e.id}}),i.clearCookie("cartId")}return{user:n,totalQuantity:d,refresh_token:s,expires_in:o}}},A={Query:D,Mutation:U,Product:{features:function({id:e},t,{prisma:r}){return r.product.findUnique({where:{id:e}}).features()},models:function({id:e},t,{prisma:r}){return r.product.findUnique({where:{id:e}}).models()}},Category:{series:async function({id:e},t,{prisma:r},{variableValues:i}){if(!1===i.hasSeries)return null;const a=await r.category.findUnique({where:{id:e}}).series();return i.serieId?a.filter((e=>e.id===i.serieId)):a},coverImgsList:async function({id:e},t,{prisma:r},{variableValues:i}){return!1===i.hasCoverImgsList?null:await r.category.findUnique({where:{id:e}}).coverImgsList()}},Serie:{products:function({id:e},t,{prisma:r},{variableValues:i}){return!1===i.hasProducts?null:r.serie.findUnique({where:{id:e}}).products()}},Cart:{cartItems:function({id:e},t,{prisma:r}){return r.cart.findUnique({where:{id:e}}).cartItems()}},CartItem:{product:function({id:e},t,{prisma:r}){return r.cartItem.findUnique({where:{id:e}}).product()},model:function({id:e},t,{prisma:r}){return r.cartItem.findUnique({where:{id:e}}).model()},features:function({id:e},t,{prisma:r}){return r.cartItem.findUnique({where:{id:e}}).features()}},Customer:{cart:function({id:e},t,{prisma:r}){return r.user.findUnique({where:{id:e}}).cart()}}},x=new l.PrismaClient,F=new p.PubSub;!async function(){const r=a()(),i=(0,t.createServer)(r);r.use(s()(h));const n=(0,u.makeExecutableSchema)({typeDefs:f(),resolvers:A}),l=new d.WebSocketServer({server:i,path:"/subscription"}),p=(0,c.useServer)({schema:n,context:async e=>{const t=await async function(e,t){const r=t.connectionParams.Authorization;if(!r)return null;const i=r.replace("Bearer ","");if(!i)throw new o.AuthenticationError("No token found");const{userId:a,userRole:n}=await v(e,void 0,i);return{userId:a,userRole:n}}({...x.user},e);return{userAuth:t,pubsub:F}}},l),m=new e.ApolloServer({schema:n,csrfPrevention:!0,cache:"bounded",introspection:!0,context:async({req:e,res:t})=>{const r=e&&e.headers.authorization&&await v(x.user,e);return{...e,res:t,prisma:x,pubsub:F,userId:r?r.userId:null,userRole:r?r.userRole:null,token:r?r.token:null,cartId:r?r.cartId:null}},plugins:[(0,o.ApolloServerPluginDrainHttpServer)({httpServer:i}),{serverWillStart:async()=>({async drainServer(){await p.dispose()}})}]});await m.start(),m.applyMiddleware({app:r,path:"/graphql",cors:{credentials:!0,origin:["http://localhost:3000","https://studio.apollographql.com","https://garmin-clone.netlify.app","https://62f8c9ae94aca554c7cf5d75--friendly-fox-a3e655.netlify.app/","garmin-clone-aekryz1993.vercel.app","garmin-clone-git-main-aekryz1993.vercel.app","garmin-clone.vercel.app","https://vercel.com/aekryz1993/garmin-clone/BYSrcaFv1R45F8EG9gCif37EyNg2","http://192.168.100.10:3000","https://garmin-clone.vercel.app/","https://garmin-clone-o48qfmlrx-aekryz1993.vercel.app/","https://garmin-clone.vercel.app/"]}}),await new Promise((e=>i.listen({port:process.env.PORT||4001},e)))}()})()})();