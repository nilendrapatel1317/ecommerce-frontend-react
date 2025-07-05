import { Button, Typography } from '@mui/material'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 text-center">
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Tailwind + MUI + Framer + Lucide + Next.js 15!
        </Typography>
        <Button variant="contained" color="primary">
          Material UI Button
        </Button>
      </motion.div>
    </main>
  )
}
