import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth"; // Import the useAuth hook

const Users = () => {
    const [users, setUsers] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth(); // Get the authentication information

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/users', {
                    signal: controller.signal
                });

                console.log(response);
                isMounted && setUsers(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        // Check if the user is authenticated before fetching user data
        if (auth.accessToken) {
            getUsers();
        }

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [auth.accessToken, axiosPrivate]);

    return (
        <article>
            {users ? (
                <ul>
                    {users.map((user, i) => (
                        <li key={i}>{user?.username}</li>
                    ))}
                </ul>
            ) : (
                <p>No users to display</p>
            )}
        </article>
    );
};

export default Users;
