import { TryCatchAsync } from "~/utils/try-catch-async";

const Signup = TryCatchAsync(async (request: Request) => {
  // error
  // Argument of type '(request: Request) => Promise<void>' is not assignable to parameter of type 'RouteHandler'.
  // Type 'Promise<void>' is not assignable to type 'Promise<NextResponse<unknown>>'.
  // Type 'void' is not assignable to type 'NextResponse<unknown>'. (ts 2345)
  return await request.json();
  // const result = await AuthServices.createUser(body)
});

export const AuthControllers = {
  Signup,
  // Signin
};
