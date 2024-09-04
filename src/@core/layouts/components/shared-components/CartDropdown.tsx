// ** React Imports
import { useState, SyntheticEvent, Fragment, ReactNode } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Badge from '@mui/material/Badge'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { styled, Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiMenu, { MenuProps } from '@mui/material/Menu'
import MuiMenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import Typography, { TypographyProps } from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Components
import PerfectScrollbarComponent from 'react-perfect-scrollbar'

// ** Type Imports
// import { ThemeColor } from 'src/@core/layouts/types'
import { Settings } from 'src/@core/context/settingsContext'

// import { CustomAvatarProps } from 'src/@core/components/mui/avatar/types'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import Slide, { SlideProps } from '@mui/material/Slide'
import { ComponentType } from '@fullcalendar/common'
import { Alert, Snackbar } from '@mui/material'
import Router from 'next/router'

// import { redirect } from 'next/dist/server/api-utils'

type TransitionProps = Omit<SlideProps, 'direction'>

const TransitionUp = (props: TransitionProps) => {
  return <Slide {...props} direction='down' />
}

// import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Util Import
// import { getInitials } from 'src/@core/utils/get-initials'

// export type NotificationsType = {
//   meta: string
//   title: string
//   subtitle: string
// } & (
//   | { avatarAlt: string; avatarImg: string; avatarText?: never; avatarColor?: never; avatarIcon?: never }
//   | {
//       avatarAlt?: never
//       avatarImg?: never
//       avatarText: string
//       avatarIcon?: never
//       avatarColor?: ThemeColor
//     }
//   | {
//       avatarAlt?: never
//       avatarImg?: never
//       avatarText?: never
//       avatarIcon: ReactNode
//       avatarColor?: ThemeColor
//     }
// )

interface Cart {
  id: {
    productEntity: {
      id: string
      name: string
      description: string
    }
  }
  quantity: number
}

interface Props {
  settings: Settings

  // notifications: NotificationsType[]
  itemsCart: Cart[]
  setItemsCart: any
}

// ** Styled Menu component
const Menu = styled(MuiMenu)<MenuProps>(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: 380,
    overflow: 'hidden',
    marginTop: theme.spacing(4.25),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  '& .MuiMenu-list': {
    padding: 0,
    '& .MuiMenuItem-root': {
      margin: 0,
      borderRadius: 0,
      padding: theme.spacing(4, 6),
      '&:hover': {
        backgroundColor: theme.palette.action.hover
      }
    }
  }
}))

// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)<MenuItemProps>(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  '&:not(:last-of-type)': {
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))

// ** Styled PerfectScrollbar component
const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  maxHeight: 349
})

// ** Styled Avatar component
// const Avatar = styled(CustomAvatar)<CustomAvatarProps>({
//   width: 38,
//   height: 38,
//   fontSize: '1.125rem'
// })

// ** Styled component for the title in MenuItems
const MenuItemTitle = styled(Typography)<TypographyProps>({
  fontWeight: 500,
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
})

// ** Styled component for the subtitle in MenuItems
const MenuItemSubtitle = styled(Typography)<TypographyProps>({
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
})

const ScrollWrapper = ({ children, hidden }: { children: ReactNode; hidden: boolean }) => {
  if (hidden) {
    return <Box sx={{ maxHeight: 349, overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
  } else {
    return <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>
  }
}

const CartDropdown = (props: Props) => {
  // * state dùng cho transition của snackbar
  const [transition, setTransition] = useState<ComponentType<TransitionProps>>()

  // ** Props
  const { settings, itemsCart, setItemsCart } = props

  // const { settings, notifications, items } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null)

  // ** Hook
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  // ** Vars
  const { direction } = settings

  // ** State
  const [open, setOpen] = useState<boolean>(false)

  //  // ** Hook & Var
  //  const { settings } = useSettings()
  const { skin } = settings

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event?: Event | SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = () => {
    setAnchorEl(null)
  }
  function handleRemoveItemCart(event: any) {
    handleRemoveItemCart0(event)
    setTransition(() => TransitionUp)
  }
  async function handleRemoveItemCart0(event: any) {
    if (event.target.id === '') {
      return
    }
    try {
      const r = {
        method: 'DELETE'
      }
      const response = await fetch(
        'https://at6923hja1.execute-api.ap-southeast-1.amazonaws.com/cartitem/2c9e80818e69d39b018e69d3d2ee0000' +
          event.target.id,
        r
      )
      const data = await response.json()
      if (data !== undefined && data == 1) {
        handleClick()
        const r1 = {
          method: 'GET'
        }
        const response1 = await fetch(
          'https://at6923hja1.execute-api.ap-southeast-1.amazonaws.com/cartitem/2c9e80818e69d39b018e69d3d2ee0000',
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

  // const RenderAvatar = ({ notification }: { notification: NotificationsType }) => {
  //   const { avatarAlt, avatarImg, avatarIcon, avatarText, avatarColor } = notification

  //   if (avatarImg) {
  //     return <Avatar alt={avatarAlt} src={avatarImg} />
  //   } else if (avatarIcon) {
  //     return (
  //       <Avatar skin='light' color={avatarColor}>
  //         {avatarIcon}
  //       </Avatar>
  //     )
  //   } else {
  //     return (
  //       <Avatar skin='light' color={avatarColor}>
  //         {getInitials(avatarText as string)}
  //       </Avatar>
  //     )
  //   }
  // }

  return (
    <Fragment>
      <IconButton color='inherit' aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu'>
        <Badge
          badgeContent={itemsCart.length}
          color='error'
          invisible={!itemsCart.length}
          sx={{
            '& .MuiBadge-badge': { top: 4, right: 4, boxShadow: theme => `0 0 0 2px ${theme.palette.background.paper}` }
          }}

          // variant='dot'
        >
          <Icon fontSize='1.625rem' icon='tabler:shopping-cart' />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <MenuItem
          disableRipple
          disableTouchRipple
          sx={{ cursor: 'default', userSelect: 'auto', backgroundColor: 'transparent !important' }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography variant='h5' sx={{ cursor: 'text' }}>
              Total
            </Typography>
            <CustomChip skin='light' size='small' color='primary' label={`${itemsCart.length} items`} />
          </Box>
        </MenuItem>
        <ScrollWrapper hidden={hidden}>
          {/* {notifications.map((notification: NotificationsType, index: number) => (
            <MenuItem key={index} disableRipple disableTouchRipple onClick={handleDropdownClose}>
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                <RenderAvatar notification={notification} />
                <Box sx={{ mr: 4, ml: 2.5, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                  <MenuItemTitle>{notification.title}</MenuItemTitle>
                  <MenuItemSubtitle variant='body2'>{notification.subtitle}</MenuItemSubtitle>
                </Box>
                <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                  {notification.meta}
                </Typography>
              </Box>
            </MenuItem>
          ))} */}

          {itemsCart.map((items: Cart) => (
            <MenuItem key={items.id.productEntity.id} disableRipple disableTouchRipple>
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                {/* <RenderAvatar notification={items} /> */}
                <Box sx={{ mr: 4, ml: 2.5, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                  <MenuItemTitle>{items.id.productEntity.name}</MenuItemTitle>
                  <MenuItemSubtitle variant='body2'>{items.id.productEntity.description}</MenuItemSubtitle>
                </Box>

                <IconButton color='primary'>
                  <Icon
                    icon='ant-design:delete-outlined'
                    name={items.id.productEntity.name}
                    id={items.id.productEntity.id}
                    onClick={handleRemoveItemCart}
                  />
                </IconButton>
              </Box>
            </MenuItem>
          ))}
        </ScrollWrapper>
        <MenuItem
          disableRipple
          disableTouchRipple
          sx={{
            borderBottom: 0,
            cursor: 'default',
            userSelect: 'auto',
            backgroundColor: 'transparent !important',
            borderTop: theme => `1px solid ${theme.palette.divider}`
          }}
        >
          {/* <Button fullWidth variant='contained' onClick={handleDropdownClose}>
            Place Order
          </Button> */}

          <Button fullWidth variant='contained' href={`/e-commerce/itemscart`} disabled={!itemsCart.length}>
            Place Order
          </Button>
        </MenuItem>
      </Menu>

      <Fragment>
        <Snackbar
          open={open}
          onClose={handleClose}
          autoHideDuration={1000}
          anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
          TransitionComponent={transition}
        >
          <Alert
            variant='filled'
            severity='warning'
            onClose={handleClose}
            sx={{ width: '100%' }}
            elevation={skin === 'bordered' ? 0 : 3}
          >
            Removed
          </Alert>
        </Snackbar>
      </Fragment>
    </Fragment>
  )
}

export default CartDropdown
