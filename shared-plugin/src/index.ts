import { noPropertiesWithSchemaComposition } from './rules/no-properties-with-schema-composition';
import { noFooProperty } from './rules/no-foo-property';
import { requireBarProperty } from './rules/require-bar-property';

export const id = 'redocly-rules';
export const rules = {
  oas3: {
    'no-properties-with-schema-composition': noPropertiesWithSchemaComposition,
    'no-foo-property': noFooProperty,
    'require-bar-property': requireBarProperty,
  },
};

export const configs = {
  recommended: {
    rules: {
      'redocly-rules/no-properties-with-schema-composition': 'error',
    },
  },
  strict: {
    rules: {
      'redocly-rules/require-bar-property': 'error',
    },
  },
};
