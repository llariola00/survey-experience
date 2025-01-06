import { act1Questions } from './acts/act1';
import { act2Questions } from './acts/act2';
import { act3Questions } from './acts/act3';
import { act4Questions } from './acts/act4';
import { act1v2Questions } from './acts/act1v2';
import { act2v2Questions } from './acts/act2v2';
import { act3v2Questions } from './acts/act3v2';
import { act4v2Questions } from './acts/act4v2';

export type { Question } from './acts/act1';

export const questions = [
  ...act1Questions,
  ...act2Questions,
  ...act3Questions,
  ...act4Questions
];

export const questionsV2 = [
  ...act1v2Questions,
  ...act2v2Questions,
  ...act3v2Questions,
  ...act4v2Questions
];