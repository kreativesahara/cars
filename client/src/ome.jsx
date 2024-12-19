import  useRefreshToken from './hooks/useRefreshToken';
const ome = () => {
  const refresh = useRefreshToken();
  return (
  <>
      <div>ome</div>
      <button onClick={() => refresh()}>Refresh</button>
  </>
  )
}

export default ome