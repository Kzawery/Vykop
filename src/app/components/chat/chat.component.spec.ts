import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { ChatComponent } from './chat.component';
import {HttpClientModule} from '@angular/common/http';
import {User} from '../../models/user';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatComponent ],
      imports: [HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('variableInitialization', () => {
    it('chatToggle should be true', () => {
      expect(component.chatToggle).toEqual(true);
    });
    it('userMessages should be empty', () => {
      expect(component.userMessages).toHaveSize(0);
    });
    it('msgToggle should be false', () => {
      expect(component.msgToggle).toEqual(false);
    });
    it('chatMessages should be empty', () => {
      expect(component.chatMessages).toHaveSize(0);
    });
    it('searchedUsers should be empty', () => {
      expect(component.searchedUsers).toHaveSize(0);
    });
    it('isLoading should be false', () => {
      expect(component.isLoading).toEqual(false);
    });
    it('page should be equal to 0', () => {
      expect(component.page).toEqual(0);
    });
    it('scrollHeight should be equal to 0', () => {
      expect(component.scrollHeight).toEqual(0);
    });
    it('offset should be equal to 0', () => {
      expect(component.offset).toEqual(0);
    });
  });
  describe('functionTests', () => {
    it('toggleChatOff() should change chatToogleUp value', fakeAsync(() => {
      spyOn(component, 'delay').and.returnValue(Promise.resolve(true));
      component.toggleChat();
      tick();
      expect(component.chatToggle).toEqual(false);
    }));
    it('toggleChat() should change chatToogleUp value', fakeAsync(() => {
      spyOn(component, 'delay').and.returnValue(Promise.resolve(true));
      component.toggleChat();
      tick();
      expect(component.chatToggle).toEqual(false);
    }));
    it('toggleMsg() should change msgToogle value', () => {
      spyOn(component, 'delay').and.returnValue(Promise.resolve(true));
      component.toggleMsg({});
      expect(component.msgToggle).toEqual(false);
    });
    it('toggleMsg() should change msgToogle value', () => {
      spyOn(component, 'delay').and.returnValue(Promise.resolve(true));
      component.toggleMsg({});
      expect(component.msgToggle).toEqual(false);
    });
    it('toggleMsg() should change msgReceiver to null if values are the same', () => {
      spyOn(component, 'delay').and.returnValue(Promise.resolve(true));
      component.msgReceiver = 'test';
      component.toggleMsg('test');
      expect(component.msgReceiver).toEqual(null);
    });
    it('toggleMsg() should change msgReceiver to given user if values are not the same', () => {
      spyOn(component, 'delay').and.returnValue(Promise.resolve(true));
      component.msgReceiver = 'user';
      component.toggleMsg('user2');
      expect(component.msgReceiver).toEqual('user2');
    });
    it('toggleMsg() should change msgToggle to true', fakeAsync(() => {
      spyOn(component, 'delay').and.returnValue(Promise.resolve(true));
      spyOn(component, 'getMsg').and.returnValue();
      component.msgReceiver = 'user';
      component.toggleMsg('user2');
      tick();
      fixture.detectChanges();
      tick();
      expect(component.msgToggle).toEqual(true);
    }));
  });
});
