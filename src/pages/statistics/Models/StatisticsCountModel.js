export default class StatisticsCount {

  constructor(name) {
    this.name = name;
    this.total = 0;
    this.longestTime = {
      name: null,
      total: 0,
      category: null
    };
    this.shortestTime = {
      name: null,
      total: 0,
      category: null
    };
    this.longestCount = {
      name: null,
      total: 0,
      category: null
    };
    this.shortestCount = {
      name: null,
      total: 0,
      category: null
    };
  }
}