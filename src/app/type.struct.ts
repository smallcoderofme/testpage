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
}

export { Post, Tag, Series };
