import { ViewTypes, VTextBoxAttributes } from '../Types/ViewTypes';

export const createVTextBox = (data: VTextBoxAttributes): ViewTypes => ({
  moduleType: 'VTextBox',
  attributes: { ...data },
});
