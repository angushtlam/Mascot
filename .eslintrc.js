module.exports = {
    "extends": "standard",
    "plugins": [
        "standard",
        "promise"
    ],
    "rules" : {
      "space-before-function-paren": ["error", {
          "anonymous": "always",
          "named": "ignore",
          "asyncArrow": "ignore"
      }]
    }
};
