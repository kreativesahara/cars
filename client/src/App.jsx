import Layout from "./components/Layout";
import useAuth from "./hooks/useAuth";
import Users from "./users";
import BtnUpload from "./components/btnUpload";


function App() {
  const {auth } = useAuth();
  console.log(auth?.roles);
  // Render content based on fetched bills
  return (
    <Layout>
      <main className="mt-10 mx-8">
        {/* {auth?.roles === 1 && <Users />} */}
        <div>
          <div className='w-full bg-white shadow rounded-lg p-6 flex flex-col gap-6'>
            <header className='flex justify-between items-center'>
              <h1 className='text-2xl font-title text-neutral-950'>Your Dashboard</h1>
             
            </header>
            <div className='p-4 bg-neutral-50 rounded-md flex flex-col gap-2'>
              <h2 className='text-lg font-medium text-neutral-950'>User's Details</h2>
              <p className='text-sm text-neutral-600'>User's Name: {auth?.lastname || "User"}</p>
              <p className='text-sm text-neutral-600'>Your Email: {auth?.email}</p>
            </div>

            <header className='flex justify-between items-center'>
              <h1 className='text-2xl font-title text-neutral-950'>Your Subscription</h1>
             <BtnUpload />
            </header>
            <div className='p-4 bg-neutral-50 rounded-md flex flex-col gap-2'>
              <h2 className='text-lg font-medium text-neutral-950'>Subscription Details</h2>
              <p className='text-sm text-neutral-600'>Plan: Pro Membership</p>
              <p className='text-sm text-neutral-600'>Renewal Date: 2023-12-05</p>
            </div>

            <section className='flex flex-col gap-4'>
           

              <div className='p-4 bg-neutral-50 rounded-md flex flex-col gap-4'>
                <h2 className='text-lg font-medium text-neutral-950'>Uploaded Product</h2>
                <div className='flex items-center gap-4'>
                  <img
                    src='https://tools-api.webcrumbs.org/image-placeholder/100/100/products/1'
                    alt='Uploaded Product'
                    className='w-[100px] h-[100px] rounded-md object-cover'
                  />
                  <div>
                    <p className='text-sm text-neutral-950 font-medium'>Product Name: Smart Watch</p>
                    <p className='text-sm text-neutral-600'>Category: Electronics</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default App;
