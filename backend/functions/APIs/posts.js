const {db} = require('../utils/admin');


const postsRef = db.collection('posts');


exports.uploadPost = (request, response) => {
    const body = JSON.parse(request.body);
    const newPost = {
        postedBy: body.username,
        title: body.title,
        url: body.url,
        text: body.text,
        upvotes: body.upvotes,
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
    const body = JSON.parse(request.body);
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
                return response.status(200).json({
                    Success: "true"
                })
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
			data.forEach((doc) => {
				postData.push({
					postedBy: doc.data().postedBy,
                    title: doc.data().title,
                    url: doc.data().url,
                    text: doc.data().text,
                    upvotes: doc.data().upvotes,
                    postedAt: doc.data().postedAt,
                    postID: doc.id
				});
			});
			return response.json(postData);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: err.code });
		});
}

exports.getComments = (request, response) => {

    postsRef
		.orderBy("upvotes", "desc")
		.get()
		.then((data) => {
			let commentData = [];
			data.forEach((doc) => {
                postsRef.doc(doc.id).collection('comments').get().then((snap) => {
                    console.log(snap.docs);
                });
			});
			return response.json(commentData);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: err.code });
		});

}


