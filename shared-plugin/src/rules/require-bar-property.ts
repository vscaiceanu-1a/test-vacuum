import { Oas3Rule } from '@redocly/openapi-core';

export const requireBarProperty: Oas3Rule = () => {
  return {
    Schema(schema: any, { report, location }: { report: any; location: any }) {
      if (schema.type === 'object' && schema.properties && !schema.properties.bar) {
        report({
          message: "Schema must have a 'bar' property.",
          location: location,
        });
      }
    },
  };
};
