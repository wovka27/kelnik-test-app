export const sortComparators = {
  string: {
    asc: (a: string, b: string) => a.localeCompare(b),
    desc: (a: string, b: string) => b.localeCompare(a),
  },
  number: {
    asc: (a: number, b: number) => a - b,
    desc: (a: number, b: number) => b - a,
  }
}