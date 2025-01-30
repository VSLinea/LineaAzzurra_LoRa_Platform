"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/is-arrayish";
exports.ids = ["vendor-chunks/is-arrayish"];
exports.modules = {

/***/ "(ssr)/./node_modules/is-arrayish/index.js":
/*!*******************************************!*\
  !*** ./node_modules/is-arrayish/index.js ***!
  \*******************************************/
/***/ ((module) => {

eval("\nmodule.exports = function isArrayish(obj) {\n    if (!obj || typeof obj === \"string\") {\n        return false;\n    }\n    return obj instanceof Array || Array.isArray(obj) || obj.length >= 0 && (obj.splice instanceof Function || Object.getOwnPropertyDescriptor(obj, obj.length - 1) && obj.constructor.name !== \"String\");\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaXMtYXJyYXlpc2gvaW5kZXguanMiLCJtYXBwaW5ncyI6IjtBQUFBQSxPQUFPQyxPQUFPLEdBQUcsU0FBU0MsV0FBV0MsR0FBRztJQUN2QyxJQUFJLENBQUNBLE9BQU8sT0FBT0EsUUFBUSxVQUFVO1FBQ3BDLE9BQU87SUFDUjtJQUVBLE9BQU9BLGVBQWVDLFNBQVNBLE1BQU1DLE9BQU8sQ0FBQ0YsUUFDM0NBLElBQUlHLE1BQU0sSUFBSSxLQUFNSCxDQUFBQSxJQUFJSSxNQUFNLFlBQVlDLFlBQ3pDQyxPQUFPQyx3QkFBd0IsQ0FBQ1AsS0FBTUEsSUFBSUcsTUFBTSxHQUFHLE1BQU9ILElBQUlRLFdBQVcsQ0FBQ0MsSUFBSSxLQUFLLFFBQVE7QUFDL0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wb29sLW1vbml0b3JpbmctZGFzaGJvYXJkLy4vbm9kZV9tb2R1bGVzL2lzLWFycmF5aXNoL2luZGV4LmpzP2JlNDEiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0FycmF5aXNoKG9iaikge1xuXHRpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqID09PSAnc3RyaW5nJykge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdHJldHVybiBvYmogaW5zdGFuY2VvZiBBcnJheSB8fCBBcnJheS5pc0FycmF5KG9iaikgfHxcblx0XHQob2JqLmxlbmd0aCA+PSAwICYmIChvYmouc3BsaWNlIGluc3RhbmNlb2YgRnVuY3Rpb24gfHxcblx0XHRcdChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwgKG9iai5sZW5ndGggLSAxKSkgJiYgb2JqLmNvbnN0cnVjdG9yLm5hbWUgIT09ICdTdHJpbmcnKSkpO1xufTtcbiJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiaXNBcnJheWlzaCIsIm9iaiIsIkFycmF5IiwiaXNBcnJheSIsImxlbmd0aCIsInNwbGljZSIsIkZ1bmN0aW9uIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiY29uc3RydWN0b3IiLCJuYW1lIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/is-arrayish/index.js\n");

/***/ })

};
;