interface Post {
    title: string;
    cover: string;
    preview: string;
    created_at: string;
    updated_at: string;
    author: string;
    post_id: string;
    overt: boolean;
}

interface Tag {
    name: string;
    tag_id: string;
}

interface Series {
    name: string;
    id: string;
    open: boolean;
    list: any[]
}

interface PostComment {
    username: string;
    email: string;
    content: string;
    createAt: string;
}
export { Post, Tag, Series, PostComment };
