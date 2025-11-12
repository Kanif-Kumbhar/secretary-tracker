import { getSessionUser } from "@/hooks/user";
import AuthCard from "./_components/main-page";
import { redirect } from "next/navigation";



export default async function Auth() {
	const session = await getSessionUser();
	switch(session?.user.role){
		case "ADMIN": return redirect("/admin/dashboard");
		case "TEACHER": return redirect("/teacher/dashboard");
		case "SECRETARY": return redirect("/secretary/dashboard");
	}
	return (
		<AuthCard />
	)
}