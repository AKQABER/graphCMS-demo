import useSWR from 'swr';
import fetcher from '../modules/fetcher';

// Reusable implementation of useSWR, using a custom
// content fetcher. Takes the initial pageload SSR data
// and revalidates it on mount.

const getSWR = (query, initialData) =>
  useSWR(query, fetcher, {
    initialData,
    revalidateOnMount: true,
  }).data;

export default getSWR;
