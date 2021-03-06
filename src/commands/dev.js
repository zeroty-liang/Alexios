import chalk from "chalk";
import defaultSetting from "../config/default-setting";
import portUsage from "../utils/port-usage";
import { webpackDev } from "../webpack/main";
import webpack from "webpack";

/**
 * 检查端口情况，返回空闲端口
 */
const portCheck = async port => {
  // 自定义端口号
  const customPortNumber = Number(port);
  // 端口号非法
  if (!customPortNumber) {
    console.log(chalk.red(`Illegal port [${port}] !\n`));
    // 结束进程
    process.exit(0);
  }
  // 检查端口号占用情况
  console.log(chalk.green(`Checking the usage on port [${customPortNumber}]...\n`));
  // 获取空闲端口
  const EMPTY_PORT = await portUsage(customPortNumber);
  // 成功
  console.log(chalk.cyan(`Port [${EMPTY_PORT}] is available, starting now...\n`));
  return EMPTY_PORT;
};

export default async argv => {
  const {
    /** 端口号 */
    port = defaultSetting.PORT,
    /** 是否打开浏览器 */
    open = defaultSetting.OPEN,
  } = argv;

  const EMPTY_PORT = await portCheck(port);

  const webpackDevConfig = webpackDev({
    port: Number(EMPTY_PORT),
    open: open === "true",
  });

  // webpack();
};
