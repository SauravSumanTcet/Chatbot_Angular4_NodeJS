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
  private chatbotsUrl = 'https://api.wit.ai/message?v=26/09/2017&q=';  // URL to web api

  constructor(private http: Http) {
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  callWitApi(message):Promise<any>{
    return this.http.get(this.chatbotsUrl+message)
    .toPromise()
    .then(response => response.json().data as any)
    .catch(this.handleError);
  }
  emptyTextArea():string{
    return '';
  }

}
