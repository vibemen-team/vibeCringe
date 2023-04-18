import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export class Message {
    id: number;
    text: string;

    constructor(id:number,text:string) {
      this.id=id;
      this.text=text;   
    }

  }
  
  @Injectable()
  export class MessageService {
    messages = messages;

    private product$ = new BehaviorSubject<any>({});
    selectedProduct$ = this.product$.asObservable();
   
    constructor() {}
    
    addMessage(id:number,text:string):void{
      this.messages.push(new Message(id,text));
    }

    setProduct(product: any) {
      this.product$.next(product);
    }
  }


  export const messages: Message[] = [
    {
      id: 1,
      text: 'Message 1'
    },
    {
      id: 1,
      text: 'Message 2'
    },
    {
      id: 2,
      text: 'Message 3'
    }
  ];