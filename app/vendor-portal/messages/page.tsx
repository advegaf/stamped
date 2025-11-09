'use client'

import { ChatInterface } from '@/components/client-portal/chat-interface'
import { motion } from 'framer-motion'

export default function VendorMessagesPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-neutral-900 mb-2">
          Messages
        </h1>
        <p className="text-lg text-neutral-600">
          Communicate with your assigned compliance officer
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="h-[calc(100vh-16rem)]"
      >
        <ChatInterface />
      </motion.div>
    </div>
  )
}

