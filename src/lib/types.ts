/**
 * Result type for Server Actions
 */
export type ActionResult<T = unknown> =
  | { success: true; message: string; data: T | null }
  | { success: false; message: string; data: unknown }; // data contains raw error
