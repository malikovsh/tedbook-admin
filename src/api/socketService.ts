import { io, Socket } from 'socket.io-client';

const soketUrl = import.meta.env.VITE_BASE_URI;

class SocketService {
  private socket: Socket | null = null;

  connect() {
    if (!this.socket) {
      this.socket = io(soketUrl, {
        path: '/ws',
        transports: ['websocket'],
        reconnection: true,
      });

      this.socket.on('connect', () => {
        console.log('Connected to Socket.IO server with ID:', this.socket?.id);
      });

      this.socket.on('connect_error', (error) => {
        console.error('Connection error:', error.message);
      });

      this.socket.on('disconnect', (reason) => {
        console.log('Disconnected from server:', reason);
      });
    } else {
      console.log('Socket already connected.');
    }
  }

  joinRoom(roomId: string) {
    if (this.socket) {
      this.socket.emit('join_room', roomId);
      console.log(`Joined room: ${roomId}`);
    } else {
      console.warn('Socket is not connected. Cannot join room.');
    }
  }

  onNewComment(callback: (newComment: any) => void) {
    this.socket?.on('newComment', callback);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  on(event: string, callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  emit(event: string, data: any) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  onOrderUpdated(callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on('orderUpdated', callback);
    } else {
      console.warn('Socket is not connected. Cannot listen to order updates.');
    }
  }

  get isConnected() {
    return this.socket?.connected || false;
  }
}

export default new SocketService();
