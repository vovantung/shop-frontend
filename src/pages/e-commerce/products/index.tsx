// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Email App Component Imports
import ContentProduct from 'src/views/e-commerce/products/ContentProduct'
import LeftSidebarProduct from 'src/views/e-commerce/products/LeftSidebarProduct'

import Router from 'next/router'
import CategoryShowButton from 'src/pages/e-commerce/customizer'

interface ProductT {
  id: string
  name: string
  price: number
  description: string
}

interface C {
  id: string
  name: string
  vaule: boolean
}

export type ProductType = { setItemsCart: any }

const ProductPage = ({ setItemsCart }: ProductType) => {
  const handlesetItemsCart = (itemsCart: []) => {
    setItemsCart(itemsCart)
  }

  const [leftSidebarOpen, setLeftSidebarOpen] = useState<boolean>(false)

  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()
  const lgAbove = useMediaQuery(theme.breakpoints.up('lg'))
  const hidden = useMediaQuery(theme.breakpoints.down('lg'))

  const leftSidebarWidth = 300
  const { skin } = settings

  // const toggleComposeOpen = () => setComposeOpen(!composeOpen)
  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen)

  const [init, setInit] = useState<boolean>(false)

  const [products, setProducts] = useState<ProductT[]>([])

  const [keySearch, setKeySearch] = useState<string>('')

  const [categories, setCategories] = useState<[]>([])

  const [category, setCategory] = useState<C[]>([])

  useEffect(() => {
    if (!init) {
      initLoader()
    }
  })

  function initLoader() {
    if (!init) {
      setInit(true)
    }
    loadOrders()
  }

  async function loadOrders() {
    try {
      // // ** Nạp sản phẩm (Product)
      const r = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ categories: categories, keySearch: keySearch })
      }
      const response = await fetch('https://aqyt9pi0p6.execute-api.ap-southeast-1.amazonaws.com/product/filter', r)
      const products = await response.json()

      if (products !== undefined) {
        setProducts(products)
      }

      // ** Nạp giỏ hàng (ItemsCart) cho AppBarContent
      const r1 = {
        method: 'GET'
      }
      const response1 = await fetch(
        'https://aqyt9pi0p6.execute-api.ap-southeast-1.amazonaws.com/cartitem/2c9e80818e69d39b018e69d3d2ee0000',
        r1
      )
      const itemsCart = await response1.json()
      if (itemsCart !== undefined) {
        setItemsCart(itemsCart)
      }

      // ** Nạp Categories
      const r2 = {
        method: 'GET'
      }
      const response2 = await fetch('https://aqyt9pi0p6.execute-api.ap-southeast-1.amazonaws.com/category', r2)
      const c = await response2.json()
      if (c !== undefined) {
        setCategory(c)
      }
    } catch (error) {
      alert(error)
      Router.replace('/pages/misc/500-server-error')
    }
  }

  async function handleSearch(keySearch: any) {
    Search(categories, keySearch)
    setKeySearch(keySearch)
  }

  async function Search(categories_: [], keySearch_: string) {
    try {
      // ** Nạp sản phẩm (Product)
      const r = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ categories: categories_, keySearch: keySearch_ })
      }
      const response = await fetch('https://aqyt9pi0p6.execute-api.ap-southeast-1.amazonaws.com/product/filter', r)
      const products = await response.json()

      if (products !== undefined) {
        setProducts(products)
      }
    } catch (error) {
      Router.replace('/pages/misc/500-server-error')
    }
  }

  function handleCategory(event: any) {
    const categoryTemp: any = []

    if (!event.target.checked) {
      categories.forEach(x => {
        if (event.target.id !== x) {
          categoryTemp.push(x)
        }
      })
      setCategories(categoryTemp)
    } else {
      categories.forEach(x => {
        categoryTemp.push(x)
      })
      categoryTemp.push(event.target.id)
      setCategories(categoryTemp)
    }

    Search(categoryTemp, keySearch)
  }

  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          borderRadius: 0,
          boxShadow: skin === 'bordered' ? 0 : 0,
          ...(skin === 'bordered' && { border: `0px solid ${theme.palette.divider}` })
        }}
      >
        <LeftSidebarProduct
          search={handleSearch}
          handleCategory={handleCategory}
          c={category}
          hidden={hidden}
          lgAbove={lgAbove}
          leftSidebarOpen={leftSidebarOpen}
          leftSidebarWidth={leftSidebarWidth}
          handleLeftSidebarToggle={handleLeftSidebarToggle}
        />
        <ContentProduct setItemsCart={handlesetItemsCart} products={products} />
      </Box>
      {lgAbove ? null : <CategoryShowButton click={handleLeftSidebarToggle} />}
    </>
  )
}

export default ProductPage
