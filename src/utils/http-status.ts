export enum HttpStatus { // Changed from default export to named export
  // Success
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,

  // Client errors
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401, // use only for auth token problems (e.g. TOKEN_EXPIRED)
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  GONE = 410, // deleted resource / account removed
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422, // use for validation / invalid credentials (INVALID_CREDENTIALS)
  LOCKED = 423, // use for suspended accounts (ACCOUNT_SUSPENDED)
  TOO_MANY_REQUESTS = 429, // rate limiting

  // Server errors
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}

export type HttpStatusValue = (typeof HttpStatus)[keyof typeof HttpStatus];
