// ** MUI Imports
import { Typography } from '@mui/material'
import { Box, BoxProps, styled } from '@mui/system'

// ** Styled Components
const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '95vw'
  }
}))

const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    height: 240,
    marginTop: theme.spacing(0)
  },
  [theme.breakpoints.down('md')]: {
    height: 200
  },
  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(0)
  }
}))

const StepLuanchingSoon = () => {
  return (
    <Box className='content-center'>
      <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <BoxWrapper>
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant='h2' sx={{ mb: 1.5 }}>
              We are launching soon
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              We're creating something awesome. Please subscribe to get notified when it's ready!
            </Typography>
          </Box>
        </BoxWrapper>
        <Img height='240' alt='coming-soon-illustration' src='/images/pages/misc-coming-soon.png' />
      </Box>
    </Box>
  )
}

export default StepLuanchingSoon
