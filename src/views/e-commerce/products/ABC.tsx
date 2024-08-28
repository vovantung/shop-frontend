// ** React Imports

import Button from '@mui/material/Button'

interface PP {
  count: string
  onChangePage: any
}

const ABC = (props: PP) => {
  // ** State

  const handleTest = () => {
    // alert(e.target.id)
    props.onChangePage()
  }

  return (
    <Button variant='contained' color='success' onClick={handleTest} key={123} id='123'>
      OK {props.count}
    </Button>
  )
}

export default ABC
