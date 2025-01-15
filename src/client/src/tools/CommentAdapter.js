export class CommentAdapter{
    static buildCommentThree(comments){
        const map=[];
        const tree = [];

        comments.forEach(comment => {
            map[comment.id] = { ...comment, children: [] };
        });

        comments.forEach(comment => {
            if (comment.parentId) {
                if (map[comment.parentId]) {
                    map[comment.parentId].children.push(map[comment.id]);
                }
            } else {
                tree.push(map[comment.id]);
            }
        });

        return tree;
    }
}