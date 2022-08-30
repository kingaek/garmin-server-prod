/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-express */ \"apollo-server-express\");\n/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! http */ \"http\");\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! cookie-parser */ \"cookie-parser\");\n/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(cookie_parser__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var apollo_server_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! apollo-server-core */ \"apollo-server-core\");\n/* harmony import */ var apollo_server_core__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(apollo_server_core__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _graphql_tools_schema__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @graphql-tools/schema */ \"@graphql-tools/schema\");\n/* harmony import */ var _graphql_tools_schema__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_graphql_tools_schema__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _resolvers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./resolvers */ \"./src/resolvers/index.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n\n\n\n\n\n\n\n\n// import { WebSocketServer } from \"ws\";\n// import { useServer } from \"graphql-ws/lib/use/ws\";\n\n// import { PubSub } from \"graphql-subscriptions\";\n\n\n\n\nconst typeDefs = fs__WEBPACK_IMPORTED_MODULE_3___default().readFileSync(\n  path__WEBPACK_IMPORTED_MODULE_4___default().join(__dirname, \"schema.graphql\"),\n  \"utf8\"\n);\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_8__.PrismaClient();\n// export const pubsub = new PubSub();\n\nasync function main() {\n  const app = express__WEBPACK_IMPORTED_MODULE_2___default()();\n  // app.enable(\"trust proxy\");\n  const httpServer = (0,http__WEBPACK_IMPORTED_MODULE_1__.createServer)(app);\n\n  app.use(cookie_parser__WEBPACK_IMPORTED_MODULE_5___default()(_utils__WEBPACK_IMPORTED_MODULE_10__.APP_SECRET));\n\n  const schema = (0,_graphql_tools_schema__WEBPACK_IMPORTED_MODULE_7__.makeExecutableSchema)({\n    typeDefs,\n    resolvers: _resolvers__WEBPACK_IMPORTED_MODULE_9__[\"default\"],\n  });\n\n  // const wsServer = new WebSocketServer({\n  //   server: httpServer,\n  //   path: \"/subscription\",\n  // });\n\n  // const serverCleanup = useServer(\n  //   {\n  //     schema,\n  //     context: async (ctx) => {\n  //       const userAuth = await getDynamicContext({ ...prisma.user }, ctx);\n\n  //       return {\n  //         userAuth,\n  //         // pubsub,\n  //       };\n  //     },\n  //   }\n  //   // wsServer\n  // );\n\n  const server = new apollo_server_express__WEBPACK_IMPORTED_MODULE_0__.ApolloServer({\n    schema,\n    csrfPrevention: true,\n    cache: \"bounded\",\n    context: async ({ req, res }) => {\n      const user =\n        req && req.headers.authorization && (await (0,_utils__WEBPACK_IMPORTED_MODULE_10__.getUserId)(prisma.user, req));\n\n      return {\n        ...req,\n        res,\n        prisma,\n        pubsub,\n        userId: user ? user.userId : null,\n        userRole: user ? user.userRole : null,\n        token: user ? user.token : null,\n        cartId: user ? user.cartId : null,\n      };\n    },\n    plugins: [\n      (0,apollo_server_core__WEBPACK_IMPORTED_MODULE_6__.ApolloServerPluginDrainHttpServer)({ httpServer }),\n      // {\n      //   async serverWillStart() {\n      //     return {\n      //       async drainServer() {\n      //         await serverCleanup.dispose();\n      //       },\n      //     };\n      //   },\n      // },\n    ],\n  });\n\n  await server.start();\n  server.applyMiddleware({\n    app,\n    path: \"/graphql\",\n    cors: {\n      credentials: true,\n      origin: [\n        \"http://localhost:3000\",\n        \"https://garmin-website.herokuapp.com\",\n        \"https://garmin-website2.herokuapp.com\",\n        \"https://garmin-clone.netlify.app\",\n        \"https://garmin-clone.herokuapp.com\",\n        \"http://192.168.100.10:3000\",\n        \"https://studio.apollographql.com\",\n        \"https://garmin-clone-frontend.herokuapp.com\",\n      ],\n    },\n  });\n\n  await new Promise((resolve) =>\n    httpServer.listen({ port: process.env.PORT || 4001 }, resolve)\n  );\n  console.log(\n    `🚀 Server ready at http://localhost:${process.env.PORT || 4001}${\n      server.graphqlPath\n    }`\n  );\n}\n\nmain();\n\n\n//# sourceURL=webpack://backend/./src/index.js?");

/***/ }),

/***/ "./src/resolvers/Cart.js":
/*!*******************************!*\
  !*** ./src/resolvers/Cart.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction cartItems({ id }, _, { prisma }) {\n  return prisma.cart.findUnique({ where: { id } }).cartItems();\n}\n\nconst Cart = {\n  cartItems,\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Cart);\n\n\n//# sourceURL=webpack://backend/./src/resolvers/Cart.js?");

/***/ }),

/***/ "./src/resolvers/CartItem.js":
/*!***********************************!*\
  !*** ./src/resolvers/CartItem.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction product({ id }, _, { prisma }) {\n  return prisma.cartItem.findUnique({ where: { id } }).product();\n}\n\nfunction model({ id }, _, { prisma }) {\n  return prisma.cartItem.findUnique({ where: { id } }).model();\n}\n\nfunction features({ id }, _, { prisma }) {\n  return prisma.cartItem.findUnique({ where: { id } }).features();\n}\n\nconst CartItem = {\n  product,\n  model,\n  features,\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CartItem);\n\n\n//# sourceURL=webpack://backend/./src/resolvers/CartItem.js?");

/***/ }),

/***/ "./src/resolvers/Category.js":
/*!***********************************!*\
  !*** ./src/resolvers/Category.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nasync function series({ id }, _, { prisma }, { variableValues }) {\n  if (variableValues.hasSeries === false) return null;\n  const series = await prisma.category\n    .findUnique({\n      where: { id },\n    })\n    .series();\n\n  if (!variableValues.serieId) return series;\n\n  const serie = series.filter((serie) => serie.id === variableValues.serieId);\n\n  return serie;\n}\n\nasync function coverImgsList({ id }, _, { prisma }, { variableValues }) {\n  if (variableValues.hasCoverImgsList === false) return null;\n  const coverImgsList = await prisma.category\n    .findUnique({\n      where: { id },\n    })\n    .coverImgsList();\n\n  return coverImgsList;\n}\n\nconst Category = {\n  series,\n  coverImgsList,\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Category);\n\n\n//# sourceURL=webpack://backend/./src/resolvers/Category.js?");

/***/ }),

/***/ "./src/resolvers/Customer.js":
/*!***********************************!*\
  !*** ./src/resolvers/Customer.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction cart({ id }, _, { prisma }) {\n  return prisma.user.findUnique({ where: { id } }).cart();\n}\n\nconst Customer = {\n  cart,\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Customer);\n\n\n//# sourceURL=webpack://backend/./src/resolvers/Customer.js?");

/***/ }),

/***/ "./src/resolvers/Mutation.js":
/*!***********************************!*\
  !*** ./src/resolvers/Mutation.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var apollo_server_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-core */ \"apollo-server-core\");\n/* harmony import */ var apollo_server_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_core__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ \"./src/utils.js\");\n/* harmony import */ var currency_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! currency.js */ \"currency.js\");\n/* harmony import */ var currency_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(currency_js__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nasync function login(_, { username }, { prisma, res, cookies }) {\n  const user = await prisma.user.findUnique({ where: { username } });\n  if (!user) throw new apollo_server_core__WEBPACK_IMPORTED_MODULE_0__.AuthenticationError(`${username} doesn't exist`);\n\n  const { refresh_token, expires_in } = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.signToken)(user.id);\n\n  res.cookie(\"refresh_token\", refresh_token, {\n    httpOnly: true,\n    sameSite: \"strict\",\n    secure: true,\n    // signed: true,\n    maxAge: expires_in,\n  });\n\n  const authedCart = await prisma.cart.findUnique({\n    where: { id: user.cartId },\n    include: { cartItems: true },\n  });\n\n  let totalQuantity = authedCart.cartItems.reduce((acc, item) => {\n    acc += item.quantity;\n    return acc;\n  }, 0);\n\n  if (cookies?.cartId) {\n    const guestCart = await prisma.cart.findUnique({\n      where: { id: cookies.cartId },\n      include: { cartItems: true },\n    });\n\n    const cartItemIds = guestCart.cartItems?.map((item) => ({ id: item.id }));\n\n    totalQuantity += guestCart.cartItems.reduce((acc, item) => {\n      acc += item.quantity;\n      return acc;\n    }, 0);\n\n    const totalPrice = currency_js__WEBPACK_IMPORTED_MODULE_2___default()(guestCart.subtotal).add(authedCart.subtotal);\n\n    await prisma.cart.update({\n      where: { id: guestCart.id },\n      data: {\n        cartItems: { disconnect: cartItemIds },\n      },\n    });\n\n    await prisma.cart.update({\n      where: { id: user.cartId },\n      data: {\n        subtotal: totalPrice.value,\n        formattedSubtotal: `$${totalPrice.value} USD`,\n        estimatedTotal: totalPrice.value,\n        formattedEstimatedTotal: `$${totalPrice.value} USD`,\n        cartItems: { connect: cartItemIds },\n      },\n    });\n\n    await prisma.cart.delete({ where: { id: guestCart.id } });\n\n    res.clearCookie(\"cartId\");\n  }\n\n  return {\n    user,\n    totalQuantity,\n    refresh_token,\n    expires_in,\n  };\n}\n\nasync function refreshToken(_, __, { prisma, userId, res }) {\n  if (!userId) {\n    return {\n      user: null,\n      refresh_token: null,\n      expires_in: null,\n    };\n  }\n\n  const user = await prisma.user.findUnique({ where: { id: userId } });\n  if (!user) throw new apollo_server_core__WEBPACK_IMPORTED_MODULE_0__.AuthenticationError(`user doesn't authenticated`);\n\n  const { refresh_token, expires_in } = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.signToken)(userId);\n\n  res.cookie(\"refresh_token\", refresh_token, {\n    httpOnly: true,\n    sameSite: \"strict\",\n    secure: true,\n    // signed: true,\n    maxAge: expires_in,\n  });\n\n  return {\n    user,\n    refresh_token,\n    expires_in,\n  };\n}\n\nfunction logout(_, __, { res }) {\n  res.clearCookie(\"refresh_token\");\n  return {\n    message: \"You have been successfully logged out\",\n  };\n}\n\nasync function fetchOrcreateCart(\n  _,\n  __,\n  { prisma, userId, res, cookies, cartId }\n) {\n  const guestCartId = cookies?.cartId;\n\n  if (userId) {\n    const cart = await prisma.cart.findUnique({ where: { id: cartId } });\n    if (!cart)\n      throw new UserInputError(\n        `${user.name} with the id ${user.id} must has a cart`\n      );\n    return cart;\n  }\n\n  if (guestCartId) {\n    const cart = await prisma.cart.findUnique({ where: { id: guestCartId } });\n    if (!cart) throw new UserInputError(`${guestCartId} is wrong input`);\n    return cart;\n  }\n\n  const cart = await prisma.cart.create({\n    data: {},\n  });\n\n  res.cookie(\"cartId\", cart.id);\n\n  return cart;\n}\n\nasync function addItemToCart(\n  _,\n  { item, price },\n  { prisma, userId, res, cookies, cartId }\n) {\n  const guestCartId = cookies?.cartId;\n\n  if (!guestCartId && !userId) {\n    const cart = await prisma.cart.create({\n      data: {\n        subtotal: price,\n        formattedSubtotal: `$${price} USD`,\n        estimatedTotal: price,\n        formattedEstimatedTotal: `$${price} USD`,\n        cartItems: {\n          create: [(0,_utils__WEBPACK_IMPORTED_MODULE_1__.cartItem)(item)],\n        },\n      },\n    });\n\n    res.cookie(\"cartId\", cart.id);\n\n    return cart;\n  }\n\n  const cart = await prisma.cart.findUnique({\n    where: { id: cartId || guestCartId },\n  });\n\n  const totalPrice = currency_js__WEBPACK_IMPORTED_MODULE_2___default()(cart.subtotal).add(currency_js__WEBPACK_IMPORTED_MODULE_2___default()(price));\n\n  return prisma.cart.update({\n    where: { id: cartId || guestCartId },\n    data: {\n      subtotal: totalPrice.value,\n      formattedSubtotal: `$${totalPrice.value} USD`,\n      estimatedTotal: totalPrice.value,\n      formattedEstimatedTotal: `$${totalPrice.value} USD`,\n      cartItems: {\n        create: [(0,_utils__WEBPACK_IMPORTED_MODULE_1__.cartItem)(item)],\n      },\n    },\n  });\n}\n\nasync function updateCart(_, { cartId, item }, { prisma, cookies, userId }) {\n  if (!userId && !cookies?.cartId)\n    throw new apollo_server_core__WEBPACK_IMPORTED_MODULE_0__.ForbiddenError(\"Forbidden Request\");\n\n  const cart = await prisma.cart.findUnique({\n    where: { id: cartId },\n    include: { cartItems: { include: { product: true } } },\n  });\n\n  let totalPrice =\n    cart.cartItems.length > 1\n      ? cart.cartItems\n          .filter((cartItem) => cartItem.id !== item.itemId)\n          .reduce(\n            (acc, item) =>\n              currency_js__WEBPACK_IMPORTED_MODULE_2___default()(acc).add(\n                currency_js__WEBPACK_IMPORTED_MODULE_2___default()(item.product.price).multiply(item.quantity)\n              ),\n            0\n          )\n      : { value: 0 };\n\n  totalPrice = currency_js__WEBPACK_IMPORTED_MODULE_2___default()(totalPrice.value).add(\n    currency_js__WEBPACK_IMPORTED_MODULE_2___default()(item.price).multiply(item.quantity)\n  );\n\n  return prisma.cart.update({\n    where: { id: cartId },\n    data: {\n      subtotal: totalPrice.value,\n      formattedSubtotal: `$${totalPrice.value} USD`,\n      estimatedTotal: totalPrice.value,\n      formattedEstimatedTotal: `$${totalPrice.value} USD`,\n      cartItems: {\n        update: {\n          where: { id: item.itemId },\n          data: {\n            quantity: item.quantity,\n          },\n        },\n      },\n    },\n  });\n}\n\nasync function deletecartItem(_, { itemId }, { prisma, cookies, cartId }) {\n  const deletedItem = await prisma.cartItem.delete({\n    where: { id: itemId },\n    include: { product: true },\n  });\n\n  const cart = await prisma.cart.findUnique({\n    where: { id: cartId || cookies?.cartId },\n  });\n\n  const deletedItemPrice = currency_js__WEBPACK_IMPORTED_MODULE_2___default()(deletedItem.product.price).multiply(\n    deletedItem.quantity\n  );\n\n  const totalPrice = currency_js__WEBPACK_IMPORTED_MODULE_2___default()(cart.subtotal).subtract(deletedItemPrice.value);\n\n  await prisma.cart.update({\n    where: { id: cart.id },\n    data: {\n      subtotal: totalPrice.value,\n      formattedSubtotal: `$${totalPrice.value} USD`,\n      estimatedTotal: totalPrice.value,\n      formattedEstimatedTotal: `$${totalPrice.value} USD`,\n    },\n  });\n\n  return { quantity: deletedItem.quantity };\n}\n\nasync function signup(_, { username }, { prisma, res, cookies }) {\n  const user = await prisma.user.create({\n    data: { username, role: \"Customer\", cart: { create: {} } },\n  });\n\n  const { refresh_token, expires_in } = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.signToken)(user.id);\n\n  res.cookie(\"refresh_token\", refresh_token, {\n    httpOnly: true,\n    sameSite: \"strict\",\n    secure: true,\n    // signed: true,\n    maxAge: expires_in,\n  });\n\n  const authedCart = await prisma.cart.findUnique({\n    where: { id: user.cartId },\n    include: { cartItems: true },\n  });\n\n  let totalQuantity = authedCart.cartItems.reduce((acc, item) => {\n    acc += item.quantity;\n    return acc;\n  }, 0);\n\n  if (cookies?.cartId) {\n    const guestCart = await prisma.cart.findUnique({\n      where: { id: cookies.cartId },\n      include: { cartItems: true },\n    });\n\n    const cartItemIds = guestCart.cartItems?.map((item) => ({ id: item.id }));\n\n    totalQuantity += guestCart.cartItems.reduce((acc, item) => {\n      acc += item.quantity;\n      return acc;\n    }, 0);\n\n    const totalPrice = currency_js__WEBPACK_IMPORTED_MODULE_2___default()(guestCart.subtotal).add(authedCart.subtotal);\n\n    await prisma.cart.update({\n      where: { id: guestCart.id },\n      data: {\n        cartItems: { disconnect: cartItemIds },\n      },\n    });\n\n    await prisma.cart.update({\n      where: { id: user.cartId },\n      data: {\n        subtotal: totalPrice.value,\n        formattedSubtotal: `$${totalPrice.value} USD`,\n        estimatedTotal: totalPrice.value,\n        formattedEstimatedTotal: `$${totalPrice.value} USD`,\n        cartItems: { connect: cartItemIds },\n      },\n    });\n\n    await prisma.cart.delete({ where: { id: guestCart.id } });\n\n    res.clearCookie(\"cartId\");\n  }\n\n  return {\n    user,\n    totalQuantity,\n    refresh_token,\n    expires_in,\n  };\n}\n\n// function createOrder(_, { products }, { prisma, res }) {}\n\nconst Mutation = {\n  login,\n  refreshToken,\n  logout,\n  fetchOrcreateCart,\n  addItemToCart,\n  updateCart,\n  deletecartItem,\n  signup,\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Mutation);\n\n\n//# sourceURL=webpack://backend/./src/resolvers/Mutation.js?");

/***/ }),

/***/ "./src/resolvers/Product.js":
/*!**********************************!*\
  !*** ./src/resolvers/Product.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction features({ id }, _, { prisma }) {\n  return prisma.product.findUnique({ where: { id } }).features();\n}\n\nfunction models({ id }, _, { prisma }) {\n  return prisma.product.findUnique({ where: { id } }).models();\n}\n\nconst Product = {\n  features,\n  models,\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Product);\n\n\n//# sourceURL=webpack://backend/./src/resolvers/Product.js?");

/***/ }),

/***/ "./src/resolvers/Query.js":
/*!********************************!*\
  !*** ./src/resolvers/Query.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var apollo_server_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-core */ \"apollo-server-core\");\n/* harmony import */ var apollo_server_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_core__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ \"./src/utils.js\");\n\n\n\nfunction banners(_, __, { prisma }) {\n  return prisma.banner.findMany();\n}\n\nfunction featureds(_, __, { prisma }) {\n  return prisma.featured.findMany();\n}\n\nfunction pods(_, __, { prisma }) {\n  return prisma.pod.findMany();\n}\n\nfunction categories(_, __, { prisma }) {\n  return prisma.category.findMany();\n}\n\nfunction category(_, { id }, { prisma }) {\n  return prisma.category.findUnique({\n    where: { id },\n  });\n}\n\nfunction serie(_, { id }, { prisma }) {\n  return prisma.serie.findUnique({\n    where: { id },\n  });\n}\n\nasync function products(\n  _,\n  { filter, search, categoryId, serieId },\n  { prisma }\n) {\n  if (!filter && !search && !categoryId && !serieId)\n    return prisma.product.findMany();\n\n  const orderBy = filter?.price\n    ? { price: filter?.price }\n    : filter?.date\n    ? { createdAt: filter?.date }\n    : { createdAt: \"desc\" };\n\n  if (serieId) {\n    const existSerie = await prisma.serie.findMany({\n      where: {\n        AND: [\n          {\n            id: serieId,\n          },\n          {\n            categoryId,\n          },\n        ],\n      },\n    });\n    if (!existSerie[0]) throw new apollo_server_core__WEBPACK_IMPORTED_MODULE_0__.UserInputError(`${serieId} doesn't exist`);\n\n    return prisma.product.findMany({\n      take: filter?.take,\n      where: {\n        AND: [\n          {\n            OR: [\n              { name: { contains: search, mode: \"insensitive\" } },\n              { description: { contains: search, mode: \"insensitive\" } },\n              { subDescription: { contains: search, mode: \"insensitive\" } },\n            ],\n          },\n          { gender: filter?.gender },\n          { serieId },\n        ],\n      },\n      orderBy,\n    });\n  }\n\n  const series = await prisma.serie.findMany({\n    where: {\n      categoryId,\n    },\n    select: {\n      id: true,\n    },\n  });\n\n  const serieIds = series.map((serie) => ({ serieId: serie.id }));\n\n  const products = await prisma.product.findMany({\n    take: filter?.take,\n    where: {\n      AND: [\n        { OR: serieIds },\n        {\n          OR: [\n            { name: { contains: search, mode: \"insensitive\" } },\n            { description: { contains: search, mode: \"insensitive\" } },\n            { subDescription: { contains: search, mode: \"insensitive\" } },\n          ],\n        },\n        { gender: filter?.gender },\n      ],\n    },\n    orderBy,\n  });\n\n  return products;\n}\n\nasync function productsByCategory(_, { categoryId, serieId }, { prisma, req }) {\n  if (serieId) {\n    const existSerie = await prisma.serie.findMany({\n      where: {\n        AND: [\n          {\n            id: serieId,\n          },\n          {\n            categoryId,\n          },\n        ],\n      },\n    });\n\n    if (!existSerie[0]) throw new apollo_server_core__WEBPACK_IMPORTED_MODULE_0__.UserInputError(`${serieId} doesn't exist`);\n\n    return prisma.product.findMany({\n      where: {\n        serieId,\n      },\n    });\n  }\n\n  const series = await prisma.serie.findMany({\n    where: {\n      categoryId,\n    },\n    select: {\n      id: true,\n    },\n  });\n\n  const serieIds = series.map((serie) => ({ serieId: serie.id }));\n\n  const products = await prisma.product.findMany({\n    where: {\n      OR: serieIds,\n    },\n  });\n\n  return products;\n}\n\nfunction product(_, { id }, { prisma }) {\n  return prisma.product.findUnique({\n    where: { id },\n  });\n}\n\nasync function cart(\n  _,\n  { cartId },\n  { prisma, userId, cookies, cartId: authedCartId }\n) {\n  if (userId) {\n    if (cartId !== authedCartId) throw new apollo_server_core__WEBPACK_IMPORTED_MODULE_0__.ForbiddenError(\"Forbidden Request\");\n    return await prisma.cart.findUnique({\n      where: { id: cartId },\n      include: { cartItems: true },\n    });\n  }\n\n  // if (cookies?.cartId) {\n  // if (cookies.cartId !== cartId)\n  //   throw new ForbiddenError(\"Forbidden Request\");\n  return await prisma.cart.findUnique({\n    where: { id: cartId },\n    include: {\n      cartItems: {\n        include: {\n          product: true,\n          model: true,\n          features: true,\n        },\n      },\n    },\n  });\n  // }\n\n  // throw new ForbiddenError(\"Forbidden Request\");\n}\n\nasync function initialCart(_, { cartId }, { prisma }) {\n  return await prisma.cart.findUnique({\n    where: { id: cartId },\n    include: { cartItems: true },\n  });\n}\n\nasync function fetchUserSession(_, __, { prisma, userId, token }) {\n  if (!userId) {\n    return {\n      user: null,\n      refresh_token: null,\n      expires_in: null,\n    };\n  }\n\n  const user = await prisma.user.findUnique({\n    where: { id: userId },\n    include: { cart: { include: { cartItems: true } } },\n  });\n  if (!user) throw new AuthenticationError(`user doesn't authenticated`);\n\n  const payload = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getTokenPayload)(token);\n\n  return {\n    user,\n    refresh_token: token,\n    expires_in: payload.exp,\n  };\n}\n\nasync function cartItemsCount(_, { cartId }, { prisma }) {\n  if (!cartId) return { count: 0 };\n\n  const cart = await prisma.cart.findUnique({\n    where: { id: cartId },\n    include: { cartItems: true },\n  });\n\n  const count =\n    cart?.cartItems.length > 0\n      ? cart.cartItems.reduce((acc, item) => {\n          acc += item.quantity;\n          return acc;\n        }, 0)\n      : 0;\n\n  return { count };\n}\n\nconst Query = {\n  banners,\n  featureds,\n  pods,\n  categories,\n  category,\n  serie,\n  products,\n  productsByCategory,\n  product,\n  cart,\n  fetchUserSession,\n  initialCart,\n  cartItemsCount,\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Query);\n\n\n//# sourceURL=webpack://backend/./src/resolvers/Query.js?");

/***/ }),

/***/ "./src/resolvers/Serie.js":
/*!********************************!*\
  !*** ./src/resolvers/Serie.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction products({ id }, _, { prisma }, { variableValues }) {\n  if (variableValues.hasProducts === false) return null;\n  return prisma.serie.findUnique({ where: { id } }).products();\n}\n\nconst Serie = {\n  products,\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Serie);\n\n\n//# sourceURL=webpack://backend/./src/resolvers/Serie.js?");

/***/ }),

/***/ "./src/resolvers/index.js":
/*!********************************!*\
  !*** ./src/resolvers/index.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Query */ \"./src/resolvers/Query.js\");\n/* harmony import */ var _Mutation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Mutation */ \"./src/resolvers/Mutation.js\");\n/* harmony import */ var _Product__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Product */ \"./src/resolvers/Product.js\");\n/* harmony import */ var _Category__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Category */ \"./src/resolvers/Category.js\");\n/* harmony import */ var _Serie__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Serie */ \"./src/resolvers/Serie.js\");\n/* harmony import */ var _Cart__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Cart */ \"./src/resolvers/Cart.js\");\n/* harmony import */ var _CartItem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CartItem */ \"./src/resolvers/CartItem.js\");\n/* harmony import */ var _Customer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Customer */ \"./src/resolvers/Customer.js\");\n\n\n\n\n\n\n\n\n\nconst resolvers = {\n  Query: _Query__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  Mutation: _Mutation__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  Product: _Product__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n  Category: _Category__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n  Serie: _Serie__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n  Cart: _Cart__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n  CartItem: _CartItem__WEBPACK_IMPORTED_MODULE_6__[\"default\"],\n  Customer: _Customer__WEBPACK_IMPORTED_MODULE_7__[\"default\"],\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (resolvers);\n\n\n//# sourceURL=webpack://backend/./src/resolvers/index.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"APP_SECRET\": () => (/* binding */ APP_SECRET),\n/* harmony export */   \"cartItem\": () => (/* binding */ cartItem),\n/* harmony export */   \"expires_in\": () => (/* binding */ expires_in),\n/* harmony export */   \"generatePayload\": () => (/* binding */ generatePayload),\n/* harmony export */   \"getTokenPayload\": () => (/* binding */ getTokenPayload),\n/* harmony export */   \"getUserId\": () => (/* binding */ getUserId),\n/* harmony export */   \"signToken\": () => (/* binding */ signToken),\n/* harmony export */   \"updateCartItems\": () => (/* binding */ updateCartItems)\n/* harmony export */ });\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst APP_SECRET = \"App-secret\";\nconst expires_in = 90 * 24 * 60 * 60 * 1000;\n\nfunction getTokenPayload(token) {\n  try {\n    const payload = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(token, APP_SECRET);\n    return payload;\n  } catch (error) {\n    console.log(error);\n  }\n}\n\nfunction generatePayload(sub) {\n  return { sub, iat: Date.now() };\n}\n\nfunction signToken(sub) {\n  const refresh_token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().sign(generatePayload(sub), APP_SECRET, {\n    expiresIn: expires_in,\n  });\n\n  return { refresh_token, expires_in };\n}\n\nasync function getUserId(userQuery, req, authToken) {\n  if (req) {\n    const authHeader = req.headers.authorization;\n    if (authHeader) {\n      const token = authHeader.replace(\"Bearer \", \"\");\n      if (!token) {\n        return { userId: null, userRole: null };\n      }\n      const payload = getTokenPayload(token);\n      if (!payload.sub) {\n        return { userId: null, userRole: null };\n      }\n      const { role: userRole, cartId } = await userQuery.findUnique({\n        where: { id: payload.sub },\n      });\n      return { userId: payload.sub, userRole, cartId, token };\n    }\n  } else if (authToken) {\n    const { userId } = getTokenPayload(authToken);\n    const user = await userQuery.findUnique({\n      where: { id: userId },\n    });\n    return { userId, userRole: user.role, cartId: user.cartId, token };\n  }\n\n  return { userId: null, userRole: null };\n}\n\nconst updateCartItems = ({ id, item, cartQueryUpdate }) =>\n  cartQueryUpdate({\n    where: { id },\n    data: {\n      cartItems: {\n        create: [item],\n      },\n    },\n  });\n\nconst cartItem = (item) => {\n  const createdItem = {\n    product: { connect: { id: item.productId } },\n  };\n  if (item.modelId) createdItem.model = { connect: { id: item.modelId } };\n  if (item.features) {\n    /*\n      create or connect (to do later)\n      feature.name\n      feature.item\n    */\n    createdItem.features = { create: [...item.features] };\n  }\n  return createdItem;\n};\n\n\n//# sourceURL=webpack://backend/./src/utils.js?");

/***/ }),

/***/ "@graphql-tools/schema":
/*!****************************************!*\
  !*** external "@graphql-tools/schema" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@graphql-tools/schema");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "apollo-server-core":
/*!*************************************!*\
  !*** external "apollo-server-core" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("apollo-server-core");

/***/ }),

/***/ "apollo-server-express":
/*!****************************************!*\
  !*** external "apollo-server-express" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("apollo-server-express");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ }),

/***/ "currency.js":
/*!******************************!*\
  !*** external "currency.js" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("currency.js");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;