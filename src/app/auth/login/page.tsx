import { titleFont } from "@/config/fonts";
import LoginForm from "./ui-login/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className={ `${ titleFont.className } text-3xl mt-10 text-center font-bold` }>Sign in</h2>
      </div>
      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
        <LoginForm/>
      </div>
    </div>
  );
}