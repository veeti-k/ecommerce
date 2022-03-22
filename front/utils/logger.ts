import { Method } from "axios";

interface LogOptions {
  method: Method;
  path: string;
}

interface LogErrorOptions extends LogOptions {
  error: any;
}

const prefix = "[DEBUG] -";

export const logger = {
  log: (msg: string, objects?: any) => {
    console.info(`${prefix} ${msg}`, objects ? objects : "");
  },

  logRequesting: (options: LogOptions) => {
    console.info(`${prefix} [REQUESTING] - ${options.method} ${options.path}`);
  },

  logRequestError: (options: LogErrorOptions) => {
    // prettier-ignore
    console.info(`${prefix} [REQUEST FAILED] - ${options.method} ${options.path} - \n${options?.error?.message}`);
  },

  logRequestSuccess: (options: LogOptions) => {
    // prettier-ignore
    console.info(`${prefix} [REQUEST SUCCESSFUL] - ${options.method} ${options.path}`);
  },

  logHook: (hook: string, msg?: string) => {
    console.info(`${prefix} [HOOK] ${hook} ${msg ? msg : ""}`);
  },
};
