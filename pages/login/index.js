import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";

const Login = () => {
    const supabaseClient = useSupabaseClient();
    const user = useUser();
    const router = useRouter();

    if(user) {
        router.push("/");
    }
    
    return (
        <div className="px-10 sm:px-52">
        <Auth
            appearance={{theme: ThemeSupa}}
            supabaseClient={supabaseClient}
        />
        </div>
    )
}

export default Login;