import { SnkrsMonitor } from "./snkrsMonitor";

const monitor = new SnkrsMonitor();
const repeat = async () => {
  await monitor.run();
  setTimeout(repeat, Math.floor(Math.random() * (11 - 6 + 1) + 6) * 1000);
};
repeat();
