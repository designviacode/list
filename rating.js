var axios = require('axios');

function ajaxRating(e) {
    e.preventDefault();
    axios
        .post(this.action)
        .then(res => {
            console.log(res.data);
        })
        .catch(console.error);

}