import AuthLayout from "@/layout/AuthLayout";

export const CreateAdmin = () => {
  return (
    <>
      <AuthLayout>
        <form className="mx-auto mt-10 w-[80%]">
          <div className="mt-5 w-full space-y-3">
            <Label htmlFor="email">EMAIL ADDRESS</Label>
            <Input
              type="email"
              id="email"
              className="h-[50px]"
              placeholder=""
            />
          </div>
        </form>
      </AuthLayout>
    </>
  );
};
