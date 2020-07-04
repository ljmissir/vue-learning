module.exports = {
  root: false,
  env: {
    node: false
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  parserOptions: {
    
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
  }
};
