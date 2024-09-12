import { TaskCreatedEvent } from '../events/task-created-event';
import { Injectable } from '@nestjs/common';
import {eventEmitter} from '../event-emitter'

@Injectable()
export class taskCreatedListener {
  constructor() {
    console.log('TaskCreatedListener initialized');     
    eventEmitter.on('TaskCreated', (event: TaskCreatedEvent) => this.handleTaskCreated(event));
  }

  handleTaskCreated(event: TaskCreatedEvent) {
    console.log(`User created event received: ${event.title}`);
  }
}
