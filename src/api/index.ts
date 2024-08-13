import axios from 'axios';

export const getAllCategoriesAPI = async (): Promise<string[]> => {
  const response = await axios.get('https://swapi.dev/api/');
  const categories = Object.keys(response.data);
  return categories;
};

export const getDataByCategoriesAPI = async (categories: string[], search: string) => {
  const promises = categories.map((category) => axios.get(`https://swapi.dev/api/${category}/?search=${search}`));

  const responses = await Promise.allSettled(promises);

  const results = responses.reduce((acc, response, index) => {
    if (response.status === 'fulfilled') {
      acc[categories[index]] = response.value.data.results.slice(0, 3); // Take only the top 3 results
    }
    return acc;
  }, {});
  return results;
};
