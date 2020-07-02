interface Post {
    name: string;
    avatar: string;
    preview: string;
    content: string;
    created_on?: string;
    updated_on?: string;
    author?: string;
    post_id?: string;
    publish?: boolean;
}

interface Tag {
    name: string;
    tag_id: string;
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
    created_on: string;
}

interface LoginResponse {
  userName: string;
  userId: string;
  jwt: string;
}

export { Post, Tag, Series, PostComment , LoginResponse};
