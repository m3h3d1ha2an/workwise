import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="bg-muted flex w-full flex-1 items-center justify-center p-6 md:p-10">
      <SignIn />
    </div>
  );
};

export default SignInPage;
