import React from 'react'

// ** MUI Imports
// import Grid from '@mui/material/Grid'

// ** Demo Components Imports
// import Product from './Product'
import PaginationT from './PaginationT'
import { Grid } from '@mui/material'
import Product from './Product'

class ProductPage extends React.Component {
  constructor() {
    super(0, 0)

    // this.state = {
    //   exampleItems: [],
    //   pageOfItems: []
    // }

    // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
    this.onChangePage = this.onChangePage.bind(this)
  }

  state = {
    exampleItems: [],
    pageOfItems: []
  }

  onChangePage(pageOfItems_: any) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems_ })
  }

  async componentDidMount() {
    const r = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ categories: [], keySearch: '' })
    }
    const response = await fetch('http://localhost:8080/product/filter', r)
    const data = await response.json()

    if (data !== undefined) {
      this.setState({ exampleItems: data })
    }
  }

  render() {
    return (
      <div>
        <Grid container spacing={6}>
          {this.state.pageOfItems.map(product => (
            <Grid key={product} item xs={12} sm={6} md={4}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>

        <PaginationT items={this.state.exampleItems} onChangePage={this.onChangePage} />
      </div>
    )
  }
}

export default ProductPage
