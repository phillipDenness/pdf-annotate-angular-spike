import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { ScriptService } from './script.service';

declare var PDFJS: any;
declare var PDFAnnotate: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ScriptService]
})

export class AppComponent implements OnInit {
  
  constructor(@Inject(DOCUMENT) private document: Document, @Inject(ScriptService) private scriptService) {
    // this.scriptService.load('pdfviewer', 'pdfjs')
    // .then(data => {
    //   console.log('script loaded ', data)
    // })
    // .then(data => {
    //   this.scriptService.load('indexjs').then(data => {
    //     console.log('script loaded ', data)
    //   })
    // })
    // .catch(err => {
    //   err => console.log(err)
    // });
  }

  ngOnInit() {
    var UI = PDFAnnotate.UI;
    var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();


    var documentId = '/assets/example.pdf';
    var PAGE_HEIGHT = void 0;
    var RENDER_OPTIONS = {
      documentId: documentId,
      pdfDocument: null,
      scale: parseFloat("1.33"),
      rotate: parseInt(localStorage.getItem(documentId + '/rotate'), 10) || 0
    };
    
    PDFAnnotate.setStoreAdapter(new PDFAnnotate.LocalStoreAdapter());
    PDFJS.workerSrc = '../assets/shared/pdf.worker.js';
    var NUM_PAGES = 0;
  
    let renderedPages = {};
    this.document.getElementById('content-wrapper').addEventListener('scroll', function () {
      let element = event.currentTarget as HTMLInputElement;
      var visiblePageNum = Math.round(element.scrollTop / PAGE_HEIGHT) + 1;
      var visiblePage = document.querySelector('.page[data-page-number="' + visiblePageNum + '"][data-loaded="false"]');
      if (visiblePage) {
        // Prevent invoking UI.renderPage on the same page more than once.
        if ( !renderedPages[visiblePageNum] ) {
          renderedPages[visiblePageNum] = true;
          setTimeout(function () {
          UI.renderPage(visiblePageNum, RENDER_OPTIONS);
          });
        }
      }
    });
  
    PDFJS.getDocument(RENDER_OPTIONS.documentId).then(function(pdf) {
      RENDER_OPTIONS.pdfDocument = pdf;

	    var viewer = document.getElementById('viewer');
	    viewer.innerHTML = '';
	    NUM_PAGES = pdf.pdfInfo.numPages;
	    for (var i = 0; i < NUM_PAGES; i++) {
	      var page = UI.createPage(i + 1);
        viewer.appendChild(page);
      }
    }
  );

  function render() {
	  PDFJS.getDocument(RENDER_OPTIONS.documentId).then(function (pdf) {
	    RENDER_OPTIONS.pdfDocument = pdf;

	    var viewer = document.getElementById('viewer');
	    viewer.innerHTML = '';
	    NUM_PAGES = pdf.pdfInfo.numPages;
	    for (var i = 0; i < NUM_PAGES; i++) {
	      var page = UI.createPage(i + 1);
	      viewer.appendChild(page);
	    }

	    UI.renderPage(1, RENDER_OPTIONS).then(function (_ref) {
	      var _ref2 = _slicedToArray(_ref, 2);

	      var pdfPage = _ref2[0];
	      var annotations = _ref2[1];

	      var viewport = pdfPage.getViewport(RENDER_OPTIONS.scale, RENDER_OPTIONS.rotate);
	      PAGE_HEIGHT = viewport.height;
	    });
		});
	}
  render();

  	// Toolbar buttons
	(function () {
	  var tooltype = localStorage.getItem(RENDER_OPTIONS.documentId + '/tooltype') || 'cursor';
	  if (tooltype) {
	    setActiveToolbarItem(tooltype, document.querySelector('.toolbar button[data-tooltype=' + tooltype + ']'));
	  }

	  function setActiveToolbarItem(type, button) {
	    var active = document.querySelector('.toolbar button.active');
	    if (active) {
	      active.classList.remove('active');

	      switch (tooltype) {
	        case 'cursor':
	          UI.disableEdit();
	          break;
	        case 'draw':
	          UI.disablePen();
	          break;
	        case 'text':
	          UI.disableText();
	          break;
	        case 'point':
	          UI.disablePoint();
	          break;
	        case 'area':
	        case 'highlight':
	        case 'strikeout':
	          UI.disableRect();
	          break;
	      }
	    }

	    if (button) {
	      button.classList.add('active');
	    }
	    if (tooltype !== type) {
	      localStorage.setItem(RENDER_OPTIONS.documentId + '/tooltype', type);
	    }
	    tooltype = type;

	    switch (type) {
	      case 'cursor':
	        UI.enableEdit();
	        break;
	      case 'draw':
	        UI.enablePen();
	        break;
	      case 'text':
	        UI.enableText();
	        break;
	      case 'point':
	        UI.enablePoint();
	        break;
	      case 'area':
	      case 'highlight':
	      case 'strikeout':
	        UI.enableRect(type);
	        break;
	    }
	  }

	  function handleToolbarClick(e) {
	    if (e.target.nodeName === 'BUTTON') {
	      setActiveToolbarItem(e.target.getAttribute('data-tooltype'), e.target);
	    }
	  }

	  document.querySelector('.toolbar').addEventListener('click', handleToolbarClick);
	})();

	// Clear toolbar button
	(function () {
	  function handleClearClick(e) {
	    if (confirm('Are you sure you want to clear annotations?')) {
	      for (var i = 0; i < NUM_PAGES; i++) {
	        document.querySelector('div#pageContainer' + (i + 1) + ' svg.annotationLayer').innerHTML = '';
	      }

	      localStorage.removeItem(RENDER_OPTIONS.documentId + '/annotations');
	    }
	  }
	  document.querySelector('a.clear').addEventListener('click', handleClearClick);
	})();

	// Comment stuff
	(function (window, document) {

		function handleCommentClick (event) {
			removeCommentSelectedStyle();
			
			var linkedAnnotationId = event.target.getAttribute('data-linked-annotation');
			event.target.classList.add("comment-selected");

			addHighlightedCommentStyle(linkedAnnotationId);
		}

		function removeCommentSelectedStyle() {
			var listItems = document.querySelector('#comment-wrapper .comment-list-container').childNodes;
			listItems.forEach(function(item) {
				item.classList.remove("comment-selected");
			});
		}

		function addHighlightedCommentStyle(linkedAnnotationId) {
			var annotations = document.querySelector('#pageContainer1 .annotationLayer').childNodes;

			annotations.forEach(function(annotation) {
				annotation.classList.remove("comment-selected");
				var annotationId = annotation.dataset.pdfAnnotateId;

				if (annotationId === linkedAnnotationId) {
					annotation.classList.add("comment-selected");
				}
			})
		}

		document.querySelector('#content-wrapper').addEventListener('click', function(event) {
			var pageNumber = getClickedPage(event);
			showAllComments(pageNumber);
		});

		function getClickedPage(event) {
			// console.log(UI.pdfViewer.currentPageNumber) 
			var currentParent = event.target;
			for (var step = 0; step < 5; step++) {
				var pageNumber = currentParent.parentNode.getAttribute('data-page-number');
				if (pageNumber != null) {
					break;
				};
				currentParent = currentParent.parentNode;
			}
			return pageNumber;
		}

		document.querySelector('#comment-wrapper .comment-list-container').addEventListener('click', handleCommentClick);

	  var commentList = document.querySelector('#comment-wrapper .comment-list-container');
	  var commentForm = document.querySelector('#comment-wrapper .comment-list-form');
		var commentText = commentForm.querySelector('input[type="text"]');
		
		showAllComments(1);
		function showAllComments(pageNumber) {
			document.querySelector('#comment-header').innerHTML= "Comments: Page " + pageNumber;
			commentList.innerHTML = '';
			
			PDFAnnotate.getStoreAdapter().getAnnotations(documentId, parseInt(pageNumber)).then(function(pageData) {
				pageData.annotations.forEach(function(annotation) {
					displayAnnotationComments(annotation.uuid);
				});
			});
		}

		function displayAnnotationComments(annotationId) {
			PDFAnnotate.getStoreAdapter().getComments(documentId, annotationId).then(function (comments) {
				comments.forEach(function (comment) {
					insertComment(comment, annotationId);	
				})
			});
		}

	  function supportsComments(target) {
	    var type = target.getAttribute('data-pdf-annotate-type');
	    return ['point', 'highlight', 'area'].indexOf(type) > -1;
	  }

	  function insertComment(comment, annotationId) {
	    var commentText = document.createElement('div');
			commentText.className = 'comment-list-item';
			commentText.setAttribute("data-linked-annotation", annotationId);
	    commentText.innerHTML = comment.content;

			var commentTools = document.createElement('div');
			var editCommentButton = document.createElement('button');
			editCommentButton.innerHTML = "edit";
			editCommentButton.addEventListener ("click", function() {
				alert("did something");
			});

			var deleteCommentButton = document.createElement('button');
			deleteCommentButton.innerHTML = "delete";
			deleteCommentButton.addEventListener ("click", function() {
				PDFAnnotate.getStoreAdapter().deleteComment(documentId, comment.commentId).then(() => {
					console.log('deleted');
				}, (error) => {
					console.log(error.message);
				});
			});

			commentTools.appendChild(deleteCommentButton);
			commentTools.appendChild(editCommentButton);
			commentText.appendChild(commentTools);
			commentList.appendChild(commentText);			
	  }

	  function handleAnnotationClick(target) {
	    if (supportsComments(target)) {
	      (function () {
	        var documentId = target.parentNode.getAttribute('data-pdf-annotate-document');
	        var annotationId = target.getAttribute('data-pdf-annotate-id');
					addHighlightedCommentStyle(annotationId);

	        PDFAnnotate.getStoreAdapter().getComments(documentId, annotationId).then(function (comments) {
	          commentList.innerHTML = '';
	          commentForm.style.display = '';
	          commentText.focus();

	          commentForm.onsubmit = function () {
							PDFAnnotate.getStoreAdapter()
							.addComment(documentId, annotationId, commentText.value.trim())
							.then(insertComment)
							.then(function () {
	              commentText.value = '';
	              commentText.focus();
	            });

	            return false;
	          };
	          comments.forEach(insertComment, annotationId);
	        });
	      })();
	    }
	  }

	  function handleAnnotationBlur(target) {
	    if (supportsComments(target)) {
	      commentList.innerHTML = '';
	      commentForm.style.display = 'none';
				commentForm.onsubmit = null;
				
				addHighlightedCommentStyle(null);
	      insertComment({ content: 'No comments' }, null);
	    }
	  }

	  UI.addEventListener('annotation:click', handleAnnotationClick);
    UI.addEventListener('annotation:blur', handleAnnotationBlur);
  });



  }

  
}
