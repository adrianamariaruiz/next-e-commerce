import { titleFont } from "@/config/fonts";
import RegisterForm from "./ui-signup/RegisterForm";

export default function SignUpPage() {

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className={ `${ titleFont.className } text-3xl mb-5 text-center` }>Sign up</h2>
      </div>
      <RegisterForm/>
    </div>
  );
}