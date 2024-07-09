import CircularProgress from '@mui/material/CircularProgress'
import { usePageTitle } from './hooks/usePageTitle'
import { useLanguage } from './hooks/useLanguage'
import Typography from '@mui/material/Typography'
import { Explorer } from './components/Explorer'
import Container from '@mui/material/Container'
import { MainContext } from './contexts/main'
import { TITLE } from './constants/system'
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
        {!!TITLE && (
          <Box padding={3}>
            <Typography variant='h5'>{TITLE}</Typography>
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
