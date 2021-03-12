const my_form=document.querySelector('#searchform');
my_form.addEventListener('submit',async function(e){
    e.preventDefault();
    console.log("Submitted");
    const search_value=my_form.elements.query.value;
    const config={params:{q:search_value}}
    const response=await axios.get(`http://api.tvmaze.com/search/shows`,config);
    make_images(response.data);
    my_form.elements.query.value='';
    document.body.clear();
})

const make_images=(tv_shows)=>{
    for(let curr_show of tv_shows){
        if(curr_show.show.image){
            const new_img=document.createElement('img');
            new_img.src=curr_show.show.image.medium;
            document.body.append(new_img);
        }
    }
}