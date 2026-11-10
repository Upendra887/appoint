type OtpStore = Map<string, { code: string; expiresAt: number }>;
const globalStore = globalThis as typeof globalThis & { __saiHealthOtpStore?: OtpStore };
export const otps = globalStore.__saiHealthOtpStore ?? (globalStore.__saiHealthOtpStore = new Map());
