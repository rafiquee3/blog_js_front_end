const Content = ({children}: any) => {
  return ( 
    <>
      <div style={{
        display: 'flex',
        height: 'calc(100vh - 70px)',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {children}
      </div>
    </>
  )
}
export default Content;