import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const Toggler = styled(Box)<BoxProps>(({ theme }) => ({
  left: 0,
  top: '50%',
  display: 'flex',
  cursor: 'pointer',
  position: 'fixed',
  padding: theme.spacing(2),
  zIndex: theme.zIndex.modal,
  transform: 'translateY(-50%)',
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary.main,
  borderTopRightRadius: theme.shape.borderRadius,
  borderBottomRightRadius: theme.shape.borderRadius
}))

interface Drop {
  click: any
}

const CustomizerT = ({ click }: Drop) => {
  return (
    <div className='customizer'>
      <Toggler className='customizer-toggler' onClick={click}>
        <Icon icon='tabler:settings' />
      </Toggler>
    </div>
  )
}

export default CustomizerT
