// ** MUI Imports
import Box from '@mui/material/Box'

import Input from '@mui/material/Input'

import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { MailLogType } from 'src/types/apps/emailTypes'
import ProductPage from './ProductPage'

const ContentProduct = (props: MailLogType) => {
  // ** Props
  const { query, lgAbove, setQuery, handleLeftSidebarToggle } = props

  return (
    <Box sx={{ width: '100%', overflow: 'hidden', position: 'relative', '& .ps__rail-y': { zIndex: 5 } }}>
      {/* <Box sx={{ height: '100%', backgroundColor: 'background.paper' }}> */}
      <Box sx={{ height: '100%', backgroundColor: 'none' }}>
        <Box sx={{ px: 5, py: 3.75, backgroundColor: 'white', marginBottom: 5, boxShadow: 1, borderRadius: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            {lgAbove ? null : (
              <IconButton onClick={handleLeftSidebarToggle} sx={{ mr: 1, ml: -2 }}>
                <Icon icon='tabler:menu-2' fontSize={20} />
              </IconButton>
            )}
            <Input
              value={query}
              placeholder='Search products'
              onChange={e => setQuery(e.target.value)}
              sx={{ width: '100%', '&:before, &:after': { display: 'none' } }}
              startAdornment={
                <InputAdornment position='start' sx={{ color: 'text.disabled' }}>
                  <Icon icon='tabler:search' />
                </InputAdornment>
              }
            />
          </Box>
        </Box>
        <ProductPage />
      </Box>

      {/* @ts-ignore */}
    </Box>
  )
}

export default ContentProduct
