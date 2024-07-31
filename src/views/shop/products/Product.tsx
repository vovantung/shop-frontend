// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import React from 'react'

class Product extends React.Component {
  props = {
    product: {
      name: '',
      price: 0,
      description: ''
    }
  }

  render() {
    return (
      <Card>
        <CardContent sx={{ p: theme => `${theme.spacing(3, 5.25, 4)} !important` }}>
          <Typography variant='h6' sx={{ mb: 0 }}>
            {this.props.product.name}
          </Typography>
          <CardMedia sx={{ height: '15.375rem' }} image='/images/cards/abc.jpg' />

          <Typography sx={{ mb: 2 }}>${this.props.product.price}AA</Typography>
          <Typography sx={{ color: 'text.secondary' }}>{this.props.product.description}</Typography>
        </CardContent>
        <Button
          variant='contained'
          sx={{ py: 2.5, width: '50%', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
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
    )
  }
}

export default Product
