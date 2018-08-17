import { Component, OnInit } from '@angular/core';
import { PicturesService } from './services/pictures.service';
import { Picture, ReactionIcon, PictureState } from './shared/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  pictures: Picture[] = [];
  pictureStates: PictureState[] = [];
  constructor(private _picturesService: PicturesService) {
    this._picturesService.getPictures().subscribe(response => {
      this.pictures = response['pictures'];
      for (let i = 0; i < this.pictures.length; i++) {
        this.pictureStates.push({
          selectedReactionItem: {
            name: "Like",
            iconClassName: "fa fa-thumbs-up"
          },
          liked: false,
          loved: false,
          disliked: false
        })
      }
    });
  }

  ngOnInit() {

  }

  onLikeClicked(index) {
    this.pictureStates[index].selectedReactionItem.name = 'Like';
    this.pictureStates[index].selectedReactionItem.iconClassName = 'fa fa-thumbs-up';
    this.pictureStates[index].liked = !this.pictureStates[index].liked;
    if (this.pictureStates[index].liked) {
      this.pictures[index].reactions.like++;
      if (this.pictureStates[index].loved) {
        this.pictureStates[index].loved = !this.pictureStates[index].loved;
        this.pictures[index].reactions.love--;
      }
      if (this.pictureStates[index].disliked) {
        this.pictureStates[index].disliked = !this.pictureStates[index].disliked;
        this.pictures[index].reactions.dislike--;
      }
    } else {
      this.pictures[index].reactions.like--;
    }
  }

  onLoveClicked(index) {
    this.pictureStates[index].selectedReactionItem.name = 'Love';
    this.pictureStates[index].selectedReactionItem.iconClassName = 'fa fa-heart';
    this.pictureStates[index].loved = !this.pictureStates[index].loved;
    if (this.pictureStates[index].loved) {
      this.pictures[index].reactions.love++;
      if(this.pictureStates[index].liked){
        this.pictureStates[index].liked = !this.pictureStates[index].liked;
        this.pictures[index].reactions.like--;
      }
      if(this.pictureStates[index].disliked){
        this.pictureStates[index].disliked = !this.pictureStates[index].disliked;
        this.pictures[index].reactions.dislike--;
      }
    } else {
      this.pictures[index].reactions.love--;
    }
  }

  onDislikeClicked(index) {
    this.pictureStates[index].selectedReactionItem.name = 'Dislike';
    this.pictureStates[index].selectedReactionItem.iconClassName = 'fa fa-thumbs-down';
    this.pictureStates[index].disliked = !this.pictureStates[index].disliked;
    if (this.pictureStates[index].disliked) {
      this.pictures[index].reactions.dislike++;
      if(this.pictureStates[index].loved){
        this.pictureStates[index].loved = !this.pictureStates[index].loved;
        this.pictures[index].reactions.love--;
      }
      if(this.pictureStates[index].liked){
        this.pictureStates[index].liked = !this.pictureStates[index].liked;
        this.pictures[index].reactions.like--;
      }
    } else {
      this.pictures[index].reactions.dislike--;
    }

  }

  onReactionClicked(index) {
    if (this.pictureStates[index].selectedReactionItem.name === "Like") {
      this.onLikeClicked(index);
    } else if (this.pictureStates[index].selectedReactionItem.name === "Love") {
      this.onLoveClicked(index);
    } else {
      this.onDislikeClicked(index);
    }
  }

  getStyleColor(index) {
    if (this.pictureStates[index].selectedReactionItem.name === "Like" && this.pictureStates[index].liked) {
      return "blue";
    } else if (this.pictureStates[index].selectedReactionItem.name === "Love" && this.pictureStates[index].loved) {
      return "palevioletred";
    } else if (this.pictureStates[index].selectedReactionItem.name === "Dislike" && this.pictureStates[index].disliked) {
      return "red";
    }
    return "black";
  }

}
