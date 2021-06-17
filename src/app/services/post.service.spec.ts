import { TestBed } from '@angular/core/testing';
import {UserService} from './user.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {PostService} from './post.service';

describe('PostService', () => {
  let service: PostService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostService],
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(PostService);
  });
  afterEach(() => {
    httpTestingController.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('getAll() should return users posts', () => {
    service.getAll().subscribe(() => {});
    const req = httpTestingController.expectOne(
      'http://localhost:8080/userposts?page=0'
    );
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });
  it('getForUser() should return users posts with given id', () => {
    service.getForUser(1).subscribe(() => {});
    const req = httpTestingController.expectOne(
      'http://localhost:8080/userposts?page=1'
    );
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });
  it('getPost() should return post with given id', () => {
    service.getPost(1).subscribe(() => {});
    const req = httpTestingController.expectOne(
      'http://localhost:8080/post?id=1'
    );
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });
  it('upvote() should increase likes by one for give post', () => {
    service.upvote(1).subscribe(() => {});
    const req = httpTestingController.expectOne(
      'http://localhost:8080/posts/upvote/1'
    );
    expect(req.request.method).toBe('POST');
    req.flush([]);
  });
  it('addPost() should add Post', () => {
    service.addPost({}).subscribe(() => {});
    const req = httpTestingController.expectOne(
      'http://localhost:8080/posts'
    );
    expect(req.request.method).toBe('POST');
    req.flush([]);
  });
  it('editPost() should edit Post with given id', () => {
    service.editPost(1, {}).subscribe(() => {});
    const req = httpTestingController.expectOne(
      'http://localhost:8080/posts/edit/1'
    );
    expect(req.request.method).toBe('PUT');
    req.flush([]);
  });
  it('addComment() should add comment to Post with given id', () => {
    service.addComment(1, {}).subscribe(() => {});
    const req = httpTestingController.expectOne(
      'http://localhost:8080/posts/1/comment'
    );
    expect(req.request.method).toBe('POST');
    req.flush([]);
  });
  it('upvoteComment() should increase likes for given comment', () => {
    service.upvoteComment(1).subscribe(() => {});
    const req = httpTestingController.expectOne(
      'http://localhost:8080/comments/upvote/1'
    );
    expect(req.request.method).toBe('POST');
    req.flush([]);
  });
  it('editComment() should edit comment with given id', () => {
    service.editComment(1, 1, {}).subscribe(() => {});
    const req = httpTestingController.expectOne(
      'http://localhost:8080/posts/1/comment/1'
    );
    expect(req.request.method).toBe('POST');
    req.flush([]);
  });
});
