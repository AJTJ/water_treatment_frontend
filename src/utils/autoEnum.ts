export function autoEnum<T extends string>(...keys: T[]): { [K in T]: string } {
  return keys.reduce((acc, key) => {
    acc[key] = key.toLowerCase(); // Or use custom transformation logic here
    return acc;
  }, {} as { [K in T]: string });
}
