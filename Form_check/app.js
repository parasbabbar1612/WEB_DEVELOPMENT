const form_name=document.querySelector('#check');
const comment_container=document.querySelector('#comments');
form_name.addEventListener('submit',function(e){
    e.preventDefault();
    alert('New Comment Added');
    const input_username=form_name.elements.username;
    const input_comment=form_name.elements.comment;
    const new_comment=document.createElement('li');
    const bt=document.createElement('b');
    bt.append(input_username.value);
    new_comment.append(bt);
    new_comment.append(`: ${input_comment.value}`);
    comment_container.append(new_comment);
    input_username.value='';
    input_comment.value='';
})