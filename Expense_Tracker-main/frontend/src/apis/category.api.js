import axios from "axios";
import { getHeaders } from "../utils/helper";
import endpoints from "./endpoints";

export const addCategoryApi = async (data) => {
  console.log(data);
  console.log(endpoints.category);
  const callResponse = await axios({
    url: endpoints.category,
    method: "POST",
    headers: getHeaders(),
    data,
  })
    .then((response) => response.data)
    .catch((err) => ({
      status: 0,
      response: err.response,
      code: err.response.status,
    }));

  return callResponse;
};

export const getCategoryApi = async () => {
  const callResponse = await axios({
    url: endpoints.category,
    method: "get",
    headers: getHeaders()
  })
    .then((response) => response.data)
    .catch((err) => ({
      status: 0,
      response: err.response,
      code: err.response.status,
    }));

  return callResponse;
};

export const updateCategoryFieldApi = async (data, params) => {
  const callResponse = await axios({
    url: endpoints.category,
    method: "PATCH",
    headers: getHeaders(),
    data,
    params
  })
    .then((response) => response.data)
    .catch((err) => ({
      status: 0,
      response: err.response,
      code: err.response.status,
    }));

  return callResponse;
};

export const deleteCategoryApi = async (data) => {
  const callResponse = await axios({
    url: endpoints.category,
    method: "DELETE",
    headers: getHeaders(),
    data,
  })
    .then((response) => response.data)
    .catch((err) => ({
      status: 0,
      response: err.response,
      code: err.response.status,
    }));

  return callResponse;
};
