/* @flow */
import identity from 'lodash/identity';
import { createAction, handleActions } from 'redux-actions';
import globalizeSelectors from '../../helpers/globalizeSelectors';
import type { UpdateLinkType, UpdateTitleType } from './types';

/* Constants */
export const mountPoint = 'helmet';

/* Selectors */
export const selectors = globalizeSelectors({
  getHelmet: identity,
}, mountPoint);

/* Types */
export const UPDATE_TITLE = 'helmet/UPDATE_TITLE';
export const UPDATE_LINK = 'helmet/UPDATE_LINK';

/* Actions */
export const updateTitle: UpdateTitleType = createAction(UPDATE_TITLE);
export const updateLink: UpdateLinkType = createAction(UPDATE_LINK);

/* Reducer */
export default handleActions({
  [UPDATE_TITLE]: (state, { payload: title }) => ({ ...state, title }),
  [UPDATE_LINK]: (state, { payload: link }) => ({ ...state, link }),
}, {
  title: 'Koa React Isomorphic',
  link: [],
});
