const componentTags = {
    data() {
        return {
            tags: [],
            tag: '',
        };
    },
    mounted() {
        console.log("tags component mounted img_id", this.img_id);
        fetch(`/tags/${this.img_id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("tags:", data);
                this.tags = data;
            })
            .catch(console.log);
        
    },
    methods: {
        addBtnHandler() {
            console.log("adding a tag to db");
            fetch('/postTag', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({
                    'id': this.img_id,
                    'tag': this.tag
                })
            })
            .then(response => response.json())
            .then(result => {
                console.log("Last added tag id",result[0].tag); 
                this.tags.unshift(result[0]);
            })
            .catch(err => console.log(err))
        },
        showTaggedImages(e) {
            console.log("e.target.id", e.target.id);
            this.$emit('showTaggedImages', e.target.id);
        },
    },
    props: ["img_id"],
    watch: {
        img_id: function() {
            console.log("watcher handled", this.img_id);
            fetch(`/tags/${this.img_id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("tags:", data);
                this.tag = data;
            })
            .catch(console.log);
        
        }
    },
    template: `
            <div class="tags">
            <p>Add Tag: </p>
            <input v-model="tag" type="text" name="tag" placeholder="tag">
            <button @click.prevent="addBtnHandler">Add</button>
            <br>
            <div class="tag" v-for="item in tags">
                <a  @click.prevent="showTaggedImages" :href="'/imageboard/'+item.tag"><p><b :id="item.tag">{{item.tag}}</b></p></a>
            </div>
            <br>
            </div>
            `,
};

export { componentTags };