export function getPagination (page, size) {
  const limit = size ? Number(size) : 10;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};
