import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor() {}

  showHttpResponseError(element: string, error: HttpErrorResponse): void {
    const domElement = document.getElementById(element);
    if (domElement) {
      domElement.className = 'show msgFeedback requestKo';
      if (error.error) domElement.textContent = 'Error: ' + error.error;
      else {
        domElement.textContent =
          'Error: ' +
          error?.statusText +
          '. Message detail: ' +
          error?.message +
          '. Status code: ' +
          error?.status;
      }
    }
  }

  showMessage(element: string, message: string) {
    const domElement = document.getElementById(element);
    if (domElement) {
      domElement.textContent = message;
      domElement.className = 'show msgFeedback alert';
    }
  }

  showError(element: string, message: string) {
    const domElement = document.getElementById(element);
    if (domElement) {
      domElement.textContent = message;
      domElement.className = 'show msgFeedback requestKo';
    }
  }

  cleanMessage(element: string) {
    const domElement = document.getElementById(element);
    if (domElement) {
      domElement.textContent = '';
      domElement.className = 'hide msgFeedback';
    }
  }
}
