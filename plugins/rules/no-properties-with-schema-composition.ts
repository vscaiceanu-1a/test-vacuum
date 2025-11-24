import { Oas3Rule } from '@redocly/openapi-core';

export const noPropertiesWithSchemaComposition: Oas3Rule = () => {
  return {
    Schema(schema, { report, location }) {
      const hasComposition = schema.allOf || schema.oneOf || schema.anyOf || schema.not;
      const hasProperties = schema.properties;

      if (hasComposition && hasProperties) {
        report({
          message: "Schema has both a schema composition keyword (allOf/oneOf/anyOf/not) and 'properties' at the same level. Move 'properties' inside the composition array for proper schema structure. See https://github.com/AmadeusITGroup/otter/issues/2832 for details.",
          location: location.child('properties'),
        });
      }
    },
  };
};
