declare module 'function-double' {
  interface functionDouble {
    <T extends Function, K extends Function>(
      target: T,
      source: K,
      options?: {
        toString?: string | ((source: K) => string),
        name?: string | ((source: K) => string),
      }
    ): K;
  }
  
  var defautExport: functionDouble;
  export default defautExport;
}