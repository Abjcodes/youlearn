import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/router";
import { Navbar, Button, Text } from "@nextui-org/react";
import Link from "next/link";


const NavBar = () => {
    const supabaseClient = useSupabaseClient();
    const user = useUser();
    const router = useRouter();

    const signOutUser = () => {
        supabaseClient.auth.signOut();
        router.push("/");
    }
    return (
        <Navbar>
            <Navbar.Brand as={Link} href='/'>
                YouLearn
            </Navbar.Brand>
            <Navbar.Content hideIn={'xs'} variant="highlight-rounded">
                <Navbar.Link href='/notes'>Notes</Navbar.Link>
            </Navbar.Content>
            <Navbar.Content>
                {!user ? 
                <>
                    <Navbar.Link href="/login">
                        <Button auto flat>
                            Login
                        </Button>
                    </Navbar.Link>
                </>
                :
                <>
                    <Navbar.Item>
                        <Text>
                            Hey, {user.email}
                        </Text>
                    </Navbar.Item>  
                    <Navbar.Item>
                        <Button auto flat onPress={() => supabaseClient.auth.signOut()}>
                            Sign out
                        </Button>
                    </Navbar.Item>
                </>
                }
            </Navbar.Content>
        </Navbar>
    )
}

export default NavBar;