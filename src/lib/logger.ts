type LogLevel = "debug" | "info" | "warn" | "error";

class Logger {
  constructor(private service: string) {}

  private log(level: LogLevel, message: string, context?: Record<string, unknown>) {
    if (level === "debug" && process.env.NODE_ENV === "production") return;

    const entry = {
      level,
      service: this.service,
      message,
      timestamp: new Date().toISOString(),
      ...context,
    };

    const fn = level === "error" ? console.error : level === "warn" ? console.warn : console.log;
    fn(JSON.stringify(entry));
  }

  debug(message: string, context?: Record<string, unknown>) { this.log("debug", message, context); }
  info(message: string, context?: Record<string, unknown>) { this.log("info", message, context); }
  warn(message: string, context?: Record<string, unknown>) { this.log("warn", message, context); }
  error(message: string, context?: Record<string, unknown>) { this.log("error", message, context); }
}

export function createLogger(service: string): Logger {
  return new Logger(service);
}

export const logger = createLogger("current-ai");
