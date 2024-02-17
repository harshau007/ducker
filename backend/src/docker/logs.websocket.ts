import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import * as Docker from 'dockerode';

@WebSocketGateway()
export class LogsGateway {
  @WebSocketServer()
  server: Server;

  private docker: Docker;

  constructor() {
    this.docker = new Docker();
  }

  async sendLogs(containerId: string) {
    const container = this.docker.getContainer(containerId);
    const logStream = await container.logs({
      follow: true,
      stdout: true,
      stderr: true
    }).catch(err => console.error(err));

    if (logStream) {
      logStream.on('data', (chunk) => {
        this.server.emit('logs', chunk.toString('utf8'));
        console.log(chunk.toString('utf8'));
      });

      logStream.on('end', () => {
        this.server.emit('logs', '--- END OF LOGS ---');
      });
    }
  }

}
