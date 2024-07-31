// ** MUI Imports
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'

import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import { MailSidebarType } from 'src/types/apps/emailTypes'

const LeftSidebarProduct = (props: MailSidebarType) => {
  // ** Props
  const { lgAbove, leftSidebarOpen, leftSidebarWidth, handleLeftSidebarToggle } = props

  return (
    <div>
      <Drawer
        open={leftSidebarOpen}
        onClose={handleLeftSidebarToggle}
        variant={lgAbove ? 'permanent' : 'temporary'}
        ModalProps={{
          disablePortal: true,
          keepMounted: true // Better open performance on mobile.
        }}
        sx={{
          marginRight: '25px',
          zIndex: 9,
          display: 'block',
          position: lgAbove ? 'static' : 'absolute',
          '& .MuiDrawer-paper': {
            width: leftSidebarWidth,
            borderRadius: 1,
            zIndex: lgAbove ? 2 : 'drawer',
            position: lgAbove ? 'static' : 'absolute',
            border: 'none',
            backgroundColor: 'background.paper'
          },
          '& .MuiBackdrop-root': {
            position: 'absolute'
          }
        }}
      >
        <div>
          <Box sx={{ px: 5, py: 2 }}>
            <h4>Filter/Search products</h4>
            <FormGroup row>
              <FormControlLabel label='Apple' control={<Checkbox defaultChecked name='basic-checked' />} />
            </FormGroup>
            <FormGroup row>
              <FormControlLabel label='SamSung' control={<Checkbox defaultChecked name='basic-checked' />} />
            </FormGroup>
            <FormGroup row>
              <FormControlLabel label='Panasonic' control={<Checkbox defaultChecked name='basic-checked' />} />
            </FormGroup>
          </Box>
        </div>
      </Drawer>
    </div>
  )
}

export default LeftSidebarProduct
