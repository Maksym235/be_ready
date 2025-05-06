import { en_core } from './core';
import { en_home } from './home';
import { en_lists } from './lists';
import { en_modals } from './modals';
import { en_profile } from './profile';

export const en_language = {
  ...en_home,
  ...en_core,
  ...en_modals,
  ...en_lists,
  ...en_profile,
};
