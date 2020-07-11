interface Post {
    name: string;
    avatar: string;
    preview: string;
    content: string;
    createdAt?: string;
    updatedAt?: string;
    author?: string;
    _id?: string;
    labels?: string[];
    disable?: boolean;
    publish?: boolean;
}

interface Tag {
    name: string;
    _id: string;
}

interface Series {
    name: string;
    id: string;
    open: boolean;
    list: any[];
    publish: boolean;
}


interface PostComment {
  username: string;
  email: string;
  content: string;
  reply?: string;
}

export { Post, Tag, Series , PostComment};
