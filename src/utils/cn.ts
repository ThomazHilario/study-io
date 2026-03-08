export const cn = (...props: any[]) => {
  return props.filter((p) => typeof p === "string").join(" ");
};
