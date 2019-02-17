import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
// import { FunctionsService } from './functions.service';
// import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url) {
      // let useUrl = null;
      // try {
      //   useUrl = environment.zones[environment.selectedZone];
      // } catch (exc) {
      const useUrl = 'http://localhost:9090';
      // }
      const duplicate = req.clone({ url: useUrl.concat(req.url) });
      return next.handle(duplicate);
    }
    return next.handle(req);
  }
}
