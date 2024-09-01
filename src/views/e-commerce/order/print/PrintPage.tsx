// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Import
// import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// import Alert from '@mui/material/Alert'
import Table from '@mui/material/Table'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import { styled, useTheme } from '@mui/material/styles'

import TableCell from '@mui/material/TableCell'

// ** Configs
import themeConfig from 'src/configs/themeConfig'
import { Alert, Link } from '@mui/material'
import Router from 'next/router'

interface OrderDetails {
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
  quantity: number
  createDatetime: string
  updateDatetime: string
}

const CalcWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2)
  }
}))

// const MUITableCell = styled(TableCell)<TableCellBaseProps>(({ theme }) => ({
//   borderBottom: 0,
//   paddingLeft: '0 !important',
//   paddingRight: '0 !important',
//   paddingTop: `${theme.spacing(1)} !important`,
//   paddingBottom: `${theme.spacing(1)} !important`
// }))

const OrderPrint = ({ id }: any) => {
  // ** State
  const [data, setData] = useState<OrderDetails[]>([])
  const [total, setTotal] = useState<number>(0)

  // ** Hooks
  const theme = useTheme()

  useEffect(() => {
    loadItems(id)
  }, [id])

  async function loadItems(id: string) {
    if (id == undefined || id == '' || id == null) {
      return
    }
    try {
      const r = {
        method: 'GET'
      }
      const response = await fetch(
        'https://alb-app1-1575328488.ap-southeast-1.elb.amazonaws.com:8080/order/items/' + id,
        r
      )
      const data = await response.json()
      if (data !== undefined) {
        setData(data)
      }

      // setTimeout(() => {
      //   window.print()
      // }, 500)

      let total = 0
      for (let index = 0; index < data.length; index++) {
        const element = data[index]
        total = total + element.quantity * element.id.productEntity.price
      }
      setTotal(total)
    } catch (error) {
      Router.replace('/pages/misc/500-server-error')
    }
  }

  if (data.length !== 0) {
    return (
      <Box sx={{ p: 12, pb: 6 }}>
        <Grid container>
          <Grid item xs={8} sx={{ mb: { sm: 0, xs: 4 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
                <svg width={34} viewBox='0 0 32 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    fill={theme.palette.primary.main}
                    d='M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z'
                  />
                  <path
                    fill='#161616'
                    opacity={0.06}
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z'
                  />
                  <path
                    fill='#161616'
                    opacity={0.06}
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z'
                  />
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    fill={theme.palette.primary.main}
                    d='M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z'
                  />
                </svg>
                <Typography variant='h4' sx={{ ml: 2.5, fontWeight: 700, lineHeight: '24px' }}>
                  {themeConfig.templateName}
                </Typography>
              </Box>
              <div>
                <Typography sx={{ mb: 1, color: 'text.secondary' }}>
                  Address: My An Hung B, Lap Vo, Dong Thap, Viet Nam.
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>Tel: (+84) 326.667.748</Typography>
              </div>
            </Box>
          </Grid>

          {/* <Grid item xs={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { sm: 'flex-end', xs: 'flex-start' } }}>
              <Typography variant='h4' sx={{ mb: 2 }}>
                {`Invoice #${invoice.id}`}
              </Typography>
              <Box sx={{ mb: 2, display: 'flex' }}>
                <Typography sx={{ mr: 3, color: 'text.secondary' }}>Date Issued:</Typography>
                <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>{invoice.issuedDate}</Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ mr: 3, color: 'text.secondary' }}>Date Due:</Typography>
                <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>{invoice.dueDate}</Typography>
              </Box>
            </Box>
          </Grid> */}
        </Grid>

        <Divider sx={{ my: theme => `${theme.spacing(6)} !important` }} />

        <Grid container>
          {/* <Grid item xs={7} md={8} sx={{ mb: { lg: 0, xs: 4 } }}>
            <Typography variant='h6' sx={{ mb: 3.5, fontWeight: 600 }}>
              Invoice To:
            </Typography>
            <Typography sx={{ mb: 2, color: 'text.secondary' }}>{invoice.name}</Typography>
            <Typography sx={{ mb: 2, color: 'text.secondary' }}>{invoice.company}</Typography>
            <Typography sx={{ mb: 2, color: 'text.secondary' }}>{invoice.address}</Typography>
            <Typography sx={{ mb: 2, color: 'text.secondary' }}>{invoice.contact}</Typography>
            <Typography sx={{ mb: 2, color: 'text.secondary' }}>{invoice.companyEmail}</Typography>
          </Grid> */}
          <Grid item xs={5} md={4}>
            <Typography variant='h6' sx={{ mb: 3.5, fontWeight: 600 }}>
              Bill To:
            </Typography>
            {/* <Table>
              <TableBody>
                <TableRow>
                  <MUITableCell sx={{ color: 'text.secondary' }}>Total Due:</MUITableCell>
                  <MUITableCell sx={{ fontWeight: 500, color: 'text.secondary' }}>{paymentDetails.totalDue}</MUITableCell>
                </TableRow>
                <TableRow>
                  <MUITableCell sx={{ color: 'text.secondary' }}>Bank name:</MUITableCell>
                  <MUITableCell sx={{ color: 'text.secondary' }}>{paymentDetails.bankName}</MUITableCell>
                </TableRow>
                <TableRow>
                  <MUITableCell sx={{ color: 'text.secondary' }}>Country:</MUITableCell>
                  <MUITableCell sx={{ color: 'text.secondary' }}>{paymentDetails.country}</MUITableCell>
                </TableRow>
                <TableRow>
                  <MUITableCell sx={{ color: 'text.secondary' }}>IBAN:</MUITableCell>
                  <MUITableCell sx={{ color: 'text.secondary' }}>{paymentDetails.iban}</MUITableCell>
                </TableRow>
                <TableRow>
                  <MUITableCell sx={{ color: 'text.secondary' }}>SWIFT code:</MUITableCell>
                  <MUITableCell sx={{ color: 'text.secondary' }}>{paymentDetails.swiftCode}</MUITableCell>
                </TableRow>
              </TableBody>
            </Table> */}
          </Grid>
        </Grid>

        <Divider sx={{ mt: theme => `${theme.spacing(6)} !important`, mb: '0 !important' }} />

        <Box sx={{ overflow: 'auto' }}>
          <Table sx={{ mb: 6 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontFamily: 'monospace' }}>
                  <span style={{ fontWeight: 'bold' }}>Item</span>
                </TableCell>
                <TableCell sx={{ fontFamily: 'monospace' }}>
                  <span style={{ fontWeight: 'bold' }}>Price</span>
                </TableCell>
                <TableCell sx={{ fontFamily: 'monospace' }}>
                  <span style={{ fontWeight: 'bold' }}>QTY</span>
                </TableCell>
                <TableCell sx={{ fontFamily: 'monospace' }}>
                  <span style={{ fontWeight: 'bold' }}>Total</span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                '& .MuiTableCell-root': {
                  py: `${theme.spacing(2.5)} !important`,
                  fontSize: theme.typography.body1.fontSize
                }
              }}
            >
              {data.map(item => (
                <TableRow key={item.id.productEntity.id}>
                  <TableCell sx={{ fontFamily: 'monospace' }}>{item.id.productEntity.name}</TableCell>
                  <TableCell sx={{ fontFamily: 'monospace' }}>{item.id.productEntity.price}</TableCell>
                  <TableCell sx={{ fontFamily: 'monospace' }}>{item.quantity}</TableCell>
                  <TableCell sx={{ fontFamily: 'monospace' }}>
                    <span style={{ color: '#5577bb' }}>{item.quantity * item.id.productEntity.price}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        <Grid container>
          <Grid item xs={4} sm={7} lg={9}>
            {/* <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', fontFamily: 'monospace' }}>
                Salesperson:
              </Typography>
              <Typography sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>Tommy Shelby</Typography>
            </Box>

            <Typography sx={{ color: 'text.secondary' }}>Thanks for your business</Typography> */}
          </Grid>
          <Grid item xs={8} sm={5} lg={3}>
            <CalcWrapper>
              <Typography sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>Subtotal:</Typography>
              <Typography sx={{ fontWeight: 500, color: 'text.secondary', fontFamily: 'monospace' }}>
                {total}VND
              </Typography>
            </CalcWrapper>
            <CalcWrapper>
              <Typography sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>Discount:</Typography>
              <Typography sx={{ fontWeight: 500, color: 'text.secondary', fontFamily: 'monospace' }}>0VND</Typography>
            </CalcWrapper>
            <CalcWrapper>
              <Typography sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>Tax:</Typography>
              <Typography sx={{ fontWeight: 500, color: 'text.secondary', fontFamily: 'monospace' }}>0VND</Typography>
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

        <Divider sx={{ my: `${theme.spacing(6)} !important` }} />
        <Typography sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>
          <strong>Note:</strong> It was a pleasure working with you and your team. We hope you will keep us in mind for
          future freelance projects. Thank You!
        </Typography>
      </Box>
    )
  } else {
    return (
      <Box sx={{ p: 5 }}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Alert severity='error'>
              Not found products that have orderId [{id}]. Please check the list of order.
              <Link href='/'>
                <br></br> Go to the order list
              </Link>
            </Alert>
          </Grid>
        </Grid>
      </Box>
    )
  }
}

export default OrderPrint
