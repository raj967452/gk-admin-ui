import config from "../constants";

export const getRecordIndex = (page) => (page - 1) * config.PAGE_SIZE;
export const getAllPages = (length) => Math.ceil(length / 10);
