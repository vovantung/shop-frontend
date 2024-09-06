// ** MUI Imports
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'

import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import { Card, Input } from '@mui/material'

interface C {
  id: string
  name: string
  vaule: boolean
}

export type MailSidebarTypeT = {
  hidden: boolean
  lgAbove: boolean
  leftSidebarOpen: boolean
  leftSidebarWidth: number
  handleLeftSidebarToggle: () => void
  c: C[]
  handleCategory: any
  search: any
}

const LeftSidebarProduct = (props: MailSidebarTypeT) => {
  // ** Props
  const { lgAbove, leftSidebarOpen, leftSidebarWidth, handleLeftSidebarToggle } = props

  async function onSearch(event: any) {
    props.search(event.target.value)
  }

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
          <Box sx={{ marginRight: '20px', marginLeft: '20px', marginBottom: '20px', marginTop: '20px' }}>
            {/* <CardContent sx={{ p: theme => `${theme.spacing(3, 5.25, 4)} !important` }}> */}
            <Box sx={{ alignItems: 'center', width: '100%' }}>
              {/* {lgAbove ? null : (
                  <IconButton onClick={handleLeftSidebarToggle} sx={{ mr: 1, ml: -2 }}>
                    <Icon icon='tabler:menu-2' fontSize={20} />
                  </IconButton>
                )} */}
              <Input
                onChange={onSearch}
                placeholder='Search product'
                sx={{ width: '100%' }}

                // startAdornment={
                //   <InputAdornment position='start' sx={{ color: 'text.disabled' }}>
                //     <Icon icon='tabler:search' />
                //   </InputAdornment>
                // }
              />
            </Box>
            {/* </CardContent> */}

            <h4>Categories</h4>
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
