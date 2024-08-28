// ** MUI Imports
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'

import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import { MailStore } from 'src/types/apps/emailTypes'
import { Dispatch } from 'react'
import { Card } from '@mui/material'

interface C {
  id: string
  name: string
  vaule: boolean
}

export type MailSidebarTypeT = {
  hidden: boolean
  store: MailStore
  lgAbove: boolean
  dispatch: Dispatch<any>
  leftSidebarOpen: boolean
  leftSidebarWidth: number
  mailDetailsOpen: boolean
  toggleComposeOpen: () => void
  handleLeftSidebarToggle: () => void
  setMailDetailsOpen: (val: boolean) => void
  handleSelectAllMail: (val: boolean) => void
  c: C[]
  handleCategory: any
}

const LeftSidebarProduct = (props: MailSidebarTypeT) => {
  // ** Props
  const { lgAbove, leftSidebarOpen, leftSidebarWidth, handleLeftSidebarToggle } = props

  return (
    <div style={{ height: '100%' }}>
      <Card style={{ marginRight: lgAbove ? '23px' : '0px' }}>
        <Drawer
          open={leftSidebarOpen}
          onClose={handleLeftSidebarToggle}
          variant={lgAbove ? 'permanent' : 'temporary'}
          ModalProps={{
            disablePortal: true,
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            marginRight: '0px',
            zIndex: 9999,
            display: 'block',
            position: lgAbove ? 'static' : 'absolute',
            '& .MuiDrawer-paper': {
              width: leftSidebarWidth,
              borderRadius: 0,
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
          <Box sx={{ marginRight: '20px', marginLeft: '20px', marginBottom: '20px' }}>
            <h4>Categries</h4>
            {props.c.map(x => (
              <FormGroup key={x.id + '1'} row>
                <FormControlLabel
                  label={x.name}
                  control={<Checkbox name='basic-checked' id={x.id} onChange={props.handleCategory} />}
                />
              </FormGroup>
            ))}
          </Box>
        </Drawer>
      </Card>
    </div>
  )
}

export default LeftSidebarProduct
