import { request } from 'graphql-request';

const cmsApi =
  'https://api-eu-central-1.graphcms.com/v2/ckj8baihtv3bn01xp67ry9sc8/master';

const fetcher = (query, args) => request(cmsApi, query, args);

export default fetcher;
