import { hash, verify } from "@node-rs/argon2";

export const passwordHashOptions = {
  // @node-rs/argon2 uses 2 for Argon2id; importing the const enum breaks isolatedModules.
  algorithm: 2,
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
} as const;

export function isValidEmail(email: string) {
  return /.+@.+/.test(email) && email.length <= 255;
}

export function isValidPassword(password: string) {
  return password.length >= 6 && password.length <= 255;
}

export async function hashPassword(password: string) {
  return hash(password, passwordHashOptions);
}

export async function verifyPassword(passwordHash: string, password: string) {
  return verify(passwordHash, password, passwordHashOptions);
}
