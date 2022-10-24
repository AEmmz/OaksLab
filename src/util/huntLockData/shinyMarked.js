import { markedAvailable } from "src/util/huntLockData/marked";

const shinyMarkedLocked = new Set([10169, 10170, 10171, 10024, 647]);
export const shinyMarkedAvailable = markedAvailable.filter((x) => !shinyMarkedLocked.has(x));
