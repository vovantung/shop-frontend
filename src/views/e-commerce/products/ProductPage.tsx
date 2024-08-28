import React from 'react'

// ** MUI Imports
// import Pagination from './PaginationTXU'
// import { Card, CardContent, Grid, IconButton } from '@mui/material'
// import Product from './Product'

// import Icon from 'src/@core/components/icon'
// import Input from '@mui/material/Input'

// import InputAdornment from '@mui/material/InputAdornment'
// import { Box } from '@mui/system'
import { render } from 'nprogress'

interface ProductT {
  id: string
  name: string
  price: number
  description: string
}

export type MailLogType1 = {
  lgAbove: boolean
  handleLeftSidebarToggle: () => void
  setItemsCart: any
  products: ProductT[]
  search: any
}

const ProductPage = () => {
  // const { lgAbove, handleLeftSidebarToggle, setItemsCart } = props

  // const [productsOfPage, setProductsOfPage] = useState<ProductT[]>([])

  // function handleSetItemsCart(itemsCart: []) {
  //   setItemsCart(itemsCart)
  // }

  // function onChangePage(productsOfPage_: any) {
  //   setProductsOfPage(productsOfPage_)
  // }

  // async function onSearch(event: any) {
  //   props.search(event.target.value)
  // }

  render()
  {
    return (
      <div>
        {/* <Card sx={{ marginBottom: '20px' }}>
          <CardContent sx={{ p: theme => `${theme.spacing(3, 5.25, 4)} !important` }}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              {lgAbove ? null : (
                <IconButton onClick={handleLeftSidebarToggle} sx={{ mr: 1, ml: -2 }}>
                  <Icon icon='tabler:menu-2' fontSize={20} />
                </IconButton>
              )}
              <Input
                placeholder='Search product'
                onChange={onSearch}
                sx={{ width: '100%', '&:before, &:after': { display: 'none' } }}
                startAdornment={
                  <InputAdornment position='start' sx={{ color: 'text.disabled' }}>
                    <Icon icon='tabler:search' />
                  </InputAdornment>
                }
              />
            </Box>
          </CardContent>
        </Card>

        <Grid container spacing={6}>
          {productsOfPage.map(product => (
            <Grid key={product.id} item xs={12} sm={6} md={4}>
              <Product setItemsCart={handleSetItemsCart} product={product} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ marginTop: '20px', marginBottom: '20px' }}>
          <Pagination pageSize={3} items={props.products} onChangePage={onChangePage} />
        </Box> */}
      </div>
    )
  }
}

export default ProductPage
