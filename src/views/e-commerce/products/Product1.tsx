// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import React from 'react'

class Product1 extends React.Component {
  constructor() {
    super(0)
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  props = {
    product: {
      id: '',
      name: '',
      price: 0,
      description: ''
    },
    setItemsCount: function (itemCount: []) {
      itemCount
    }
  }

  async handleAddToCart(event: any) {
    const r = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId: event.target.id, username: 'vovantung', quantity: 1 })
    }
    const response = await fetch('http://localhost:8080/cartitem', r)
    const data = await response.json()
    if (data !== undefined) {
      // this.props.setItemsCount(event.target.id)
    }

    const r1 = {
      method: 'GET'
    }
    const response1 = await fetch('http://localhost:8080/cartitem/2c9e80818e69d39b018e69d3d2ee0000', r1)
    const data1 = await response1.json()
    if (data1 !== undefined) {
      this.props.setItemsCount(data1)
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

          <Typography sx={{ mb: 2 }}>${this.props.product.price}</Typography>
          <Typography sx={{ color: 'text.secondary' }}>{this.props.product.description}</Typography>
        </CardContent>
        <Button
          variant='contained'
          sx={{ py: 2.5, width: '50%', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          onClick={this.handleAddToCart}
          id={this.props.product.id}
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

export default Product1
