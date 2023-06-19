import {httpMethodTypes} from './types';
import axios from 'axios';
import {BASE_URL} from './variables';
import {useQuery} from '@tanstack/react-query';

/**
 * makes get request with react query ans axios
 * @param key {any[]} key array
 * @param url {string} relative uri
 * @returns {{}}
 */
export const useAxiosQuery = (key: any[], url: string, options?: object) => {
  return useQuery({
    queryKey: [...key],
    queryFn: async () => {
      const {data} = await axios.get(`${BASE_URL}/${url}`);
      return data;
    },
    ...(options ?? {}),
  });
};

/**
 * makes a mutation
 * @param key {any[]} key array
 * @param url {string} relative uri
 * @param method {httpRequestMethod} request method
 * @param body {object} request body
 * @returns {}
 */
export const useAxiosMutate = (
  key: any[],
  url: string,
  method: httpMethodTypes,
  body: any,
) => {
  return useQuery({
    queryKey: [...key],
    queryFn: async () => {
      const {data} = await axios({
        url: `${BASE_URL}/${url}`,
        method: method,
        data: body,
      });
      return data as any;
    },
  });
};

/**
 * invalidates React Query queries
 * @param key {...any} pass the values of your array key
 * @returns {void}
 */
