import { TestBed } from '@angular/core/testing';

import {HttpClient, HttpClientModule} from '@angular/common/http';
import {UserService} from './user.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {MatDialog} from '@angular/material/dialog';
import {User} from '../models/user';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(UserService);
  });
  afterEach(() => {
    httpTestingController.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('getAll() should get all Users', () => {
    const mockUsers = [
      {
        id: 4,
        username: 'user1',
        registrationDate: '2010-01-08',
        role: 'user',
        avatar: 'http://dummyimage.com/122x168.jpg/dddddd/000000'
      },
      {
        id: 5,
        username: 'user2',
        registrationDate: '2019-12-21',
        role: 'user',
        avatar: 'http://dummyimage.com/118x177.bmp/ff4444/ffffff'
      },
    ];
    service.getAll()
      .subscribe(responseData => {
        expect(responseData[0].username).toEqual('user1');
        expect(responseData[0].id).toEqual(4);
        expect(responseData[0].registrationDate).toEqual('2010-01-08');
        expect(responseData[0].role).toEqual('user');
        expect(responseData[0].avatar).toEqual('http://dummyimage.com/122x168.jpg/dddddd/000000');
        expect(responseData[1].username).toEqual('user2');
        expect(responseData[1].id).toEqual(5);
        expect(responseData[1].registrationDate).toEqual('2019-12-21');
        expect(responseData[1].role).toEqual('user');
        expect(responseData[1].avatar).toEqual('http://dummyimage.com/118x177.bmp/ff4444/ffffff');
      });
    const req = httpTestingController.expectOne(
      'http://localhost:8080/users'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
  it('getByUsername() should get single User with given username', () => {
    const mockUsers = [
      {
        id: 4,
        username: 'user1',
        registrationDate: '2010-01-08',
        role: 'user',
        avatar: 'http://dummyimage.com/122x168.jpg/dddddd/000000'
      }
    ];
    service.getByUsername('user1')
      .subscribe(responseData => {
        expect(responseData[0].username).toEqual('user1');
        expect(responseData[0].id).toEqual(4);
        expect(responseData[0].registrationDate).toEqual('2010-01-08');
        expect(responseData[0].role).toEqual('user');
        expect(responseData[0].avatar).toEqual('http://dummyimage.com/122x168.jpg/dddddd/000000');
      });

    const req = httpTestingController.expectOne(
      'http://localhost:8080/u/user1'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
  it('getById() should get single User with given ID', () => {
    const mockUsers = [
      {
        id: 4,
        username: 'user1',
        registrationDate: '2010-01-08',
        role: 'user',
        avatar: 'http://dummyimage.com/122x168.jpg/dddddd/000000'
      }
    ];
    service.getById(4)
      .subscribe(responseData => {
        expect(responseData[0].username).toEqual('user1');
        expect(responseData[0].id).toEqual(4);
        expect(responseData[0].registrationDate).toEqual('2010-01-08');
        expect(responseData[0].role).toEqual('user');
        expect(responseData[0].avatar).toEqual('http://dummyimage.com/122x168.jpg/dddddd/000000');
      });
    const req = httpTestingController.expectOne(
      'http://localhost:8080/users/4'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
  it('getStatsByUsername() should get User stats with given name', () => {
    const mockResponse = [
      {
        postUpvotes: 6,
        comments: 0,
        commentUpvotes: 0,
        totalUpvotes: 6,
        posts: 1
      }
    ];
    service.getStatsByUsername('user1')
      .subscribe(responseData => {
        expect(responseData[0].postUpvotes).toEqual(6);
        expect(responseData[0].comments).toEqual(0);
        expect(responseData[0].commentUpvotes).toEqual(0);
        expect(responseData[0].totalUpvotes).toEqual(6);
        expect(responseData[0].posts).toEqual(1);
      });
    const req = httpTestingController.expectOne(
      'http://localhost:8080/users/user1/stats'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
  it('getUsersByName() should get all Users with matching name', () => {
    const mockUsers = [
      {
        id: 4,
        username: 'user1',
        registrationDate: '2010-01-08',
        role: 'user',
        avatar: 'http://dummyimage.com/122x168.jpg/dddddd/000000'
      },
      {
        id: 5,
        username: 'user2',
        registrationDate: '2019-12-21',
        role: 'user',
        avatar: 'http://dummyimage.com/118x177.bmp/ff4444/ffffff'
      },
    ];
    service.getUsersByName('user')
      .subscribe(responseData => {
        expect(responseData[0].username).toEqual('user1');
        expect(responseData[0].id).toEqual(4);
        expect(responseData[0].registrationDate).toEqual('2010-01-08');
        expect(responseData[0].role).toEqual('user');
        expect(responseData[0].avatar).toEqual('http://dummyimage.com/122x168.jpg/dddddd/000000');
        expect(responseData[1].username).toEqual('user2');
        expect(responseData[1].id).toEqual(5);
        expect(responseData[1].registrationDate).toEqual('2019-12-21');
        expect(responseData[1].role).toEqual('user');
        expect(responseData[1].avatar).toEqual('http://dummyimage.com/118x177.bmp/ff4444/ffffff');
      });
    const req = httpTestingController.expectOne(
      'http://localhost:8080/users/search?match=user'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
  it('getMostPopularUsers() should get most popular Users', () => {
    const mockUsers = [
      {
        id: 4,
        username: 'user1',
        registrationDate: '2010-01-08',
        role: 'user',
        avatar: 'http://dummyimage.com/122x168.jpg/dddddd/000000',
        posts: 20
      },
      {
        id: 5,
        username: 'user2',
        registrationDate: '2019-12-21',
        role: 'user',
        avatar: 'http://dummyimage.com/118x177.bmp/ff4444/ffffff',
        posts: 15
      },
    ];
    service.getMostPopularUsers()
      .subscribe(responseData => {
        expect(responseData[0].username).toEqual('user1');
        expect(responseData[0].id).toEqual(4);
        expect(responseData[0].registrationDate).toEqual('2010-01-08');
        expect(responseData[0].role).toEqual('user');
        expect(responseData[0].avatar).toEqual('http://dummyimage.com/122x168.jpg/dddddd/000000');
        expect(responseData[1].username).toEqual('user2');
        expect(responseData[1].id).toEqual(5);
        expect(responseData[1].registrationDate).toEqual('2019-12-21');
        expect(responseData[1].role).toEqual('user');
        expect(responseData[1].avatar).toEqual('http://dummyimage.com/118x177.bmp/ff4444/ffffff');
      });
    const req = httpTestingController.expectOne(
      'http://localhost:8080/users/most_popular'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
  it('getContactedUsers() should get contacted Users', () => {
    const mockUsers = [
      {
        id: 4,
        username: 'user1',
        registrationDate: '2010-01-08',
        role: 'user',
        avatar: 'http://dummyimage.com/122x168.jpg/dddddd/000000',
        message: {
          from: 'admin',
          to: 'nowy1',
          content: 'test',
          timestamp: '2021-05-03T22:52:31.626+00:00'
        }
      },
    ];
    service.getContactedUsers()
      .subscribe(responseData => {
        expect(responseData[0].username).toEqual('user1');
        expect(responseData[0].id).toEqual(4);
        expect(responseData[0].registrationDate).toEqual('2010-01-08');
        expect(responseData[0].role).toEqual('user');
        expect(responseData[0].avatar).toEqual('http://dummyimage.com/122x168.jpg/dddddd/000000');
        expect(responseData[0].message.from).toEqual('admin');
        expect(responseData[0].message.to).toEqual('nowy1');
        expect(responseData[0].message.content).toEqual('test');
        expect(responseData[0].message.timestamp).toEqual('2021-05-03T22:52:31.626+00:00');
      });
    const req = httpTestingController.expectOne(
      'http://localhost:8080/chat/contacted_users'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
  it('getLoggedUsers() should get logged Users', () => {
    const mockUsers = ['user1'];
    service.getLoggedUsers()
      .subscribe(responseData => {
        expect(responseData[0]).toEqual('user1');
      });
    const req = httpTestingController.expectOne(
      'http://localhost:8080/chat/logged_users'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
  it('getMsg() should get last messages from given User', () => {
    const mockUsers = [{
      from: 'admin',
      to: 'user1',
      content: '14',
      timestamp: '2021-04-30T08:18:10.742+00:00'
    }];
    service.getMsg('admin')
      .subscribe(responseData => {
        expect(responseData[0].from).toEqual('admin');
        expect(responseData[0].to).toEqual('user1');
        expect(responseData[0].content).toEqual('14');
        expect(responseData[0].timestamp).toEqual('2021-04-30T08:18:10.742+00:00');
      });
    const req = httpTestingController.expectOne(
      'http://localhost:8080/messages/admin?page=0'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
  it('getMsgByPage() should get last messages from given User', () => {
    const mockUsers = [{
      from: 'admin',
      to: 'user1',
      content: '14',
      timestamp: '2021-04-30T08:18:10.742+00:00'
    }];
    service.getMsgByPage('admin', 1)
      .subscribe(responseData => {
        expect(responseData[0].from).toEqual('admin');
        expect(responseData[0].to).toEqual('user1');
        expect(responseData[0].content).toEqual('14');
        expect(responseData[0].timestamp).toEqual('2021-04-30T08:18:10.742+00:00');
      });
    const req = httpTestingController.expectOne(
      'http://localhost:8080/messages/admin?page=1'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
  it('deleteById() should delete User with given id', () => {
    const mockUsers = [
      {
        id: 4,
        username: 'user1',
        registrationDate: '2010-01-08',
        role: 'user',
        avatar: 'http://dummyimage.com/122x168.jpg/dddddd/000000'
      }
    ];
    service.deleteById(4)
      .subscribe(responseData => {
        expect(responseData[0].username).toEqual('user1');
        expect(responseData[0].id).toEqual(4);
        expect(responseData[0].registrationDate).toEqual('2010-01-08');
        expect(responseData[0].role).toEqual('user');
        expect(responseData[0].avatar).toEqual('http://dummyimage.com/122x168.jpg/dddddd/000000');
      });
    const req = httpTestingController.expectOne(
      'http://localhost:8080/users/4'
    );
    expect(req.request.method).toBe('DELETE');
    req.flush(mockUsers);
  });
  it('register() should register new User', () => {
    const mockData = {
        username: 'user12',
        password: '!Password123',
        email: 'test@gmail.com'
      };
    service.register(mockData).subscribe(() => {});
    const req = httpTestingController.expectOne(
      'http://localhost:8080/users/signup'
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockData);
  });
  it('add() should add new User', () => {
    const mockData = {
      username: 'user12',
      password: '!Password123',
      email: 'test@gmail.com'
    };
    service.add(mockData).subscribe(() => {});
    const req = httpTestingController.expectOne(
      'http://localhost:8080/users'
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockData);
  });
  it('edit() should edit user with given ID', () => {
    const mockData = {
      id: 1,
      username: 'user12',
      password: '!Password123',
      email: 'test@gmail.com'
    };
    service.edit(mockData).subscribe(() => {});
    const req = httpTestingController.expectOne(
      'http://localhost:8080/users/1'
    );
    expect(req.request.method).toBe('PUT');
    req.flush(mockData);
  });
});
