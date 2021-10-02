const componentComments = {
    data() {
        return {
            comments: [],
            username: '',
            comment: '',
        };
    },
    mounted() {
        console.log("comments component mounted img_id", this.img_id);
        fetch(`/comments/${this.img_id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("comments:", data);
                this.comments = data;
            })
            .catch(console.log);
        
    },
    methods: {
        submitBtnHandler() {
            console.log("adding a comment to db");
            fetch('/postComment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({
                    'id': this.img_id,
                    'username': this.username,
                    'comment': this.comment
                })
            })
            .then(response => response.json())
            .then(result => {
                console.log("Last added comment id",result[0].image_id); 
                this.comments.unshift(result[0]);
            })
            .catch(err => console.log(err))
        },
    },
    props: ["img_id"],
    template: `
            <div class="comments">
            <p>Add Comment: </p>
            <input v-model="username" type="text" name="username" placeholder="username">
            <input v-model="comment" type="text" name="comment" placeholder="comment">
            <button @click.prevent="submitBtnHandler">Submit</button>

            <div v-for="item in comments">
                <p><b>{{item.username}}</b> : {{item.comment}}</p>
            </div>
            </div>
            `,
};

export { componentComments };