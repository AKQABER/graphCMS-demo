import useSWR from 'swr';
import fetcher from '../modules/fetcher';

const getSWR = (query, initialData) =>
  useSWR(query, fetcher, {
    initialData,
    revalidateOnMount: true,
  }).data;

export default getSWR;
