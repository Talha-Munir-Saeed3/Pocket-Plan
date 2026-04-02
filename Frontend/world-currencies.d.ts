declare module "world-currencies" {
  const data: Record<
    string,
    {
      name?: string;
      iso?: {
        code?: string;
        number?: string;
      };
      units?: {
        major?: {
          name?: string;
          symbol?: string;
        };
        minor?: {
          name?: string;
          symbol?: string;
          majorValue?: number;
        };
      };
    }
  >;

  export default data;
}
