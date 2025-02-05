import { shallow } from 'zustand/shallow';
import { useFormStore } from './FormStore';
import type { FormFieldArray, FormFieldNames } from './types';

// We should return a strongly-typed array based on the specific field names we pass to the function.
export const useFieldValues = <T extends FormFieldNames[]>(...names: T) => {
  const values = useFormStore(
    (store) =>
      names.map((name) => store.userValues[name]!.value) as FormFieldArray<T>,
    shallow,
  );

  return values;
};
