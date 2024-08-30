import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  IconButtonProps,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material'
import { Box, BoxProps } from '@mui/system'
import { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox'
import { Icon } from '@iconify/react'
import Router from 'next/router'
import CustomTextField from 'src/@core/components/mui/text-field'
import Pagination from '../products/PaginationTXU'
import IntervalManager from './IntervalManager'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import DatePicker from 'react-datepicker'
import CustomInput from './PickersCustomInput'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { render } from 'nprogress'

const CustomCloseButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  top: 0,
  right: 0,
  color: '#aa2222',
  position: 'absolute',
  boxShadow: theme.shadows[3],
  transform: 'translate(5px, -5px)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    transform: 'translate(0px, 0px)'
  }
}))

const CalcWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2)
  }
}))

interface ItemsOrder {
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

interface Order {
  id: string
  delivered: boolean
  paided: boolean
  note: string
  createDatetime: string
  updateDatetime: string
}

interface StateType {
  [key: string]: boolean
}

interface Statistical {
  id: string
  name: string
  total_mount: number
  total_quantity: number
}

const Orders = () => {
  const [total, setTotal] = useState<number>(0)
  const [tempId, setTempId] = useState<string>()

  const [date1, setDate1] = useState<DateType>(new Date())

  const [date2, setDate2] = useState<DateType>(new Date())

  const [viewItemsOrderDailog, setViewItemsOrderDailog] = useState<boolean>(false)
  const [changeNoteDailog, setChangeNoteDailog] = useState<boolean>(false)
  const [changeItemsOrderDailog, setChangeItemsOrderDailog] = useState<boolean>(false)
  const [statisticalDailog, setStatisticalDailog] = useState<boolean>(false)

  const toggleChangeNoteDailog = () => setChangeNoteDailog(!changeNoteDailog)
  const closeChangeNoteDailog = () => {
    toggleChangeNoteDailog()
  }

  const toggleChangeItemsOrderDailog = () => setChangeItemsOrderDailog(!changeItemsOrderDailog)
  const closeChangeItemsOrderDailog = () => {
    toggleChangeItemsOrderDailog()
  }

  const toggleViewItemsOrderDailog = () => setViewItemsOrderDailog(!viewItemsOrderDailog)
  const closeViewItemsOrderDailog = () => {
    toggleViewItemsOrderDailog()
  }

  const toggleStatisticalDailog = () => setStatisticalDailog(!statisticalDailog)
  const closeStatisticalDailog = () => {
    toggleStatisticalDailog()
  }

  const [orders, setOrders] = useState<Order[]>([])

  const [ordersOfPage, setOrdersOfPage] = useState<Order[]>([])

  const [itemsOrder, setItemsOrder] = useState<ItemsOrder[]>([])

  const [statistical, setStatistical] = useState<Statistical[]>([])

  const [init, setInit] = useState<boolean>(false)

  const [note, setNote] = useState<string>()

  const intervalManager = IntervalManager.getInstance()

  const [isAllOrder, setIsAllOrder] = useState<boolean>(true)

  const [state, setState] = useState<StateType>({
    checkAllOrder: false
  })

  function handleAutoFetch(event: any) {
    setState({ ...state, ['checkAllOrder']: event.target.checked })

    if (event.target.checked) {
      intervalManager.setInterval(loadOrders, 5000)
    } else {
      intervalManager.clearAllIntervals()
    }
  }
  function handleAllOrders(event: any) {
    // ** Kiểm tra điều kiện if nhằm tránh set vào state isAllOrder giá trị khác true hoặc false (undefined),
    // việc này có thể để tránh gây ra lỗi khi truyền tham sô isAllOrder gọi api
    if (event.target.checked !== undefined) {
      setIsAllOrder(event.target.checked)
    }
  }

  async function getViewItemsOrder(orderId: string) {
    try {
      if (orderId == undefined || orderId == '' || orderId == null) {
        return
      }
      const r = {
        method: 'GET',
        origin: '*'
      }
      const response = await fetch(
        'http://alb-app1-2004556221.ap-southeast-1.elb.amazonaws.com:8080/order/items/' + orderId,
        r
      )
      const itemsOrder = await response.json()
      if (itemsOrder !== undefined) {
        setItemsOrder(itemsOrder)
        toggleViewItemsOrderDailog()
      }
    } catch (error) {
      Router.replace('/pages/misc/500-server-error')
    }
  }

  async function getChangeItemsOfOrder(orderId: string) {
    try {
      if (orderId == undefined || orderId == '' || orderId == null) {
        return
      }
      const r = {
        method: 'GET',
        origin: '*'
      }
      const response = await fetch(
        'http://alb-app1-2004556221.ap-southeast-1.elb.amazonaws.com:8080/order/items/' + orderId,
        r
      )
      const itemsOrder = await response.json()
      if (itemsOrder !== undefined) {
        setItemsOrder(itemsOrder)
        toggleChangeItemsOrderDailog()
      }
    } catch (error) {
      Router.replace('/pages/misc/500-server-error')
    }
  }

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
      if (isAllOrder == undefined) {
        return
      }
      const r = {
        method: 'GET',
        origin: '*'
      }
      const response = await fetch(
        'http://alb-app1-2004556221.ap-southeast-1.elb.amazonaws.com:8080/order/2c9e80818e69d39b018e69d3d2ee0000/' +
          date1 +
          '/' +
          date2 +
          '/' +
          isAllOrder,
        r
      )
      const orders = await response.json()
      if (orders !== undefined) {
        setOrders(orders)
      }
    } catch (exception) {
      Router.replace('/pages/misc/500-server-error')
    }
  }

  async function handleChangeDelivered(event: any) {
    try {
      const id = event.target.id.substring(0, event.target.id.length - 1)
      if (id == undefined) {
        return
      }
      const r = {
        method: 'PUT',
        origin: '*',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderId: id,
          delivered: event.target.checked
        })
      }
      await fetch('http://alb-app1-2004556221.ap-southeast-1.elb.amazonaws.com:8080/order/delivered', r)
      loadOrders()
    } catch (error) {
      Router.replace('/pages/misc/500-server-error')
    }
  }

  async function handleChangePaided(event: any) {
    try {
      const id = event.target.id.substring(0, event.target.id.length - 1)
      if (id == undefined) {
        return
      }
      const r = {
        method: 'PUT',
        origin: '*',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderId: id,
          paided: event.target.checked
        })
      }
      await fetch('http://alb-app1-2004556221.ap-southeast-1.elb.amazonaws.com:8080/order/paided', r)

      loadOrders()
    } catch (error) {
      Router.replace('/pages/misc/500-server-error')
    }
  }

  async function handleRemoveOrder(event: any) {
    try {
      const id = event.target.id.substring(0, event.target.id.length - 1)
      if (!(id == '' || id == undefined)) {
        const r = {
          method: 'DELETE',
          origin: '*',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            orderId: id
          })
        }
        await fetch('http://alb-app1-2004556221.ap-southeast-1.elb.amazonaws.com:8080/order', r)
        loadOrders()
      }
    } catch (error) {
      Router.replace('/pages/misc/500-server-error')
    }
  }

  function handleViewItemsOrder(event: any) {
    const id = event.target.id.substring(0, event.target.id.length - 1)
    setTempId(id)
    getViewItemsOrder(id)
  }

  function handleEdit(event: any) {
    const id = event.target.id.substring(0, event.target.id.length - 1)
    setTempId(id)
    getChangeItemsOfOrder(id)
  }

  function handleRemoveItemOfOrder(event: any) {
    handleRemoveItemOfOrder0(event)
  }

  async function handleRemoveItemOfOrder0(event: any) {
    const id = event.target.id.substring(0, event.target.id.length - 1)
    if (id == undefined || id == '' || id == null) {
      return
    }
    try {
      const r = {
        method: 'DELETE',
        origin: '*'
      }
      await fetch('http://alb-app1-2004556221.ap-southeast-1.elb.amazonaws.com:8080/order/item/' + tempId + '/' + id, r)

      const r1 = {
        method: 'GET',
        origin: '*'
      }
      const response = await fetch(
        'http://alb-app1-2004556221.ap-southeast-1.elb.amazonaws.com:8080/order/items/' + tempId,
        r1
      )
      const orderDetails = await response.json()
      if (orderDetails !== undefined) {
        setItemsOrder(orderDetails)
      }
    } catch (error) {
      Router.replace('/pages/misc/500-server-error')
    }
  }

  async function handleChangeQuantity(event: any) {
    const id = event.target.id.substring(0, event.target.id.length - 1)
    if (id == undefined || id == '' || id == null) {
      return
    }
    try {
      if (event.target.value > 0) {
        const r = {
          method: 'POST',
          origin: '*',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            productId: id,
            quantity: event.target.value,
            orderId: tempId
          })
        }
        await fetch('http://alb-app1-2004556221.ap-southeast-1.elb.amazonaws.com:8080/order/item/update-quantity', r)
      }

      // ** Đặt lại itemsCart sau khi đã cập nhật quantity, tính toán lại tổng giá sản phẩm và tổng tiền giỏ hàng

      const r1 = {
        method: 'GET',
        origin: '*'
      }
      const response = await fetch(
        'http://alb-app1-2004556221.ap-southeast-1.elb.amazonaws.com:8080/order/items/' + tempId,
        r1
      )
      const orderDetails = await response.json()
      if (orderDetails !== undefined) {
        setItemsOrder(orderDetails)
      }
    } catch (error) {
      Router.replace('/pages/misc/500-server-error')
    }
  }

  function onChangePage(ordersOfPage_: any) {
    // update state with new page of items
    setOrdersOfPage(ordersOfPage_)
  }

  function onClickNote(event: any) {
    const id = event.target.id.substring(0, event.target.id.length - 1)
    setTempId(id)
    setNote(event.target.value)
    toggleChangeNoteDailog()
  }

  function onChangeTextNote(event: any) {
    setNote(event.target.value)
  }

  async function handleChangeNote() {
    closeChangeNoteDailog()
    try {
      const r = {
        method: 'PUT',
        origin: '*',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderId: tempId,
          note: note
        })
      }
      await fetch('http://alb-app1-2004556221.ap-southeast-1.elb.amazonaws.com:8080/order/note', r)
      loadOrders()
    } catch (error) {
      Router.replace('/pages/misc/500-server-error')
    }
  }

  async function handleStatistical() {
    try {
      if (isAllOrder == undefined) {
        return
      }
      const r = {
        method: 'GET',
        origin: '*'
      }

      const response = await fetch(
        'http://alb-app1-2004556221.ap-southeast-1.elb.amazonaws.com:8080/order/statistical/' + date1 + '/' + date2,
        r
      )
      const statistical = await response.json()
      if (statistical !== undefined) {
        let total = 0
        for (let index = 0; index < statistical.length; index++) {
          const element = statistical[index]
          total = total + element.total_quantity
        }
        setTotal(total)

        setStatistical(statistical)
        toggleStatisticalDailog()
      }
    } catch (exception) {
      Router.replace('/pages/misc/500-server-error')
    }
  }

  render()
  {
    return (
      <Card>
        <CardContent>
          <Grid container>
            <Grid item xs={12} sm={5} lg={7}>
              <Typography variant='h2' sx={{ fontFamily: 'monospace', marginBottom: '5px' }}>
                ORDER LIST
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3.5} lg={2.5}>
              <DatePickerWrapper style={{ textAlign: 'right', marginBottom: '10px' }}>
                <DatePicker
                  showYearDropdown
                  selected={date1}
                  onChange={(date: Date) => setDate1(date)}
                  placeholderText='Click to select a date'
                  customInput={<CustomInput label='' />}
                />
              </DatePickerWrapper>
            </Grid>
            <Grid item xs={12} sm={3.5} lg={2.5}>
              <DatePickerWrapper style={{ textAlign: 'right', marginBottom: '10px' }}>
                <DatePicker
                  showYearDropdown
                  selected={date2}
                  onChange={(date: Date) => setDate2(date)}
                  placeholderText='Click to select a date'
                  customInput={<CustomInput label='' />}
                />
              </DatePickerWrapper>
            </Grid>
          </Grid>
          <Divider sx={{ mt: theme => `${theme.spacing(3)} !important`, mb: '0 !important' }} />
          <Box sx={{ overflow: 'auto' }}>
            <Table sx={{ mb: 0 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontFamily: 'monospace' }}>
                    <span style={{ fontWeight: 'bold' }}>Create DateTime</span>
                  </TableCell>
                  <TableCell sx={{ fontFamily: 'monospace' }}>
                    <span style={{ fontWeight: 'bold' }}>Update DateTime</span>
                  </TableCell>
                  <TableCell sx={{ fontFamily: 'monospace' }}>
                    <span style={{ fontWeight: 'bold' }}>Note</span>
                  </TableCell>
                  <TableCell sx={{ fontFamily: 'monospace' }}>
                    <span style={{ fontWeight: 'bold' }}>Delivered</span>
                  </TableCell>
                  <TableCell sx={{ fontFamily: 'monospace' }}>
                    <span style={{ fontWeight: 'bold' }}>Paid</span>
                  </TableCell>
                  <TableCell sx={{ fontFamily: 'monospace' }}>
                    <span style={{ fontWeight: 'bold' }}>Details</span>
                  </TableCell>
                  <TableCell sx={{ fontFamily: 'monospace' }}>
                    <span style={{ fontWeight: 'bold' }}>Edit</span>
                  </TableCell>
                  <TableCell sx={{ fontFamily: 'monospace' }}>
                    <span style={{ fontWeight: 'bold' }}>Delete</span>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ordersOfPage.map(order => {
                  return (
                    <TableRow key={order.id}>
                      <TableCell sx={{ fontFamily: 'monospace' }}>{order.createDatetime}</TableCell>
                      <TableCell sx={{ fontFamily: 'monospace' }}>{order.updateDatetime}</TableCell>
                      <TableCell sx={{ fontFamily: 'monospace' }}>
                        <TextField
                          sx={{ minWidth: '120px' }}
                          id={order.id + '1'}
                          variant='outlined'
                          value={order.note}
                          size='small'
                          onClick={onClickNote}
                          label='Note'
                          InputProps={{ readOnly: true }}
                        />
                      </TableCell>
                      <TableCell sx={{ fontFamily: 'monospace' }}>
                        <FormGroup row>
                          <Checkbox id={order.id + '2'} checked={order.delivered} onClick={handleChangeDelivered} />
                        </FormGroup>
                      </TableCell>
                      <TableCell sx={{ fontFamily: 'monospace' }}>
                        <FormGroup row>
                          <Checkbox id={order.id + '3'} checked={order.paided} onClick={handleChangePaided} />
                        </FormGroup>
                      </TableCell>
                      <TableCell sx={{ fontFamily: 'monospace' }}>
                        <IconButton aria-label='capture screenshot' color='primary' size='medium'>
                          <Icon id={order.id + '4'} icon='lets-icons:view-alt-light' onClick={handleViewItemsOrder} />
                        </IconButton>
                      </TableCell>
                      <TableCell sx={{ fontFamily: 'monospace' }}>
                        <IconButton aria-label='capture screenshot' color='primary' size='medium'>
                          <Icon id={order.id + '5'} icon='iconamoon:edit-thin' onClick={handleEdit} />
                        </IconButton>
                      </TableCell>
                      <TableCell sx={{ fontFamily: 'monospace' }}>
                        <IconButton aria-label='capture screenshot' color='primary' size='medium'>
                          <Icon id={order.id + '6'} icon='ant-design:delete-outlined' onClick={handleRemoveOrder} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </Box>
          <Grid container sx={{ marginTop: '20px' }}>
            <Grid item xs={12} sm={6} lg={6}>
              {/* <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', marginRight: '20px' }}></Box> */}
              <Box sx={{ marginTop: '0px', marginBottom: '0px' }}>
                <Pagination items={orders} pageSize={5} onChangePage={onChangePage} />
              </Box>
            </Grid>

            <Grid item xs={12} sm={1} lg={1} style={{ textAlign: 'right' }}>
              <IconButton aria-label='capture screenshot' color='primary' size='medium'>
                <Icon icon='akar-icons:statistic-up' onClick={handleStatistical} />
              </IconButton>
            </Grid>
            <Grid item xs={12} sm={1} lg={1} style={{ textAlign: 'right' }}>
              <IconButton aria-label='capture screenshot' color='primary' size='medium'>
                <Icon icon='icon-park-outline:reload' onClick={loadOrders} />
              </IconButton>
            </Grid>
            <Grid item xs={12} sm={2} lg={2} style={{ textAlign: 'right' }}>
              <FormControlLabel
                label='All Orders'
                control={<Checkbox defaultChecked />}
                labelPlacement='start'
                onClick={handleAllOrders}
                disabled={state.checkAllOrder}
              />
            </Grid>

            <Grid item xs={12} sm={2} lg={2} style={{ textAlign: 'right' }}>
              <FormControlLabel
                label='Auto fetch'
                control={<Checkbox defaultChecked={false} />}
                labelPlacement='start'
                onClick={handleAutoFetch}
              />
            </Grid>
          </Grid>
        </CardContent>

        <Dialog
          fullWidth
          open={viewItemsOrderDailog}
          onClose={toggleViewItemsOrderDailog}
          sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
        >
          <DialogContent

          // sx={{
          //   px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          //   py: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          // }}
          >
            <CustomCloseButton onClick={closeViewItemsOrderDailog}>
              <Icon icon='pajamas:close-xs' fontSize='1.25rem' />
            </CustomCloseButton>

            {/* <Box sx={{ p: 12, pb: 6 }}>
              <Box sx={{ overflow: 'auto' }}>
                <Table sx={{ mb: 6 }}> */}
            <Box sx={{ p: 0, pb: 0 }}>
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
                  <TableBody>
                    {itemsOrder.map(item => (
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
            </Box>
            <div style={{ textAlign: 'center' }}>
              <Button
                variant='contained'
                sx={{ mr: 3.5 }}
                href={`/e-commerce/order/print/` + tempId}
                target='_blank'
                color='primary'
              >
                Print
              </Button>
              <Button variant='tonal' color='primary' onClick={closeViewItemsOrderDailog}>
                Ok
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog
          fullWidth
          open={changeItemsOrderDailog}
          onClose={toggleChangeItemsOrderDailog}
          sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
        >
          <DialogContent

          // sx={{
          //   px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          //   py: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          // }}
          >
            <CustomCloseButton onClick={closeChangeItemsOrderDailog}>
              <Icon icon='pajamas:close-xs' fontSize='1.25rem' />
            </CustomCloseButton>

            {/* <Box sx={{ p: 12, pb: 6 }}>
              <Box sx={{ overflow: 'auto' }}>
                <Table sx={{ mb: 6 }}> */}
            <Box sx={{ p: 0, pb: 0 }}>
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
                      <TableCell sx={{ fontFamily: 'monospace' }}>
                        <span style={{ fontWeight: 'bold' }}>Delete</span>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {itemsOrder.map(item => (
                      <TableRow key={item.id.productEntity.id}>
                        <TableCell sx={{ fontFamily: 'monospace' }}>{item.id.productEntity.name}</TableCell>
                        <TableCell sx={{ fontFamily: 'monospace' }}>{item.id.productEntity.price}</TableCell>
                        <TableCell>
                          <CustomTextField
                            id={item.id.productEntity.id + '1'}
                            type='number'
                            sx={{ width: '70px', fontFamily: 'monospace' }}
                            value={item.quantity}
                            onChange={handleChangeQuantity}
                          />
                        </TableCell>
                        <TableCell sx={{ fontFamily: 'monospace' }}>
                          <span style={{ color: '#5577bb' }}>{item.quantity * item.id.productEntity.price}</span>
                        </TableCell>
                        <TableCell sx={{ fontFamily: 'monospace' }}>
                          <IconButton aria-label='capture screenshot' color='primary' size='medium'>
                            <Icon
                              id={item.id.productEntity.id + '2'}
                              icon='ant-design:delete-outlined'
                              onClick={handleRemoveItemOfOrder}
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Box>
            <div style={{ textAlign: 'center' }}>
              <Button
                variant='contained'
                sx={{ mr: 3.5 }}
                href={`/e-commerce/order/print/` + tempId}
                target='_blank'
                color='primary'
              >
                Print
              </Button>
              <Button variant='tonal' color='primary' onClick={closeChangeItemsOrderDailog}>
                Ok
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog
          fullWidth
          open={changeNoteDailog}
          onClose={toggleChangeNoteDailog}
          sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
        >
          <DialogContent>
            <CustomCloseButton onClick={closeChangeNoteDailog}>
              <Icon icon='pajamas:close-xs' fontSize='1.25rem' />
            </CustomCloseButton>
            <Box sx={{ overflow: 'auto' }}>
              <Box sx={{ margin: '15px' }}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  variant='outlined'
                  defaultValue={note}
                  size='small'
                  label='Note'
                  onChange={onChangeTextNote}
                />
              </Box>
            </Box>
            <div style={{ textAlign: 'center' }}>
              <Button variant='contained' sx={{ mr: 3.5 }} color='primary' onClick={handleChangeNote}>
                Ok
              </Button>
              <Button variant='tonal' color='primary' onClick={closeChangeNoteDailog}>
                Cencel
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog
          fullWidth
          open={statisticalDailog}
          onClose={toggleStatisticalDailog}
          sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
        >
          <DialogContent>
            <CustomCloseButton onClick={closeStatisticalDailog}>
              <Icon icon='pajamas:close-xs' fontSize='1.25rem' />
            </CustomCloseButton>
            <Typography variant='h2' sx={{ fontFamily: 'monospace', marginBottom: '5px' }}>
              REVENUE STATISTICS
            </Typography>

            <CalcWrapper>
              <Typography sx={{ fontWeight: 'bold', color: '#888888', fontFamily: 'monospace' }}>
                Time period:
              </Typography>
              <Typography sx={{ color: '#88888', fontFamily: 'monospace' }}>
                From {date1?.toLocaleDateString()} to {date2?.toLocaleDateString()}
              </Typography>
            </CalcWrapper>

            <Divider sx={{ mt: theme => `${theme.spacing(0)} !important`, mb: '0 !important' }} />
            <Box sx={{ overflow: 'auto' }}>
              <Table sx={{ mb: 0 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontFamily: 'monospace' }}>
                      <span style={{ fontWeight: 'bold' }}> Product Name</span>
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'monospace' }}>
                      <span style={{ fontWeight: 'bold' }}>Quantity</span>
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'monospace' }}>
                      <span style={{ fontWeight: 'bold' }}>Total Mount</span>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {statistical.map(s => {
                    return (
                      <TableRow key={s.id}>
                        <TableCell sx={{ fontFamily: 'monospace' }}>{s.name}</TableCell>
                        <TableCell sx={{ fontFamily: 'monospace' }}>{s.total_mount}</TableCell>
                        <TableCell sx={{ fontFamily: 'monospace' }}>{s.total_quantity}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>

              <Grid container>
                <Grid item xs={4} sm={7} lg={7}></Grid>
                <Grid item xs={8} sm={5} lg={5} style={{ marginTop: '15px' }}>
                  <CalcWrapper>
                    <Typography sx={{ fontWeight: 'bold', color: '#888888', fontFamily: 'monospace' }}>
                      Total:
                    </Typography>
                    <Typography sx={{ fontWeight: 'bold', color: '#2233aa', fontFamily: 'monospace' }}>
                      {total}VND
                    </Typography>
                  </CalcWrapper>
                </Grid>
              </Grid>
            </Box>
            <div style={{ textAlign: 'center', marginTop: '15px' }}>
              <Button variant='contained' sx={{ mr: 3.5 }} color='primary' onClick={closeStatisticalDailog}>
                Ok
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </Card>
    )
  }
}
export default Orders
