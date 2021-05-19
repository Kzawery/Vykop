import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import {ActivatedRoute, convertToParamMap, Router} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {EMPTY, of} from 'rxjs';
import {Post} from '../../../models/post';
import {Comment} from '../../../models/comment';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {PostService} from '../../../services/post.service';

describe('PostComponent', () => {
  let component: PostComponent;
  let service: PostService;
  let fixture: ComponentFixture<PostComponent>;
  let httpTestingController: HttpTestingController;

  const mockActivatedRoute = {
    paramMap: of({ id: 1 })
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostComponent ],
      providers: [{
        provide: ActivatedRoute,
        useValue: {paramMap: of(convertToParamMap({id: 29}))}
      },
        {
          provide: Router,
          useValue: {}
        },
        {
          provide: MatSnackBar,
          useValue: {}
        },
        {
          provide: MatDialogRef,
          useValue: {open: () => {}}
        },
        {
          provide: MatDialog,
          useValue: {open: () => {}}
        },
        { provide: MAT_DIALOG_DATA, useValue: {} }],
      imports: [HttpClientModule, HttpClientTestingModule],
    })
    .compileComponents();
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(PostService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('variableInitialization', () => {
    it('loading should be false', () => {
      expect (component.loading).toBeFalse();
    });
    it('addCommentField should be false', () => {
      expect (component.addCommentField).toBeFalse();
    });
    it('upvoted should be false', () => {
      expect (component.upvoted).toBeFalse();
    });
    it('user should be equal to auth.currentUserValue', () => {
      expect (component.user).toEqual(component.auth.currentUserValue);
    });
    it('isToggled should be false', () => {
      expect (component.isToggled).toBeFalse();
    });
    it('post should be empty Post object', () => {
      expect (component.post).toEqual(new Post());
    });
    it('text should be empty string', () => {
      expect (component.text).toEqual('');
    });
  });
  describe('functionsTest', () => {
    it('openDialog should open dialog', () => {
      const dialogSpy = spyOn(component.dialog, 'open')
        .and
        .returnValue({afterClosed: () => EMPTY} as any);
      component.openDialog(new Comment());
      expect(dialogSpy).toHaveBeenCalled();
    });
    it('should change value of isEdited for comment', () => {
      const comment = new Comment();
      comment.isEdited = false;
      component.editComment(comment);
      expect(comment.isEdited).toBeTrue();
    });
    it('should change value of isEdited for comment', () => {
      const comment = new Comment();
      comment.isEdited = true;
      component.editCommentSave(comment);
      expect(comment.isEdited).toBeFalse();
    });
  });
});
