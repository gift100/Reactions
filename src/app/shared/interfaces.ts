
export interface ReactionIcon {
    name: string;
    iconClassName: string;
}

export interface ReactionCount {
    like: number;
    love: number;
    dislike: number;
}

export interface Picture {
    name: string;
    url: string;
    reactions: ReactionCount;
}  

export interface PictureState {
  selectedReactionItem:ReactionIcon;
  liked: boolean;
  loved: boolean;
  disliked: boolean;
}