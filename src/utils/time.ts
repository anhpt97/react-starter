export const delay = async (s: number) =>
  await new Promise((_) => setTimeout(_, s * 1000));
