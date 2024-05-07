import Title from "@/components/ui/title/Title"
import { auth } from "@/auth.config"
import { redirect } from "next/navigation";



const ProfilePage = async () => {

  const session = await auth();

  if(!session?.user){
    redirect('/')
  }

  return (
    <div>
      <Title title="Profile"/>
      <pre>
        {JSON.stringify(session.user, null, 2)}
      </pre>

      <h3 className="text-2xl">{session.user.role}</h3>
    </div>
  )
}

export default ProfilePage