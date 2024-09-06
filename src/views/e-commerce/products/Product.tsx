// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import { Alert, Snackbar } from '@mui/material'
import Slide, { SlideProps } from '@mui/material/Slide'
import { ComponentType } from '@fullcalendar/common'
import { Fragment, useState, SyntheticEvent } from 'react'
import Router from 'next/router'

type TransitionProps = Omit<SlideProps, 'direction'>

const TransitionUp = (props: TransitionProps) => {
  return <Slide {...props} direction='down' />
}

interface Props {
  product: {
    id: string
    name: string
    price: number
    description: string
  }
  setItemsCart: any
}

const Product = (props: Props) => {
  const [transition, setTransition] = useState<ComponentType<TransitionProps>>()

  // ** State
  const [open, setOpen] = useState<boolean>(false)
  const [message, setMessage] = useState<string>()

  const handleClick = (message: string) => {
    setTransition(() => TransitionUp)
    setMessage(message)
    setOpen(true)
  }

  const handleClose = (event?: Event | SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  async function handleAddToCart(event: any) {
    try {
      const r = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId: event.target.id, username: 'vovantung', quantity: 1 })
      }
      await fetch('https://lqx0l17k9f.execute-api.ap-southeast-1.amazonaws.com/cartitem', r)

      const r1 = {
        method: 'GET'
      }
      const response = await fetch(
        'https://lqx0l17k9f.execute-api.ap-southeast-1.amazonaws.com/cartitem/2c9e80818e69d39b018e69d3d2ee0000',
        r1
      )
      const itemsCart = await response.json()
      if (itemsCart !== undefined) {
        props.setItemsCart(itemsCart)
      }
      handleClick(event.target.name)
    } catch (error) {
      alert(error)
      Router.replace('/pages/misc/500-server-error')
    }
  }

  return (
    <Fragment>
      <Card>
        <CardContent sx={{ p: theme => `${theme.spacing(3, 5.25, 4)} !important` }}>
          <Typography variant='h6' sx={{ mb: 0 }}>
            {props.product.name}
          </Typography>
          <CardMedia sx={{ height: '15.375rem' }} image='/images/cards/abc.jpg' />

          <Typography sx={{ mb: 2 }}>${props.product.price}</Typography>
          <Typography sx={{ color: 'text.secondary' }}>{props.product.description}</Typography>
        </CardContent>
        <Button
          variant='contained'
          sx={{ py: 2.5, width: '50%', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          onClick={handleAddToCart}
          id={props.product.id}
          name={props.product.name}
        >
          Add To Cart
        </Button>

        <Button
          variant='tonal'
          sx={{ py: 2.5, width: '50%', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 0 }}
        >
          View Detail
        </Button>
      </Card>
      <Fragment>
        <Snackbar
          open={open}
          onClose={handleClose}
          autoHideDuration={1000}
          anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
          TransitionComponent={transition}
        >
          <Alert variant='filled' severity='success' onClose={handleClose} sx={{ width: '100%' }}>
            Added [{message}] to Cart
          </Alert>
        </Snackbar>
      </Fragment>
    </Fragment>
  )
}

export default Product
