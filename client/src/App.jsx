import Layout from "./components/Layout";
import useAuth from "./hooks/useAuth";
import Users from "./users";
import BtnUpload from "./components/btnUpload";


function App() {
  const {auth } = useAuth();
  // const 
  console.log(auth?.roles);
  // Render content based on fetched bills
  return (
    <Layout>
      <main className="mt-10 mx-8">
        {/* {auth?.roles === 1 && <Users />} */}
        <div>
          <div className='w-full bg-white shadow rounded-lg p-6 flex flex-col gap-6'>
            <h3 className=' font-semibold text-center'>
              <h1 className='text-4xl font-title  text-neutral-950'>Your Dashboard</h1>
             
            </h3>
            <div className='p-4 bg-neutral-50 rounded-md flex flex-col gap-2'>
              <h2 className='text-lg font-medium text-neutral-950'>User's Details</h2>
              <p className='text-sm text-neutral-600'>User's Name: {auth?.lastname || "User"}</p>
              <p className='text-sm text-neutral-600'>Your Email: {auth?.email}</p>
            </div>

            <h3 className=''>
              <h1 className='text-2xl font-title text-neutral-950'>Your Subscription</h1>
            </h3>
            <div className='p-4 bg-neutral-50 rounded-md flex flex-col gap-2'>
              <h2 className='text-lg font-medium text-neutral-950'>Subscription Details</h2>
              <p className='text-sm text-neutral-600'>Plan: Pro Membership</p>
              <p className='text-sm text-neutral-600'>Renewal Date: 2023-12-05</p>
            </div>

            <section className='flex flex-col gap-4'>
           
              {auth?.roles === 3 && 
              <div className='p-4 bg-neutral-50 rounded-md flex flex-col gap-4'>
                <div className="flex justify-between items-center">
                  <h2 className='text-lg font-medium text-neutral-950'>Uploaded Product</h2>
                  <BtnUpload />
                </div>
                <div className='flex items-center gap-4'>
                  <img
                    src='https://tools-api.webcrumbs.org/image-placeholder/100/100/products/1'
                    alt='Uploaded Product'
                    className='w-[100px] h-[100px] rounded-md object-cover'
                  />
                  <div>
                    <p className='text-sm text-neutral-950 font-medium'>Make: Toyota</p>
                    <p className='text-sm text-neutral-600'>Model: Premio</p>
                    <p className='text-sm text-neutral-600'>Year: 2023</p>
                  </div>
                </div>
              </div>}
            </section>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default App;
