import { v4 as uuidv4 } from 'uuid';
import { ViewTypes } from '../Types/ViewTypes';

export const appendViewIds = (viewsList: ViewTypes[]) =>
  viewsList.map(view => ({
    ...view,
    id: uuidv4(),
  }));

export const normalizePostData = (viewsList: ViewTypes[]) =>
  viewsList.map(view => {
    const newView = { ...view };
    delete newView['id'];
    delete newView['isMarked'];
    return newView;
  });
