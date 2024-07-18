import CircularProgress from '@mui/material/CircularProgress'
import { usePageTitle } from './hooks/usePageTitle'
import { useLanguage } from './hooks/useLanguage'
import Typography from '@mui/material/Typography'
import { LOGO, TITLE } from './constants/system'
import { Explorer } from './components/Explorer'
import Container from '@mui/material/Container'
import { MainContext } from './contexts/main'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import { useContext } from 'react'

export default function App() {
  const { loading } = useContext(MainContext)!
  usePageTitle(TITLE)
  useLanguage()
  
  return (
    <>
      <Container maxWidth="md">
        {(!!TITLE || !!LOGO) && (
          <Box padding={3} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            {!!TITLE && <Typography variant="h5">{TITLE}</Typography>}
            {!!LOGO && <img style={{ width: 'auto', height: 'auto', maxWidth: '30%' }} src={LOGO} alt="Logo" />}
          </Box>
        )}
        <Paper elevation={3}>
          <Explorer />
          {loading &&
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} padding={3}>
              <CircularProgress />
            </Box>
          }
        </Paper>
      </Container>
    </>
  )
}
