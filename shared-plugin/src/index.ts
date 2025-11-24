import { noPropertiesWithSchemaComposition } from './rules/no-properties-with-schema-composition';

export const id = 'redocly-rules';
export const rules = {
  oas3: {
    'no-properties-with-schema-composition': noPropertiesWithSchemaComposition,
  },
};

export const configs = {
  recommended: {
    rules: {
      'redocly-rules/no-properties-with-schema-composition': 'error',
    },
  },
};
