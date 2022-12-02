const Content = ({children}) => {
  return ( 
    <>
      <div style={{
        display: 'flex',
        height: 'calc(100vh - 70px)',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        {children}
      </div>
    </>
  )
}
export default Content;