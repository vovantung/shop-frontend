// ** React Imports
import { useEffect, useState } from 'react'

// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux'

// ** MUI Imports
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Types
import { RootState, AppDispatch } from 'src/store'
import { MailLayoutType1 } from 'src/types/apps/emailTypes'

// ** Email App Component Imports
import ContentProduct from 'src/views/e-commerce/products/ContentProduct'
import LeftSidebarProduct from 'src/views/e-commerce/products/LeftSidebarProduct'

// ** Actions
import { handleSelectAllMail } from 'src/store/apps/email'
import Router from 'next/router'
import axios from 'axios'

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

const EmailAppLayout = ({ setItemsCart }: MailLayoutType1) => {
  const handlesetItemsCart = (itemsCart: []) => {
    setItemsCart(itemsCart)
  }

  // ** States

  const [composeOpen, setComposeOpen] = useState<boolean>(false)
  const [mailDetailsOpen, setMailDetailsOpen] = useState<boolean>(false)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState<boolean>(false)

  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()
  const dispatch = useDispatch<AppDispatch>()
  const lgAbove = useMediaQuery(theme.breakpoints.up('lg'))
  const hidden = useMediaQuery(theme.breakpoints.down('lg'))
  const store = useSelector((state: RootState) => state.email)

  const leftSidebarWidth = 300
  const { skin } = settings

  const toggleComposeOpen = () => setComposeOpen(!composeOpen)
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
      // const r = {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ categories: categories, keySearch: keySearch })
      // }
      // const response = await fetch('http://alb-app1-1640396686.ap-southeast-1.elb.amazonaws.com:8080/product/filter', r)
      // const products = await response.json()

      // if (products !== undefined) {
      //   setProducts(products)
      // }

      // // ** Nạp giỏ hàng (ItemsCart) cho AppBarContent
      // const r1 = {
      //   method: 'GET'
      // }
      // const response1 = await fetch(
      //   'http://alb-app1-1640396686.ap-southeast-1.elb.amazonaws.com:8080/cartitem/2c9e80818e69d39b018e69d3d2ee0000',
      //   r1
      // )
      // const itemsCart = await response1.json()
      // if (itemsCart !== undefined) {
      //   setItemsCart(itemsCart)
      // }

      // // ** Nạp Categories
      // const r2 = {
      //   method: 'GET'
      // }
      // const response2 = await fetch('http://alb-app1-1640396686.ap-southeast-1.elb.amazonaws.com:8080/category', r2)
      // const c = await response2.json()
      // if (c !== undefined) {
      //   setCategory(c)
      // }

      // setCategory([])
      const r1 = {
        method: 'GET'
      }
      const response1 = await fetch('https://catfact.ninja/fact', r1)
      const itemsCart = await response1.json()
      if (itemsCart !== undefined) {
        alert(itemsCart.fact)
      }

      const res = await axios.get('http://alb-app1-1640396686.ap-southeast-1.elb.amazonaws.com:8080/health-check')
      const rs = await res.data
      if (itemsCart !== undefined) {
        alert(rs)
      }

      setCategory([])
    } catch (error) {
      alert(error)

      // Router.replace('/pages/misc/500-server-error')
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
      const response = await fetch('http://alb-app1-1640396686.ap-southeast-1.elb.amazonaws.com:8080/product/filter', r)
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
          handleCategory={handleCategory}
          c={category}
          store={store}
          hidden={hidden}
          lgAbove={lgAbove}
          dispatch={dispatch}
          mailDetailsOpen={mailDetailsOpen}
          leftSidebarOpen={leftSidebarOpen}
          leftSidebarWidth={leftSidebarWidth}
          toggleComposeOpen={toggleComposeOpen}
          setMailDetailsOpen={setMailDetailsOpen}
          handleSelectAllMail={handleSelectAllMail}
          handleLeftSidebarToggle={handleLeftSidebarToggle}
        />
        <ContentProduct
          search={handleSearch}
          products={products}
          lgAbove={lgAbove}
          handleLeftSidebarToggle={handleLeftSidebarToggle}
          setItemsCart={handlesetItemsCart}
        />
      </Box>
    </>
  )
}

export default EmailAppLayout
