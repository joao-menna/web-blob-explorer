import { Box, CircularProgress, Container, Paper } from '@mui/material'
import { Explorer } from './components/Explorer'
import { MainContext } from './contexts/main'
import { useContext } from 'react'

export default function App() {
  const { loading } = useContext(MainContext)!
  
  return (
    <>
      <Container maxWidth="md">
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
