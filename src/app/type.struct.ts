class Post {
    title: string;
    cover: boolean;
    preview: string;
    created_at: string;
    updated_at: string;
    author: string;
    post_id: string;
    overt: boolean
}

class Tag {
    name: string;
    tag_id: string;
}

export { Post, Tag };