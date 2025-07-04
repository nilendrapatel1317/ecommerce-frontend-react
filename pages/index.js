import { Button, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { Activity } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-4">
        <Activity className="w-12 h-12 text-blue-500 mx-auto" />
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
