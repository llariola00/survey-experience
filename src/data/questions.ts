import { act1Questions } from './acts/act1';
import { act2Questions } from './acts/act2';
import { act3Questions } from './acts/act3';
import { act4Questions } from './acts/act4';

export type { Question } from './acts/act1';

export const questions = [
  ...act1Questions,
  ...act2Questions,
  ...act3Questions,
  ...act4Questions
];