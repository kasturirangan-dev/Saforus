type EnvVarName = keyof ImportMetaEnv;

export function getEnvVar(name: EnvVarName): string {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    // Access environment variable via import.meta.env for Vite
    return import.meta.env[name];
  } else if (typeof process !== 'undefined' && process.env) {
    // Access environment variable via process.env for other build tools
    return process.env[name] || '';
  } else {
    throw new Error('Environment variable access not supported.');
  }
}
