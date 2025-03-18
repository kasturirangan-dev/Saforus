import {Languages, TimeZone} from './constant';

export const fetchTimeZone = () => {
  return new Promise((resolve, reject) => {
    resolve(TimeZone);
  });
};

export const fetchLanguages = () => {
  return new Promise((resolve, reject) => {
    resolve(Languages);
  });
};

