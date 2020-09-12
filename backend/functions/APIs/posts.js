const {admin, db} = require('../utils/admin');


const postsRef = db.collection('posts');
const userRef = db.collection('users');

exports.uploadPost = (request, response) => {
    const body = request.body;
    const newPost = {
        postedBy: body.username,
        title: body.title,
        url: body.url,
        text: body.text,
        upvotes: 0,
        postedAt: new Date().toISOString()
    }

    postsRef
        .add(newPost)
        .then((doc) => {
            return response.json(doc.id);
        })
        .catch((err) => {
            response.status(500).json({
                error: 'Something went wrong'
            })
            console.error(err);
        })
}

exports.postComments = (request, response) => {
    const body = request.body;
    const newComment = {
        postedBy: body.username,
        createdAt: new Date().toISOString(),
        description: body.description
    }
    const commentRef = postsRef.doc(body.postID).collection('comments');
    commentRef
            .doc()
            .set(newComment)
            .then((data) => {
                return response.json(data.id)
            })
            .catch((err) => {
                console.log(err);
                return response.status(400).json({
                    Failure: err.code,
                });
            });
}

exports.getPosts = (request, response) => {

    postsRef
		.orderBy("upvotes", "desc")
		.get()
		.then((data) => {
			let postData = [];
			data.forEach((query) => {
                    postData.push({
                        postedBy: query.data().postedBy,
                        title: query.data().title,
                        url: query.data().url,
                        text: query.data().text,
                        upvotes: query.data().upvotes,
                        postedAt: query.data().postedAt,
                        postID: query.id
                    });
            });
            console.log(postData);
			return response.json(postData);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: err.code });
		});
}

exports.getComments = (request, response) => {
    console.log(request.query.postID);
    postsRef
        .doc(request.query.postID)
        .collection('comments')
        .orderBy('createdAt', 'desc')
		.get()
		.then((data) => {
			let commentData = [];
			data.forEach((doc) => {
                console.log(doc);
                console.log(doc.data());
                commentData.push({
                    postedBy: doc.data().postedBy,
                    createdAt: doc.data().createdAt,
                    description: doc.data().description,
                    commentID: doc.id
                })
            });
            console.log(commentData);
			return response.json(commentData);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: err.code });
		});
}

exports.deletePost = (request, response) => {
    postsRef
            .doc(request.body.postID)
            .delete()
            .then((data) => {
                return response.status(200).json({
                    Success: "Post successfully deleted!"
                })
            })
            .catch((err) => {
                return response.status(500).json({
                    error: err.code
                })
            })
}

exports.deleteComment = (request, response) => {
    postsRef
            .doc(request.body.postID)
            .collection('comments')
            .doc(request.body.commentID)
            .delete()
            .then((data) => {
                return response.status(200).json({
                    Success: "Comment successfully deleted!"
                })
            })
            .catch((err) => {
                return response.status(500).json({
                    error: err.code
                })
            })
}

exports.updatePost = (request, response) => {

    if (request.body.toUpvote) {
        console.log("here")
        userRef
                .doc(request.body.username)
                .update({
                    upvotedPosts: admin.firestore.FieldValue.arrayUnion(request.body.postID)
                })
    }

    postsRef
            .doc(request.body.postID)
            .update({
                title: request.body.title,
                url: request.body.url,
                text: request.body.text,
                upvotes: request.body.upvotes
            })
            .then((data) => {
                return response.status(200).json({
                    Success: "Post successfully updated!"
                })
            })
            .catch((err) => {
                return response.status(500).json({
                    error: err.code
                })
            })
}

exports.updateComment = (request, response) => {
    postsRef
            .doc(request.body.postID)
            .collection('comments')
            .doc(request.body.commentID)
            .update({
                description: request.body.description
            })
            .then((data) => {
                return response.status(200).json({
                    Success: "Comment successfully updated!"
                })
            })
            .catch((err) => {
                return response.status(500).json({
                    error: err.code
                })
            })
}

exports.updateUserDetails = (request, response) => {
    userRef
            .doc(request.body.username)
            .set()

}

