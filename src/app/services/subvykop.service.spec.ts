import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {PostService} from './post.service';
import {SubvykopService} from './subvykop.service';

describe('SubVykopService', () => {
  let service: SubvykopService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubvykopService],
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(SubvykopService);
  });
  afterEach(() => {
    httpTestingController.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('getPostBySubVykopName() should return posts in subvykop within provided page', () => {
    service.getPostBySubVykopName('subvykop', 1).subscribe(() => {});
    const req = httpTestingController.expectOne(
      'http://localhost:8080/posts/subvykop/?page=1'
    );
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });
  it('getMostPopulaSubVykops() should return most popular subvykops', () => {
    service.getMostPopularSubVykops().subscribe(() => {});
    const req = httpTestingController.expectOne(
      'http://localhost:8080/sub_vykop/most_popular'
    );
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });
  it('searchSubs() should search subvykops with given name', () => {
    service.searchSubs('subvykop').subscribe(() => {});
    const req = httpTestingController.expectOne(
      'http://localhost:8080/sub_vykop/search?match=subvykop'
    );
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });
  it('checkSub() should check if user is subscribed', () => {
    service.checkSub(1).subscribe(() => {});
    const req = httpTestingController.expectOne(
      'http://localhost:8080/subvykop/1/isSubscribed'
    );
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });
  it('subscribe() should check if user is subscribed', () => {
    service.joinSubVykop(1).subscribe(() => {});
    const req = httpTestingController.expectOne(
      'http://localhost:8080/sub_vykop/1/subscribe'
    );
    expect(req.request.method).toBe('POST');
    req.flush([]);
  });
});
