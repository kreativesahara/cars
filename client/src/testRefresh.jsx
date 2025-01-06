import  useRefreshToken from './hooks/useRefreshToken';
const testRefresh = () => {
  const refresh = useRefreshToken();
  return (
  <>
      <div>Home with Refresh</div>
      <button onClick={() => refresh()}>Refresh</button>
  </>
  )
}

export default testRefresh