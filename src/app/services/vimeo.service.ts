import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { SafeUrl } from '@angular/platform-browser';


export interface VideoInfo {
  videoId: number,
  width: number,
  height: number
  url: SafeUrl
}

const FETCH_VIDEO_API: string = `https://vimeo.com/api/oembed.json?url=`

// service to communicate with Vimeo API's
@Injectable({
  providedIn: 'root'
})
export class VimeoService {
   
  constructor(private http: HttpClient) {}

  //API to get video details using oembed for a given url
  getVideoDetails(url: string) {
    return this.http.get(`${FETCH_VIDEO_API}${encodeURIComponent(url)}`)
      .pipe(
        map(data => {
          console.log(data)
         return data
        }),
        catchError(err => {
          return throwError(err);
      })
      );

  }

}
