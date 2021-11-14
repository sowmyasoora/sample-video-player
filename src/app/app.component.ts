import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilityService } from './services/utility.service';
import { VideoInfo, VimeoService } from './services/vimeo.service';

export const VIMEO_BASEURL: string= `https://player.vimeo.com/video/`;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'video-app';
  videoForm!: FormGroup;
  videoInfo!: VideoInfo | null;
  serverError! : string;

  constructor(private fb: FormBuilder, private vimeoService : VimeoService, private utilityService : UtilityService) {}

  ngOnInit() {
    //Initialise form for to capture vimeo URL
    this.videoForm = this.fb.group({
      // formcontrol to hold input & validators to validate the input
      source: ['', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]]
    });
  }

  /** 
   * - Handler after submitting video url 
   * - fetches the video details based on the enter url
   * - on success : Updated video source
   * - on failure : shows error message 
   * */ 
  
  onSubmit() {
    //show loader
    this.serverError = '';
    this.vimeoService.getVideoDetails(this.videoForm?.value.source)
    .subscribe((videoInfo : any) => {
      this.videoInfo = {
        videoId : videoInfo.video_id,
        url : this.utilityService.getSafeUrl(`${VIMEO_BASEURL}${videoInfo.video_id}`),
        width : videoInfo.width,
        height : videoInfo.height
      };
      
    }, (err) => {
        this.handleError(err)
      } 
    )
  }

  /**
   * Handles error from vimeo API
   * Parses the error and updates the user
   * @param err 
   */
  handleError(err: any) {
    this.videoInfo = null;
    if(err.status === 404) {
      this.serverError = 'Video Not Found'
    } else if(err.status === 403) {
      this.serverError = `You don't have permissions to watch this vidoe`
    } else if(err.status === 304) {
      this.serverError =`Video doesn't changed since the date given in Header`
    } else {
      this.serverError =`Something went wrong. Please try after sometime!`
    }
  }
  
}
