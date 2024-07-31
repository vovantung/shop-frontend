// // ** React Imports
// import { Typography } from '@mui/material'

// import Grid from '@mui/material/Grid'

// import { MailLayoutType } from 'src/types/apps/emailTypes'

// const EmailAppLayout = ({}: MailLayoutType) => {
//   return (
//     <div>
//       <div>
//         <Grid item xs={12} sx={{ pb: 4 }}>
//           <Typography variant='h4'>Product</Typography>
//         </Grid>
//       </div>
//       <div></div>
//     </div>
//   )
// }

// export default EmailAppLayout

// ** React Imports
import { useState, useEffect } from 'react'
import { Typography } from '@mui/material'

import Grid from '@mui/material/Grid'

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
import { MailLayoutType, MailLabelColors } from 'src/types/apps/emailTypes'

// ** Email App Component Imports
import ContentProduct from 'src/views/shop/products/ContentProduct'
import LeftSidebarProduct from 'src/views/shop/products/LeftSidebarProduct'

// ** Actions
import {
  fetchMails,
  updateMail,
  paginateMail,
  getCurrentMail,
  updateMailLabel,
  handleSelectMail,
  handleSelectAllMail
} from 'src/store/apps/email'

// ** Variables
const labelColors: MailLabelColors = {
  private: 'error',
  personal: 'success',
  company: 'primary',
  important: 'warning'
}

const EmailAppLayout = ({ folder, label }: MailLayoutType) => {
  // ** States
  const [query, setQuery] = useState<string>('')
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

  // ** Vars
  const leftSidebarWidth = 300
  const { skin, direction } = settings

  const routeParams = {
    label: label || '',
    folder: folder || 'inbox'
  }

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchMails({ q: query || '', folder: routeParams.folder, label: routeParams.label }))
  }, [dispatch, query, routeParams.folder, routeParams.label])

  const toggleComposeOpen = () => setComposeOpen(!composeOpen)
  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen)

  return (
    <div>
      <div>
        <Grid item xs={12} sx={{ pb: 4 }}>
          <Typography variant='h4'>Product</Typography>
        </Grid>
      </div>
      <div>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            borderRadius: 0,
            overflow: 'hidden',
            position: 'relative',

            // boxShadow: skin === 'bordered' ? 0 : 6,
            // boxShadow: skin === 'bordered' ? 0 : 0,
            ...(skin === 'bordered' && { border: `1px solid ${theme.palette.divider}` })
          }}
        >
          <LeftSidebarProduct
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
            query={query}
            store={store}
            hidden={hidden}
            lgAbove={lgAbove}
            dispatch={dispatch}
            setQuery={setQuery}
            direction={direction}
            updateMail={updateMail}
            routeParams={routeParams}
            labelColors={labelColors}
            paginateMail={paginateMail}
            getCurrentMail={getCurrentMail}
            updateMailLabel={updateMailLabel}
            mailDetailsOpen={mailDetailsOpen}
            handleSelectMail={handleSelectMail}
            setMailDetailsOpen={setMailDetailsOpen}
            handleSelectAllMail={handleSelectAllMail}
            handleLeftSidebarToggle={handleLeftSidebarToggle}
          />
        </Box>
      </div>
    </div>
  )
}

export default EmailAppLayout
