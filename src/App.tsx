import { Box, CircularProgress, Container, Paper } from '@mui/material'
import { useContext } from 'react'
import { MainContext } from './contexts/main'
import { Explorer } from './components/Explorer'

export default function App() {
  const { loading } = useContext(MainContext)!
  
  return (
    <Container maxWidth="md">
      <Paper elevation={3}>
        <Explorer />
        {loading &&
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <CircularProgress />
          </Box>
        }
      </Paper>
    </Container>
  )
}
