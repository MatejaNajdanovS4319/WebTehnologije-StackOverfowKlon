export function normalizeArray(array) {
  return array.reduce(
    (acc, el) => {
      const a = acc;
      a.byIds[el._id] = el;
      a.allIds.push(el._id);
      return a;
    },
    {
      byIds: {},
      allIds: [],
    }
  );
}