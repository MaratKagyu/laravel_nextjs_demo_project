
let apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT || '';

if (/\/$/.test(apiEndpoint)) {
  // Make sure the string doesn't end with slash
  apiEndpoint = apiEndpoint.substring(0, apiEndpoint.length - 1);
}

const config = {
  env: {
    apiEndpoint,
  }
}

export default config;
