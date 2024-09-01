// ** React Imports
import { useState, useEffect, Fragment } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// import { useTheme } from '@mui/material/styles'

// import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// import InputAdornment from '@mui/material/InputAdornment'

// ** Type Imports
// import { CustomRadioIconsData, CustomRadioIconsProps } from 'src/@core/components/custom-radio/types'

// ** Icon Imports
// import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomTextField from 'src/@core/components/mui/text-field'

// import CustomRadioIcons from 'src/@core/components/custom-radio/icons'
import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import { Divider, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material'
import Router from 'next/router'
import { Icon } from '@iconify/react'

// import { minWidth, width } from '@mui/system'
// import { number } from 'yup'

// interface IconType {
//   icon: CustomRadioIconsProps['icon']
//   iconProps: CustomRadioIconsProps['iconProps']
// }

// const data: CustomRadioIconsData[] = [
//   {
//     value: 'builder',
//     isSelected: true,
//     content: 'List property as Builder, list your project and get highest reach.',
//     title: (
//       <Typography variant='h6' sx={{ mb: 1 }}>
//         I am the Builder
//       </Typography>
//     )
//   },
//   {
//     value: 'owner',
//     content: 'Submit property as an Individual. Lease, Rent or Sell at the best price.',
//     title: (
//       <Typography variant='h6' sx={{ mb: 1 }}>
//         I am the Owner
//       </Typography>
//     )
//   },
//   {
//     value: 'broker',
//     content: 'Earn highest commission by listing your clients properties at the best price.',
//     title: (
//       <Typography variant='h6' sx={{ mb: 1 }}>
//         I am the Broker
//       </Typography>
//     )
//   }
// ]

interface CartItem {
  id: {
    productEntity: {
      id: string
      name: string
      price: number
      description: string
      createDatetime: string
      updateDatetime: string
      rateAvg: number
    }
  }
  createDatetime: string
  updateDatetime: string
  quantity: number
}

const CalcWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2)
  }
}))

interface Props {
  setNote: any
  note: any
}

const StepOrderDetails = ({ setNote, note }: Props) => {
  // const initialIconSelected: string = data.filter(item => item.isSelected)[
  //   data.filter(item => item.isSelected).length - 1
  // ].value

  // ** States
  // const [showValues, setShowValues] = useState<boolean>(false)
  // const [selectedRadio, setSelectedRadio] = useState<string>(initialIconSelected)

  // ** Hook
  // const theme = useTheme()

  // const icons: IconType[] = [
  //   {
  //     icon: 'tabler:building',
  //     iconProps: { fontSize: '2.5rem', style: { marginBottom: 8 }, color: theme.palette.text.secondary }
  //   },
  //   {
  //     icon: 'tabler:diamond',
  //     iconProps: { fontSize: '2.5rem', style: { marginBottom: 8 }, color: theme.palette.text.secondary }
  //   },
  //   {
  //     icon: 'tabler:briefcase',
  //     iconProps: { fontSize: '2.5rem', style: { marginBottom: 8 }, color: theme.palette.text.secondary }
  //   }
  // ]

  // const handleTogglePasswordView = () => {
  //   setShowValues(!showValues)
  // }

  // const handleRadioChange = (prop: string | ChangeEvent<HTMLInputElement>) => {
  //   if (typeof prop === 'string') {
  //     setSelectedRadio(prop)
  //   } else {
  //     setSelectedRadio((prop.target as HTMLInputElement).value)
  //   }
  // }

  const [itemsCart, setItemsCart] = useState<CartItem[]>([])
  const [total, setTotal] = useState<number>(0)
  const [init, setInit] = useState<boolean>(false)

  function handleRemoveItemCart(event: any) {
    handleRemoveItemCart0(event)
  }
  async function handleRemoveItemCart0(event: any) {
    if (event.target.id == undefined || event.target.id == '' || event.target.id == null) {
      return
    }

    try {
      const id = event.target.id.substring(0, event.target.id.length - 1)
      const r = {
        method: 'DELETE'
      }
      const response = await fetch(
        'https://alb-app1-1575328488.ap-southeast-1.elb.amazonaws.com:8080/cartitem/2c9e80818e69d39b018e69d3d2ee0000/' +
          id,
        r
      )
      const data = await response.json()
      if (data !== undefined && data == 1) {
        const r1 = {
          method: 'GET'
        }
        const response1 = await fetch(
          'https://alb-app1-1575328488.ap-southeast-1.elb.amazonaws.com:8080/cartitem/2c9e80818e69d39b018e69d3d2ee0000',
          r1
        )
        const itemsCart = await response1.json()
        if (itemsCart !== undefined) {
          setItemsCart(itemsCart)
        }
      }
    } catch (error) {
      Router.replace('/pages/misc/500-server-error')
    }
  }

  useEffect(() => {
    if (!init) {
      loadItemsCart()
    }
  })

  async function loadItemsCart() {
    setInit(true)

    // ** Đặt itemsCart, tính toán tổng giá sản phẩm và tổng tiền giỏ hàng
    try {
      const r = {
        method: 'GET'
      }
      const response = await fetch(
        'https://alb-app1-1575328488.ap-southeast-1.elb.amazonaws.com:8080/cartitem/2c9e80818e69d39b018e69d3d2ee0000',
        r
      )
      const itemsCart = await response.json()
      if (itemsCart !== undefined) {
        setItemsCart(itemsCart)

        let total = 0
        for (let index = 0; index < itemsCart.length; index++) {
          const element = itemsCart[index]
          total = total + element.quantity * element.id.productEntity.price
        }
        setTotal(total)
      }
    } catch (error) {
      Router.replace('/pages/misc/500-server-error')
    }
  }

  async function handleChangeQuantity(event: any) {
    try {
      if (event.target.value > 0) {
        const r = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            productId: event.target.id,
            quantity: event.target.value,
            userId: '2c9e80818e69d39b018e69d3d2ee0000'
          })
        }
        await fetch('https://alb-app1-1575328488.ap-southeast-1.elb.amazonaws.com:8080/cartitem/update-quantity', r)
      }

      // ** Đặt lại itemsCart sau khi đã cập nhật quantity, tính toán lại tổng giá sản phẩm và tổng tiền giỏ hàng
      const r1 = {
        method: 'GET'
      }
      const response1 = await fetch(
        'https://alb-app1-1575328488.ap-southeast-1.elb.amazonaws.com:8080/cartitem/2c9e80818e69d39b018e69d3d2ee0000',
        r1
      )
      const itemsCart = await response1.json()
      if (itemsCart !== undefined) {
        setItemsCart(itemsCart)

        // ** Tính lại trị tổng tiền giỏ hàng
        let total = 0
        for (let index = 0; index < itemsCart.length; index++) {
          const element = itemsCart[index]
          total = total + element.quantity * element.id.productEntity.price
        }
        setTotal(total)
      }
    } catch (error) {
      Router.replace('/pages/misc/500-server-error')
    }
  }
  function handleSetNote(event: any) {
    setNote(event.target.value)
  }

  return (
    <>
      <Grid>
        <Typography variant='h4' sx={{ fontFamily: 'monospace' }}>
          ITEMS CART
        </Typography>
      </Grid>
      <Divider sx={{ mt: theme => `${theme.spacing(3)} !important`, mb: '0 !important' }} />
      <Box>
        <Box sx={{ overflow: 'auto' }}>
          <Table sx={{ marginBottom: '20px' }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <span style={{ fontWeight: 'bold' }}>Item</span>
                </TableCell>
                <TableCell>
                  <span style={{ fontWeight: 'bold' }}>Price</span>
                </TableCell>
                <TableCell>
                  <span style={{ fontWeight: 'bold' }}>QTY</span>
                </TableCell>
                <TableCell>
                  <span style={{ fontWeight: 'bold' }}>Total</span>
                </TableCell>
                <TableCell sx={{ fontFamily: 'monospace' }}>
                  <span style={{ fontWeight: 'bold' }}>Delete</span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody

            // sx={{
            //   '& .MuiTableCell-root': {
            //     py: `${theme.spacing(2.5)} !important`,
            //     fontSize: theme.typography.body1.fontSize
            //   }
            // }}
            >
              {itemsCart.map(item => (
                <TableRow key={item.id.productEntity.id}>
                  <TableCell sx={{ fontFamily: 'monospace' }}>{item.id.productEntity.name}</TableCell>
                  <TableCell sx={{ fontFamily: 'monospace' }}>{item.id.productEntity.price}</TableCell>
                  <TableCell>
                    <CustomTextField
                      id={item.id.productEntity.id}
                      type='number'
                      sx={{ width: '70px', fontFamily: 'monospace' }}
                      onChange={handleChangeQuantity}
                      value={item.quantity}
                    />
                  </TableCell>
                  <TableCell sx={{ fontFamily: 'monospace' }}>
                    <span style={{ color: '#5577bb' }}>{item.quantity * item.id.productEntity.price}</span>
                  </TableCell>
                  <TableCell sx={{ fontFamily: 'monospace' }}>
                    <IconButton aria-label='capture screenshot' color='primary' size='medium'>
                      <Icon
                        id={item.id.productEntity.id + '4'}
                        icon='ant-design:delete-outlined'
                        onClick={handleRemoveItemCart}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <Grid container>
          <Grid item xs={6} sm={7} lg={8}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', marginRight: '20px' }}>
              {/* <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Salesperson:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>Tommy Shelby</Typography> */}
              {/* <CustomTextField
                variant='filled'
                multiline
                rows='3'
                label='Note'
                id='textarea-outlined-static'
                fullWidth
              /> */}
              <TextField
                multiline
                rows={4}
                variant='outlined'
                label='Note'
                fullWidth
                onChange={handleSetNote}
                value={note}
              />
            </Box>

            {/* <Typography sx={{ color: 'text.secondary' }}>Thanks for your business</Typography> */}
          </Grid>

          <Grid item xs={6} sm={5} lg={4}>
            <CalcWrapper>
              <Typography sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>Subtotal:</Typography>
              <Typography sx={{ fontWeight: 400, color: 'text.secondary', fontFamily: 'monospace' }}>
                {total}VND
              </Typography>
            </CalcWrapper>
            <CalcWrapper>
              <Typography sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>Discount:</Typography>
              <Typography sx={{ fontWeight: 400, color: 'text.secondary', fontFamily: 'monospace' }}>0VND</Typography>
            </CalcWrapper>
            <CalcWrapper>
              <Typography sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>Tax:</Typography>
              <Typography sx={{ fontWeight: 400, color: 'text.secondary', fontFamily: 'monospace' }}>0VND</Typography>
            </CalcWrapper>
            <Divider sx={{ marginBottom: '10px' }} />
            <CalcWrapper>
              <Typography sx={{ fontWeight: 'bold', color: 'text.secondary', fontFamily: 'monospace' }}>
                Total:
              </Typography>
              <Typography sx={{ fontWeight: 'bold', color: '#335599', fontFamily: 'monospace' }}>{total}VND</Typography>
            </CalcWrapper>
          </Grid>
        </Grid>
        {/* <Divider sx={{ my: `${theme.spacing(6)} !important` }} />
        <Typography sx={{ color: 'text.secondary' }}>
          <strong>Note:</strong> It was a pleasure working with you and your team. We hope you will keep us in mind for
          future freelance projects. Thank You!
        </Typography> */}
      </Box>
    </>
  )
}

export default StepOrderDetails
