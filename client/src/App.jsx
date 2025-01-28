import Layout from "./components/Layout";
import Users from "./users";
import useAuth from "./hooks/useAuth";


function App() {
  const {auth } = useAuth();
  console.log(auth?.roles);
  // Render content based on fetched bills
  return (
    <Layout>
      <main className="mt-8 mx-8">
        <h3>Dashboard</h3>
        {auth?.lastname ? (
          <div>
            <h2>Welcome, {auth?.lastname || "User"}!</h2>
            <p>You are logged in as: {auth?.email}</p>
          </div>) : null
        } 
        {auth?.roles?  <Users /> : null}
      </main>
    </Layout>
  );
}

export default App;
