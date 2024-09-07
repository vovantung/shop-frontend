// ** React Imports
import { ComponentType, Fragment, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'

// import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'

// import Stepper from '@mui/material/Stepper'
// import StepLabel from '@mui/material/StepLabel'
// import Typography from '@mui/material/Typography'
// import { useTheme } from '@mui/material/styles'

// import MuiStep, { StepProps } from '@mui/material/Step'
import CardContent from '@mui/material/CardContent'

// import CardContent, { CardContentProps } from '@mui/material/CardContent'

// ** Icon Imports
// import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
// import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Step Components
// import StepPropertyArea from 'src/views/shop/order/property-listing/StepPropertyArea'
import StepCustommerDetails from 'src/views/e-commerce/itemscart/property-cart/StepLuanchingSoon'

// import StepPropertyDetails from 'src/views/shop/order/property-listing/StepPropertyDetails'
import StepOrderDetails from 'src/views/e-commerce/itemscart/property-cart/StepCartDetails'

// import StepPropertyFeatures from 'src/views/shop/order/property-listing/StepPropertyFeatures'

// ** Util Import
// import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// import Router from 'next/router'

// ** Styled Components
// import StepperWrapper from 'src/@core/styles/mui/stepper'
import { Alert, Divider, Grid, Slide, SlideProps, Snackbar } from '@mui/material'
import { SyntheticEvent } from 'react-draft-wysiwyg'
import Router from 'next/router'

const steps = [
  {
    icon: 'carbon:order-details',
    title: 'Order Details',
    subtitle: ''
  },
  {
    title: 'Customer information',
    subtitle: '',
    icon: 'tabler:users'
  }
]

// const StepperHeaderContainer = styled(CardContent)<CardContentProps>(({ theme }) => ({
//   borderRight: `1px solid ${theme.palette.divider}`,
//   [theme.breakpoints.down('lg')]: {
//     borderRight: 0,
//     borderBottom: `1px solid ${theme.palette.divider}`
//   }
// }))

// const Step = styled(MuiStep)<StepProps>(({ theme }) => ({
//   '& .MuiStepLabel-root': {
//     paddingTop: 0
//   },
//   '&:not(:last-of-type) .MuiStepLabel-root': {
//     paddingBottom: theme.spacing(5)
//   },
//   '&:last-of-type .MuiStepLabel-root': {
//     paddingBottom: 0
//   },
//   '& .MuiStepLabel-iconContainer': {
//     display: 'none'
//   },
//   '& .step-subtitle': {
//     color: `${theme.palette.text.disabled} !important`
//   },
//   '& + svg': {
//     color: theme.palette.text.disabled
//   },
//   '&.Mui-completed .step-title': {
//     color: theme.palette.text.disabled
//   },
//   '& .MuiStepLabel-label': {
//     cursor: 'pointer'
//   }
// }))

interface Cart {
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

type TransitionProps = Omit<SlideProps, 'direction'>

const TransitionUp = (props: TransitionProps) => {
  return <Slide {...props} direction='down' />
}

const PropertyOrder = () => {
  // ** States
  const [activeStep, setActiveStep] = useState<number>(0)

  // ** Hook
  // const theme = useTheme()

  const [itemsCart, setItemsCart] = useState<Cart[]>([])

  // const [restart, setRestart] = useState<boolean>(false)
  const [init, setInit] = useState<boolean>(false)
  const [note, setNote] = useState<string>()

  // ** State
  const [open, setOpen] = useState<boolean>(false)
  const [message, setMessage] = useState<string>()
  const [transition, setTransition] = useState<ComponentType<TransitionProps>>()

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

  function handleSetNote(note: any) {
    setNote(note)
  }

  useEffect(() => {
    if (!init) {
      loadItemsCart()
    }
  })

  async function loadItemsCart() {
    setInit(true)
    try {
      const r = {
        method: 'GET'
      }
      const response = await fetch(
        'https://fsaooroft7.execute-api.ap-southeast-1.amazonaws.com/cartitem/2c9e80818e69d39b018e69d3d2ee0000',
        r
      )
      const itemsCart = await response.json()
      if (itemsCart !== undefined) {
        setItemsCart(itemsCart)
      }
    } catch (error) {
      Router.replace('/pages/misc/500-server-error')
    }
  }

  // Handle Stepper
  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }
  const handlePrev = () => {
    if (activeStep !== 0) {
      setActiveStep(activeStep - 1)
    }
  }

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <StepOrderDetails note={note} setNote={handleSetNote} />
      case 1:
        return <StepCustommerDetails />
      default:
        return null
    }
  }

  const renderContent = () => {
    return getStepContent(activeStep)
  }

  const renderFooter = () => {
    const stepCondition = activeStep === steps.length - 1

    return (
      <Box sx={{ mt: 6, justifyContent: 'space-between' }}>
        <div style={{ textAlign: 'center' }}>
          <Button
            sx={{ marginRight: '10px' }}
            variant='contained'
            color='primary'
            onClick={handlePrev}
            disabled={activeStep === 0}

            // startIcon={<Icon icon={theme.direction === 'ltr' ? 'tabler:arrow-left' : 'tabler:arrow-right'} />}
          >
            Previous
          </Button>
          <Button
            sx={{ marginLeft: '10px' }}
            disabled={!itemsCart.length}
            variant='contained'
            color={stepCondition ? 'success' : 'primary'}
            onClick={() => (stepCondition ? handlePlaceOrder() : handleNext())}

            // endIcon={
            //   <Icon
            //     icon={
            //       stepCondition
            //         ? 'tabler:check'
            //         : theme.direction === 'ltr'
            //         ? 'tabler:arrow-right'
            //         : 'tabler:arrow-left'
            //     }
            //   />
            // }
          >
            {stepCondition ? 'Place Order' : 'Next'}
          </Button>
        </div>
      </Box>
    )
  }

  function handlePlaceOrder() {
    handlePlaceOrder0()
  }

  async function handlePlaceOrder0() {
    try {
      const r = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: 'vovantung', note: note })
      }
      const response = await fetch('https://fsaooroft7.execute-api.ap-southeast-1.amazonaws.com/order', r)
      const order = await response.json()

      if (order !== undefined) {
        handleRemoveCart('2c9e80818e69d39b018e69d3d2ee0000')
        handleClick('/e-commerce/order/print/' + order.id)
      }
    } catch (error) {
      Router.replace('/pages/misc/500-server-error')
    }

    // Router.push('/e-commerce/order/print/' + order.id)

    // window.location.replace('/e-commerce/order/print/' + order.id)
  }

  function handleRemoveCart(userId: string) {
    handleRemoveCart0(userId)
  }

  async function handleRemoveCart0(userId: string) {
    if (userId === '') {
      return
    }
    try {
      const r = {
        method: 'DELETE'
      }
      await fetch('https://fsaooroft7.execute-api.ap-southeast-1.amazonaws.com/cartitem/' + userId, r)
    } catch (error) {
      Router.replace('/pages/misc/500-server-error')
    }
  }

  return (
    <Card>
      <Grid container>
        {/* <Grid item xs={12} sm={4} lg={2.5}>
          <CardContent sx={{ pt: theme => `${theme.spacing(6)} !important` }}>
            {steps.map((step, index) => {
              const RenderAvatar = activeStep >= index ? CustomAvatar : Avatar

              return (
                <Step
                  key={index}
                  onClick={() => setActiveStep(index)}
                  sx={{ '&.Mui-completed + svg': { color: 'primary.main' } }}
                >
                  <StepLabel>
                    <div className='step-label'>
                      <RenderAvatar
                        variant='rounded'
                        {...(activeStep >= index && { skin: 'light' })}
                        {...(activeStep === index && { skin: 'filled' })}
                        {...(activeStep >= index && { color: 'primary' })}
                        sx={{
                          ...(activeStep === index && { boxShadow: theme => theme.shadows[3] }),
                          ...(activeStep > index && { color: theme => hexToRGBA(theme.palette.primary.main, 0.4) })
                        }}
                      >
                        <Icon icon={step.icon} fontSize='1.5rem' />
                      </RenderAvatar>
                      <div>
                        <Typography className='step-title'>{step.title}</Typography>
                        <Typography className='step-subtitle'>{step.subtitle}</Typography>
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              )
            })}
          </CardContent>
        </Grid> */}

        {/* <Grid item xs={12} sm={8} lg={9.5}> */}
        <Grid item xs={12} sm={12} lg={12}>
          <CardContent sx={{ pt: theme => `${theme.spacing(6)} !important` }}>
            {renderContent()}
            <Divider sx={{ marginBottom: '10px', marginTop: '10px' }} />
            {renderFooter()}
          </CardContent>
        </Grid>
      </Grid>
      <Fragment>
        <Snackbar
          open={open}
          onClose={handleClose}
          autoHideDuration={4000}
          anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
          TransitionComponent={transition}
        >
          <Alert variant='filled' severity='success' onClose={handleClose} sx={{ width: '100%' }}>
            Created order to the e-commerce{' '}
            <a href={message} target='_blank'>
              link
            </a>
          </Alert>
        </Snackbar>
      </Fragment>
    </Card>
  )
}

export default PropertyOrder
