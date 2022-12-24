import { getDocs, collection, addDoc, query, where,deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import { Post as IPost } from "./main";
import '../../styles/post.css';

interface Props {
  post: IPost;
}
interface Like{
    likeId:string;
    userId:string;
}
export const Post = (props: Props) => {
  const [user] = useAuthState(auth);
  const { post } = props;
const [likes, setLikes] = useState<Like[] | null>(null)
  const getLikes = async() => {
   const data=await getDocs(likesDocs);
   setLikes(data.docs.map((doc)=>({userId:doc.data().userId,likeId:doc.id})));
   
  };

  const likesRef = collection(db, "likes");
  const likesDocs = query(likesRef, where("postId", "==", post.id));

  const addLike = async () => {
    try{
   const newDoc= await addDoc(likesRef, {
      userId: user?.uid,
      postId: post.id,
    });
    if(user){

  
    setLikes((prev)=>prev?[...prev,{userId:user.uid,likeId:newDoc.id}]:[{userId:user.uid,likeId:newDoc.id}])  }
}catch(err){
console.log(err);

}
  };

  const removeLike = async () => {
    try{

        const likesToDeleteQuery = query(likesRef, where("postId", "==", post.id),where("userId","==",user?.uid));

const likeToDeleteData=await getDocs(likesToDeleteQuery);

const likeId=likeToDeleteData.docs[0].id

        const likeTodelete=doc(db,"likes",likeId)
    await deleteDoc(likeTodelete);
    if(user){

  
    setLikes((prev)=>prev && prev.filter((like)=>like.likeId !==likeId))  }
}catch(err){
console.log(err);

}
  };

  const hesUserLiked=likes?.find((like)=>like.userId===user?.uid)
useEffect(()=>{
getLikes()
},[])

  return (


    <div  className="wrapper">
 <div className="top"><div className="title"><h1>{post.title}</h1></div></div>
      {/* <div className="content">
        <h1>{post.title}</h1>
      </div> */}
      <div className="content">
        <div className="card first">
           <p className="text">{post.description}</p>
           <p>@{post.username}</p>
        <button onClick={hesUserLiked ?removeLike: addLike}>{hesUserLiked ? <> &#128078;</>:<> &#128077;</>}</button>
        {likes && <p>Likes:{likes?.length}</p>}</div>
      </div>
 
    </div>
  );
};

{/* <div class="wrapper">
  <div class="top"><div class="title"><h1>Material Style Blog</h1></div></div>
  <div class="content">
    <div class="card first">
      <h2><a href="#">Just a blog post</a></h2>
      <p class="date">26 October, 2014</p>
      <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Donec ut libero sed arcu vehicula ultricies a non tortor. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. Pellentesque auctor nisi id magna consequat sagittis. Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. Ut convallis libero in urna ultrices accumsan. Donec sed odio eros. Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In rutrum accumsan ultricies. 
<br />
Vivamus fermentum semper porta. Nunc diam velit, adipiscing ut tristique vitae, sagittis vel odio. Maecenas convallis ullamcorper ultricies. Curabitur ornare, ligula semper consectetur sagittis, nisi diam iaculis velit, id fringilla sem nunc vel mi. Quisque mi metus, ornare sit amet fermentum et, tincidunt et orci.</p>
      
    </div> */}