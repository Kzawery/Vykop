import { TestBed } from '@angular/core/testing';

import { WebsocketService } from './websocket.service';
import {HttpClientModule} from '@angular/common/http';

describe('WebsocketService', () => {
  let service: WebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ]
    });
    service = TestBed.inject(WebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
