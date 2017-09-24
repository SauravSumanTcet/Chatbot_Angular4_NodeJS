import { Component, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Chatbot } from './chatbot';
@Injectable()
export class ChatbotService {
  private chatbotsUrl = 'api/chatbots';  // URL to web api

  constructor(private http: Http) { 
    }

  getChatbots(): Promise<Chatbot[]> {
    return this.http.get(this.chatbotsUrl)
      .toPromise()
      .then(response => response.json().data as Chatbot[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
