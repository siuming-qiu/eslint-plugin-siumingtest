module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "小程序不建议使用web接口,web接口会做鉴权",
    },
    // 我们需要使用这个规则的时候给我们传递参数，具体的参数含义可以看上面👆🏻
    schema: [
      {
        type: "object",
      },
    ],
    // 报错或者告警的时候的提示语
    messages: {
      doNotUseWebApi: "小程序不建议使用web接口,web接口可能会做鉴权,",
    },
  },
  create(context) {
    // const sourceCode = context.getSourceCode();
    return {
      ObjectExpression(node) {
        const objProps = node.properties;
        const pathProp = objProps.find((obj) => obj.key.name === "path");
        const pathvalue = pathProp.value;
        const isValid =
          (pathvalue.type === "Literal" && pathvalue.value.includes("/api/m")) ||
          (pathvalue.type === "TemplateLiteral" &&
            pathvalue.expressions[0].Identifier.name ===
              "MINI_PROGRAM_PREFIX");
        if (isValid) {
          return;
        }
        context.report({
          node,
          messageId: "doNotUseWebApi",
        });
      },
    };
  },
};
