import  useRefreshToken from './hooks/useRefreshToken';
const Home = () => {
  const refresh = useRefreshToken();
  return (
  <>
      <div>Home</div>
      <button onClick={() => refresh()}>Refresh</button>
  </>
  )
}

export default Home