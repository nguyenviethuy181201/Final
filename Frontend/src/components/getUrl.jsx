import React from 'react'

const GetUrl = (category, price, rating, sort, page) => {
  const queryParams = [];

  if (category) queryParams.push(`category=${category}`);
  if (price) queryParams.push(`price=${price}`);
  if (rating) queryParams.push(`rating=${rating}`);
  if (sort) queryParams.push(`sort=${sort}`);
  if (page) queryParams.push(`page=${page}`);

  if (queryParams.length === 0) return "";
  
  return `?${queryParams.join('&')}`;
}

export default GetUrl;