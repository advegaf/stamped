/**
 * Real-Time Update Service
 * Simulates WebSocket-like behavior for real-time updates across the application
 */

type EventType = 'document:uploaded' | 'document:status_changed' | 'message:sent' | 'data:updated'

interface Event {
  type: EventType
  data: any
  timestamp: number
}

type EventCallback = (data: any) => void

class RealtimeService {
  private subscribers: Map<EventType, Set<EventCallback>> = new Map()
  private eventHistory: Event[] = []

  /**
   * Subscribe to a specific event type
   */
  subscribe(eventType: EventType, callback: EventCallback): () => void {
    if (!this.subscribers.has(eventType)) {
      this.subscribers.set(eventType, new Set())
    }

    this.subscribers.get(eventType)!.add(callback)

    // Return unsubscribe function
    return () => {
      this.subscribers.get(eventType)?.delete(callback)
    }
  }

  /**
   * Emit an event to all subscribers
   */
  emit(eventType: EventType, data: any) {
    const event: Event = {
      type: eventType,
      data,
      timestamp: Date.now(),
    }

    // Store in history
    this.eventHistory.push(event)

    // Keep only last 100 events
    if (this.eventHistory.length > 100) {
      this.eventHistory.shift()
    }

    // Notify all subscribers
    const callbacks = this.subscribers.get(eventType)
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback(data)
        } catch (error) {
          console.error('Error in realtime callback:', error)
        }
      })
    }
  }

  /**
   * Subscribe to document updates for a specific entity
   */
  subscribeToDocuments(entityId: string, entityType: 'client' | 'vendor', callback: (documents: any[]) => void): () => void {
    const documentCallback = (data: any) => {
      if (data.entityId === entityId && data.entityType === entityType) {
        callback(data.documents || [])
      }
    }

    const unsubscribeUploaded = this.subscribe('document:uploaded', documentCallback)
    const unsubscribeStatus = this.subscribe('document:status_changed', documentCallback)

    // Return combined unsubscribe function
    return () => {
      unsubscribeUploaded()
      unsubscribeStatus()
    }
  }

  /**
   * Subscribe to message updates for a specific conversation
   */
  subscribeToMessages(conversationId: string, callback: (messages: any[]) => void): () => void {
    const messageCallback = (data: any) => {
      if (data.conversationId === conversationId) {
        callback(data.messages || [])
      }
    }

    return this.subscribe('message:sent', messageCallback)
  }

  /**
   * Subscribe to document status changes
   */
  subscribeToDocumentStatus(documentId: string, callback: (document: any) => void): () => void {
    const statusCallback = (data: any) => {
      if (data.documentId === documentId) {
        callback(data.document)
      }
    }

    return this.subscribe('document:status_changed', statusCallback)
  }

  /**
   * Get event history
   */
  getEventHistory(eventType?: EventType): Event[] {
    if (eventType) {
      return this.eventHistory.filter(event => event.type === eventType)
    }
    return [...this.eventHistory]
  }

  /**
   * Clear all subscriptions
   */
  clearAll() {
    this.subscribers.clear()
    this.eventHistory = []
  }
}

// Singleton instance
export const realtimeService = new RealtimeService()

