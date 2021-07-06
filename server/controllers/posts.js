   import PostMessage from '../models/postMessage.js'
   import mongoose from 'mongoose';

   export const getPosts = async(req,res) => {

    try{

      const PostMessages = await PostMessage.find();
      res.status(200).json(PostMessages);

    }catch(error){
        res.status(404).json({ message : error.message });
    }

    }

    export const getPost = async(req,res) => {

      const { id } = req.params;

      try {

        const post = await PostMessage.findById(id);

        res.status(200).json(post);

        
      } catch (error) {

        res.status(404).json({ message : error.message });
        
      }


    }


    export const createPost = async (req,res) => {

        const post = req.body;

        // const newPost = new PostMessage(post);
        
        const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

        try{

            await newPost.save();
            res.status(201).json(newPost);

      
          }catch(error){

              res.status(409).json({ message : error.message });

          }

        }  


    export const updatePost  = async(req,res) =>{

      const { id } = req.params;

      const { title, message, creator, tags, selectedFile } = req.body;      

      if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No Post With That Id");

      const updatedPost = { _id:id, title, message, creator, tags, selectedFile };
      
      await PostMessage.findByIdAndUpdate(id,updatedPost,{ new:true });

      res.json(updatedPost);



    } 

    

    export const deletePost  = async(req,res) =>{

      const { id:_id } = req.params;

      if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No Post With That Id");

      await PostMessage.findByIdAndDelete(_id);

      res.json({message: "Post Deleted Successfully"});

    }


    export const likePost  = async(req,res) =>{

      const { id:_id } = req.params;

      // if(!req.userId) return res.json({message:"unauthenticated"})

      if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No Post With That Id");

     const post =  await PostMessage.findById(_id);

    //  const index = post.likes.findIndex

     const updatedPost = await PostMessage.findByIdAndUpdate(_id,{ likeCount : post.likeCount + 1 },{ new:true });

      res.json(updatedPost);

    }

    
    
    