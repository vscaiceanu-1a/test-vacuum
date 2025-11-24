import { Oas3Rule } from '@redocly/openapi-core';

export const noFooProperty: Oas3Rule = () => {
  return {
    Schema(schema: any, { report, location }: { report: any; location: any }) {
      if (schema.properties && schema.properties.foo) {
        report({
          message: "Property 'foo' is forbidden.",
          location: location.child(['properties', 'foo']),
        });
      }
    },
  };
};
