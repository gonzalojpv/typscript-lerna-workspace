export type LogLevel = "info" | "warn" | "error" | "debug" | "log";

export default class Logger {
  // Instance property for the console instance
  private _console: Console;

  constructor() {
    // Use the default console unless a custom one is provided
    this._console = console;
  }

  // Method to set a custom console
  setConsole(customConsole: Console): void {
    this._console = customConsole;
  }

  // General log method for all levels
  private logger(
    level: LogLevel,
    action: string,
    message: string,
    details?: Record<string, unknown>
  ): void {
    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] [${level.toUpperCase()}] [${action}] ${message}`;

    switch (level) {
      case "info":
        this._console.info(formattedMessage, details || "");
        break;
      case "warn":
        this._console.warn(formattedMessage, details || "");
        break;
      case "error":
        this._console.error(formattedMessage, details || "");
        break;
      case "debug":
        this._console.debug(formattedMessage, details || "");
        break;
      default:
        this._console.log(formattedMessage, details || "");
    }
  }

  // Level-specific methods
  public log(message: string, details?: Record<string, unknown>): void {
    this.logger("log", "TRACE", message, details);
  }

  public trace(message: string, details?: Record<string, unknown>): void {
    this.logger("log", "TRACE", message, details);
  }

  public metric(message: string, details?: Record<string, unknown>): void {
    this.logger("log", "METRIC", message, details);
  }

  public info(message: string, details?: Record<string, unknown>): void {
    this.logger("info", "INFO", message, details);
  }

  public warn(message: string, details?: Record<string, unknown>): void {
    this.logger("warn", "DEPRECATION_WARNING", message, details);
  }

  public error(
    message: string,
    details?: Record<string, unknown> | Error
  ): void {
    let errorDetails: Record<string, unknown> = {};

    if (details instanceof Error) {
      // If details is an Error object, extract message and stack
      errorDetails = {
        message: details.message,
        stack: details.stack,
      };
    } else if (details) {
      // Otherwise, treat details as a Record<string, unknown>
      errorDetails = details;
    }

    this.logger("error", "ERROR", message, errorDetails);
  }

  public debug(message: string, details?: Record<string, unknown>): void {
    this.logger("debug", "DEBUG_TRACE", message, details);
  }

  public logMessage(message: string, details?: Record<string, unknown>): void {
    this.logger("log", "GENERAL", message, details);
  }
}
