import { noPropertiesWithSchemaComposition } from './rules/no-properties-with-schema-composition';

export const id = 'custom-rules';
export const rules = {
  oas3: {
    'no-properties-with-schema-composition': noPropertiesWithSchemaComposition,
  },
};
