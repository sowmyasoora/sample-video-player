import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// Utilty service
@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private _sanitizer : DomSanitizer,) { }

  // Helper method to get safe url to embed video in the application 
  getSafeUrl(url: string) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url)
  }
}
