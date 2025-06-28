import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RmqContext } from '@nestjs/microservices';

@Catch(Error)
export class RabbitMqExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToRpc();
    const message = ctx.getData();
    //const channel = ctx.getChannelRef(); //Get access to channel for ack/nack
    console.error(`Error caught in RabbitMQ consumer for message: ${JSON.stringify(message)},`, exception);
  }
}
